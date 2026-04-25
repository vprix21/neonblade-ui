"use client";

import React from "react";

interface CyberCircuitProps {
  className?: string;
  color?: string;
  opacity?: number;
  lineThickness?: number;
  dotSize?: number;
  dotType?: "filled" | "outline";
  glowColor?: string;
  glowIntensity?: "none" | "soft" | "medium" | "strong";
}

type Point = [number, number];

interface TraceConfig {
  points: Point[];
  dotScale: number;
  startDotScale?: number;
}

const topLeftTraces: TraceConfig[] = [
  {
    points: [
      [0, 40],
      [40, 40],
      [60, 60],
      [60, 100],
    ],
    dotScale: 1.2,
  },
  {
    points: [
      [0, 70],
      [20, 70],
      [30, 80],
      [30, 130],
    ],
    dotScale: 1,
  },
  {
    points: [
      [40, 0],
      [40, 20],
      [80, 60],
      [140, 60],
    ],
    dotScale: 1.2,
  },
  {
    points: [
      [80, 0],
      [80, 30],
      [110, 60],
      [110, 120],
      [150, 160],
    ],
    dotScale: 1.5,
  },
  {
    points: [
      [120, 20],
      [150, 20],
      [170, 40],
      [190, 40],
    ],
    dotScale: 1,
    startDotScale: 0.7,
  },
];

const bottomRightTraces: TraceConfig[] = [
  {
    points: [
      [200, 160],
      [160, 160],
      [140, 140],
      [140, 100],
    ],
    dotScale: 1.2,
  },
  {
    points: [
      [200, 130],
      [180, 130],
      [170, 120],
      [170, 70],
    ],
    dotScale: 1,
  },
  {
    points: [
      [160, 200],
      [160, 180],
      [120, 140],
      [60, 140],
    ],
    dotScale: 1.2,
  },
  {
    points: [
      [120, 200],
      [120, 170],
      [90, 140],
      [90, 80],
      [50, 40],
    ],
    dotScale: 1.5,
  },
];

const topRightTraces: TraceConfig[] = [
  {
    points: [
      [200, 40],
      [160, 40],
      [140, 60],
      [140, 100],
    ],
    dotScale: 1,
  },
  {
    points: [
      [150, 0],
      [150, 30],
      [120, 60],
      [80, 60],
    ],
    dotScale: 1,
  },
];

const bottomLeftTraces: TraceConfig[] = [
  {
    points: [
      [0, 160],
      [40, 160],
      [60, 140],
      [60, 100],
    ],
    dotScale: 1,
  },
  {
    points: [
      [50, 200],
      [50, 170],
      [80, 140],
      [120, 140],
    ],
    dotScale: 1,
  },
];

const formatCoord = (value: number) => Number(value.toFixed(2));

const buildPathToDotBorder = (
  points: Point[],
  stopDistance: number,
  startOffset: number = 0,
) => {
  if (points.length < 2) return "";

  let startPoint = points[0];

  if (startOffset > 0 && points.length >= 2) {
    const [sx, sy] = points[0];
    const [nx, ny] = points[1];
    const dx = nx - sx;
    const dy = ny - sy;
    const segLen = Math.hypot(dx, dy);
    if (segLen > 0) {
      const clamped = Math.min(startOffset, segLen - 0.01);
      startPoint = [
        formatCoord(sx + (dx / segLen) * clamped),
        formatCoord(sy + (dy / segLen) * clamped),
      ];
    }
  }

  const segments = [`M${startPoint[0]},${startPoint[1]}`];

  for (let i = 1; i < points.length - 1; i++) {
    segments.push(`L${points[i][0]},${points[i][1]}`);
  }

  const [prevX, prevY] = points[points.length - 2];
  const [endX, endY] = points[points.length - 1];
  const dx = endX - prevX;
  const dy = endY - prevY;
  const segmentLength = Math.hypot(dx, dy);

  if (segmentLength === 0) {
    segments.push(`L${endX},${endY}`);
    return segments.join(" ");
  }

  const clampedStopDistance = Math.min(
    Math.max(0, stopDistance),
    segmentLength - 0.01,
  );
  const ratio = (segmentLength - clampedStopDistance) / segmentLength;
  const stopX = formatCoord(prevX + dx * ratio);
  const stopY = formatCoord(prevY + dy * ratio);

  segments.push(`L${stopX},${stopY}`);
  return segments.join(" ");
};

