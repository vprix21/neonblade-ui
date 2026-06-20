"use client";

import React, { useState, useMemo, useCallback } from "react";
import "./neon-table.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export type NTColor = "cyan" | "pink" | "green" | (string & {});
export type NTSortDir = "asc" | "desc" | null;

export interface NTColumn<T = Record<string, unknown>> {
  /** Unique key matching a property in the data objects. */
  key: string;
  /** Column header label. */
  header: string;
  /** Custom cell renderer. Receives the value, full row, and row index. */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Allow sorting on this column. @default true */
  sortable?: boolean;
  /** CSS width for the column. e.g. "48px" or "120px". */
  width?: string;
  /** Text alignment. @default "left" */
  align?: "left" | "center" | "right";
}

export interface NeonTableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Array of row data objects. */
  data: T[];
  /** Column definitions. */
  columns: NTColumn<T>[];
  /** Optional title displayed in a header bar above the table. */
  title?: string;
  /** Neon accent color. @default "cyan" */
  color?: NTColor;
  /** Enable row hover neon-beam effect. @default true */
  rowHover?: boolean;
  /** Enable client-side column sorting. @default true */
  sortable?: boolean;
  /** Rows per page. 0 disables pagination. @default 0 */
  pageSize?: number;
  /** Text shown when data is empty. @default "NO DATA FOUND" */
  emptyText?: string;
  /** Show subtle vertical column dividers. @default true */
  grid?: boolean;
  /** Alternate row background shading. @default false */
  striped?: boolean;
  /** Compact row padding. @default false */
  compact?: boolean;
  /** Show skeleton loading rows instead of data. @default false */
  loading?: boolean;
  /** Number of skeleton rows shown while loading. @default 5 */
  loadingRows?: number;
  /** Show neon corner accent marks on the table border. @default true */
  corners?: boolean;
  /** Additional className on the outer wrapper. */
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PRESETS: Record<string, string> = {
  cyan: "#00f3ff",
  pink: "#ff00ff",
  green: "#39ff14",
};
function resolveColor(c: NTColor): string {
  return PRESETS[c] ?? c;
}

function getValue(row: Record<string, unknown>, key: string): unknown {
  return row[key];
}

function comparator(a: unknown, b: unknown, dir: "asc" | "desc"): number {
  const va = typeof a === "number" ? a : String(a ?? "").toLowerCase();
  const vb = typeof b === "number" ? b : String(b ?? "").toLowerCase();
  if (va < vb) return dir === "asc" ? -1 : 1;
  if (va > vb) return dir === "asc" ? 1 : -1;
  return 0;
}

// ── Sort Icon ─────────────────────────────────────────────────────────────────

