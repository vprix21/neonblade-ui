import type { PropDefinition } from "../../types";

const props: PropDefinition[] = [
  {
    name: "data",
    type: "T[]",
    description: "Array of row data objects. Each key maps to a column.",
  },
  {
    name: "columns",
    type: "NTColumn<T>[]",
    description:
      "Column definitions — key, header, render?, sortable?, width?, align?.",
  },
  {
    name: "title",
    type: "string",
    description:
      "Optional title shown in a header bar with a pulsing dot and accent line.",
  },
  {
    name: "color",
    type: '"cyan" | "pink" | "green" | string',
    default: '"cyan"',
    description: "Neon accent color for header, hover beam, and pagination.",
  },
  {
    name: "rowHover",
    type: "boolean",
    default: "true",
    description: "Enable neon scan-line left-border on row hover.",
  },
  {
    name: "sortable",
    type: "boolean",
    default: "true",
    description: "Enable client-side column sorting.",
  },
  {
    name: "pageSize",
    type: "number",
    default: "0",
    description: "Rows per page. 0 disables pagination.",
  },
  {
    name: "emptyText",
    type: "string",
    default: '"NO DATA FOUND"',
    description: "Message shown when data is empty.",
  },
  {
    name: "grid",
    type: "boolean",
    default: "true",
    description: "Show subtle vertical dividers between columns.",
  },
  {
    name: "striped",
    type: "boolean",
    default: "false",
    description: "Alternate row background shading.",
  },
  {
    name: "compact",
    type: "boolean",
    default: "false",
    description: "Tighter row and cell padding for dense data.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Show animated skeleton rows instead of data.",
  },
  {
    name: "loadingRows",
    type: "number",
    default: "5",
    description: "Number of skeleton rows to display while loading.",
  },
  {
    name: "corners",
    type: "boolean",
    default: "true",
    description: "Show neon accent corner marks on the table border.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional className on the outer wrapper.",
  },
];

export default props;