export const CyberCircuit: React.FC<CyberCircuitProps> = ({
  className = "",
  color = "#00f3ff", // Default neon cyan
  opacity = 0.6,
  lineThickness = 2,
  dotSize = 3,
  dotType = "filled",
  glowColor = "#00f3ff",
  glowIntensity = "medium",
}) => {
  const secondaryLineThickness = Math.max(0.75, lineThickness * 0.75);

  const getDotStrokeWidth = (strokeWidth: number) =>
    Math.max(1, strokeWidth * 0.85);

  const getDotProps = (strokeWidth: number) => {
    if (dotType === "outline") {
      return {
        fill: "transparent",
        stroke: color,
        strokeWidth: getDotStrokeWidth(strokeWidth),
      };
    }

    return {
      fill: color,
      stroke: "none",
      strokeWidth: 0,
    };
  };

  const getStopDistance = (radius: number, strokeWidth: number) => {
    const lineCapOffset = strokeWidth / 2;
    const outlineOffset =
      dotType === "outline" ? getDotStrokeWidth(strokeWidth) / 2 : 0;
    // Slight overlap: line tip reaches the dot border (or just past it)
    const overlapBuffer = strokeWidth * 0.15;
    return Math.max(0, radius + lineCapOffset + outlineOffset - overlapBuffer);
  };

  const glowPresets = {
    none: { pathBlurA: 0, pathBlurB: 0, dotBlurA: 0, dotBlurB: 0 },
    soft: { pathBlurA: 2, pathBlurB: 5, dotBlurA: 3, dotBlurB: 8 },
    medium: { pathBlurA: 4, pathBlurB: 8, dotBlurA: 6, dotBlurB: 12 },
    strong: { pathBlurA: 6, pathBlurB: 14, dotBlurA: 10, dotBlurB: 20 },
  } as const;

  const selectedGlow = glowPresets[glowIntensity];
  const pathFilter =
    glowIntensity === "none"
      ? undefined
      : `drop-shadow(0 0 ${selectedGlow.pathBlurA}px ${glowColor}) drop-shadow(0 0 ${selectedGlow.pathBlurB}px ${glowColor})`;
  const dotFilter =
    glowIntensity === "none"
      ? undefined
      : `drop-shadow(0 0 ${selectedGlow.dotBlurA}px ${glowColor}) drop-shadow(0 0 ${selectedGlow.dotBlurB}px ${glowColor})`;

  const renderTrace = (
    trace: TraceConfig,
    strokeWidth: number,
    key: string,
  ) => {
    const endPoint = trace.points[trace.points.length - 1];
    const endRadius = dotSize * trace.dotScale;
    const dotProps = getDotProps(strokeWidth);
    const pathData = buildPathToDotBorder(
      trace.points,
      getStopDistance(endRadius, strokeWidth),
      trace.startDotScale
        ? getStopDistance(dotSize * trace.startDotScale, strokeWidth)
        : 0,
    );

    return (
      <React.Fragment key={key}>
        <path
          d={pathData}
          style={{ filter: pathFilter }}
        />
        <circle
            cx={endPoint[0]}
            cy={endPoint[1]}
            r={endRadius}
            style={{ filter: dotFilter }}
            {...dotProps}
        />
        {trace.startDotScale ? (
          <circle
            cx={trace.points[0][0]}
            cy={trace.points[0][1]}
            r={dotSize * trace.startDotScale}
            style={{ filter: dotFilter }}
            {...dotProps}
          />
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* Top Left Corner */}
      <svg
        className="absolute top-0 left-0 w-[clamp(10rem,26vw,24rem)] h-[clamp(10rem,26vw,24rem)]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke={color}
          strokeWidth={lineThickness}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {topLeftTraces.map((trace, index) =>
            renderTrace(trace, lineThickness, `tl-${index}`),
          )}
        </g>
      </svg>

      {/* Bottom Right Corner */}
      <svg
        className="absolute bottom-0 right-0 w-[clamp(10rem,26vw,24rem)] h-[clamp(10rem,26vw,24rem)]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke={color}
          strokeWidth={lineThickness}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {bottomRightTraces.map((trace, index) =>
            renderTrace(trace, lineThickness, `br-${index}`),
          )}
        </g>
      </svg>

      {/* Top Right Corner */}
      <svg
        className="absolute top-0 right-0 w-[clamp(8rem,20vw,18rem)] h-[clamp(8rem,20vw,18rem)]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke={color}
          strokeWidth={secondaryLineThickness}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        >
          {topRightTraces.map((trace, index) =>
            renderTrace(trace, secondaryLineThickness, `tr-${index}`),
          )}
        </g>
      </svg>

      {/* Bottom Left Corner */}
      <svg
        className="absolute bottom-0 left-0 w-[clamp(8rem,20vw,18rem)] h-[clamp(8rem,20vw,18rem)]"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          stroke={color}
          strokeWidth={secondaryLineThickness}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        >
          {bottomLeftTraces.map((trace, index) =>
            renderTrace(trace, secondaryLineThickness, `bl-${index}`),
          )}
        </g>
      </svg>
    </div>
  );
};
