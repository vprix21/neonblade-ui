export type DemoPropValue = string | number | boolean;

/**
 * Serializes a live-demo control state into copy-pastable JSX.
 * Strings stay as quoted attributes, numbers become expressions, and booleans
 * use JSX shorthand (`flow`) or an explicit `{false}` when disabled.
 */
export function buildDemoCode(
  component: string,
  props: Record<string, DemoPropValue>,
  children?: string,
): string {
  const lines = Object.entries(props).map(([name, value]) => {
    if (typeof value === "string") {
      return `  ${name}=${JSON.stringify(value)}`;
    }
    if (typeof value === "number") {
      return `  ${name}={${value}}`;
    }
    return value ? `  ${name}` : `  ${name}={false}`;
  });

  if (children !== undefined) {
    return `<${component}\n${lines.join("\n")}\n>\n  ${children}\n</${component}>`;
  }

  return `<${component}\n${lines.join("\n")}\n/>`;
}