function SortIcon({ dir }: { dir: NTSortDir }) {
  return (
    <span className="nt-sort-icon" aria-hidden="true">
      <span
        className={`nt-sort-arrow nt-sort-up${dir === "asc" ? " nt-sort-active" : ""}`}
      >
        ▲
      </span>
      <span
        className={`nt-sort-arrow nt-sort-down${dir === "desc" ? " nt-sort-active" : ""}`}
      >
        ▼
      </span>
    </span>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────

function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  total,
  pageSize,
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  total: number;
  pageSize: number;
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  return (
    <div className="nt-pagination">
      <span className="nt-page-info">
        {start}–{end} / {total}
      </span>
      <div className="nt-page-btns">
        <button
          className="nt-page-btn"
          onClick={onPrev}
          disabled={page === 1}
          aria-label="Previous page"
        >
          ‹
        </button>
        <span className="nt-page-num">
          {page} / {totalPages}
        </span>
        <button
          className="nt-page-btn"
          onClick={onNext}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}

// ── Skeleton row ──────────────────────────────────────────────────────────────

function SkeletonRow({ cols, compact }: { cols: number; compact: boolean }) {
  return (
    <tr className="nt-tr">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className={`nt-td${compact ? " nt-compact" : ""}`}>
          <span
            className="nt-skeleton"
            style={{ width: `${55 + ((i * 17) % 35)}%` }}
          />
        </td>
      ))}
    </tr>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function NeonTable<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  data,
  columns,
  title,
  color = "cyan",
  rowHover = true,
  sortable = true,
  pageSize = 0,
  emptyText = "NO DATA FOUND",
  grid = true,
  striped = false,
  compact = false,
  loading = false,
  loadingRows = 5,
  corners = true,
  className = "",
}: NeonTableProps<T>) {
  const accent = resolveColor(color);

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<NTSortDir>(null);
  const [page, setPage] = useState(1);

  const handleSort = useCallback(
    (key: string) => {
      if (!sortable) return;
      if (sortKey === key) {
        const next: NTSortDir =
          sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc";
        setSortDir(next);
        if (next === null) setSortKey(null);
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
      setPage(1);
    },
    [sortable, sortKey, sortDir],
  );

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) =>
      comparator(
        getValue(a as Record<string, unknown>, sortKey),
        getValue(b as Record<string, unknown>, sortKey),
        sortDir,
      ),
    );
  }, [data, sortKey, sortDir]);

  const totalPages =
    pageSize > 0 ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const paged =
    pageSize > 0
      ? sorted.slice((page - 1) * pageSize, page * pageSize)
      : sorted;
  const cssVars = { "--nt-accent": accent } as React.CSSProperties;

  return (
    <div
      className={[
        "nt-wrapper",
        grid ? "nt-grid" : "",
        striped ? "nt-striped" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={cssVars}
    >
      {/* Scan-line overlay (uses --nt-accent via CSS) */}
      <div className="nt-scanline" aria-hidden="true" />

      {/* Corner accent marks */}
      {corners && (
        <>
          <div className="nt-corner nt-corner-tl" aria-hidden="true" />
          <div className="nt-corner nt-corner-tr" aria-hidden="true" />
          <div className="nt-corner nt-corner-bl" aria-hidden="true" />
          <div className="nt-corner nt-corner-br" aria-hidden="true" />
        </>
      )}

      {/* Optional title bar */}
      {title && (
        <div className="nt-title-bar">
          <span className="nt-title-text">{title}</span>
        </div>
      )}

      <div className="nt-scroll">
        <table className="nt-table" role="grid">
          <thead className="nt-thead">
            <tr>
              {columns.map((col) => {
                const isSortable = sortable && col.sortable !== false;
                const dir: NTSortDir = sortKey === col.key ? sortDir : null;
                return (
                  <th
                    key={col.key}
                    className={`nt-th nt-align-${col.align ?? "left"}${isSortable ? " nt-sortable" : ""}${compact ? " nt-compact" : ""}`}
                    style={
                      col.width
                        ? { width: col.width, minWidth: col.width }
                        : undefined
                    }
                    onClick={isSortable ? () => handleSort(col.key) : undefined}
                    aria-sort={
                      dir === "asc"
                        ? "ascending"
                        : dir === "desc"
                          ? "descending"
                          : undefined
                    }
                  >
                    <span className="nt-th-inner">
                      {col.header}
                      {isSortable && <SortIcon dir={dir} />}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: loadingRows }).map((_, i) => (
                <SkeletonRow key={i} cols={columns.length} compact={compact} />
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="nt-empty">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paged.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`nt-tr${rowHover ? " nt-row-hover" : ""}`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`nt-td nt-align-${col.align ?? "left"}${compact ? " nt-compact" : ""}`}
                    >
                      {col.render
                        ? col.render(
                            getValue(row as Record<string, unknown>, col.key),
                            row,
                            rowIdx,
                          )
                        : String(
                            getValue(row as Record<string, unknown>, col.key) ??
                              "",
                          )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && pageSize > 0 && sorted.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          total={sorted.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}

export default NeonTable;
