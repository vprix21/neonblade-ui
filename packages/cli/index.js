#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");
const os = require("os");
const crypto = require("crypto");
const { execSync } = require("child_process");

const BASE_URL = "https://neonbladeui-registry.vercel.app";
const TELEMETRY_ENDPOINT =
  process.env.NEONBLADE_TELEMETRY_ENDPOINT ||
  "https://neonbladeui.neuronrush.com/api/telemetry";
const CLI_VERSION = require("./package.json").version;

// ── ANSI color helpers ─────────────────────────────────────────────────────────
const c = {
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  pink: (s) => `\x1b[35m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  white: (s) => `\x1b[97m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

function banner() {
  console.log();
  console.log(
    `  ${c.bold(c.white("NeonBlade"))}${c.bold(c.cyan("UI"))}  ${c.dim("CLI")}`,
  );
  console.log();
}

const log = {
  step: (msg) => console.log(`  ${c.cyan("◆")}  ${msg}`),
  file: (msg) => console.log(`     ${c.dim("→")} ${c.dim(msg)}`),
  success: (msg) => console.log(`  ${c.green("✔")}  ${msg}`),
  error: (msg) => console.log(`  ${c.red("✖")}  ${msg}`),
  warn: (msg) => console.log(`  ${c.yellow("⚠")}  ${msg}`),
  line: () => console.log(`  ${c.dim("─".repeat(46))}`),
};

// ── Telemetry ──────────────────────────────────────────────────────────────────
// Config lives at ~/.neonblade/config.json
// Telemetry is ON by default (opt-out). Users can disable with:
//   npx neonblade telemetry disable
// or by setting NEONBLADE_TELEMETRY=false in their environment.

const CONFIG_DIR = path.join(os.homedir(), ".neonblade");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

function readConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeConfig(data) {
  try {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
    const current = readConfig();
    fs.writeFileSync(
      CONFIG_FILE,
      JSON.stringify({ ...current, ...data }, null, 2),
    );
  } catch {
    // Silently ignore — config write failures must never break the CLI
  }
}

function isTelemetryDisabled() {
  // Env var takes priority
  if (process.env.NEONBLADE_TELEMETRY === "false") return true;
  const cfg = readConfig();
  return cfg.telemetry === false;
}

/** Returns a stable anonymous session ID for this machine. */
function getAnonymousId() {
  const cfg = readConfig();
  if (cfg.anonymousId) return cfg.anonymousId;

  // Generate once, hash machine hostname so it's not reversible
  const raw = `${os.hostname()}-${Date.now()}-${Math.random()}`;
  const id = crypto.createHash("sha256").update(raw).digest("hex").slice(0, 32);
  writeConfig({ anonymousId: id });
  return id;
}

/**
 * Show the one-time telemetry notice (only on first ever run).
 * Stored in ~/.neonblade/config.json as { noticeShown: true }.
 */
function maybeShowTelemetryNotice() {
  const cfg = readConfig();
  if (cfg.noticeShown) return;

  console.log(`  ${c.dim("─".repeat(54))}`);
  console.log();
  console.log(`  ${c.bold(c.white("Telemetry Notice"))}`);
  console.log();
  console.log(`  ${c.dim("NeonBlade UI collects anonymous data about which")}`);
  console.log(
    `  ${c.dim("components are downloaded. No personal information")}`,
  );
  console.log(`  ${c.dim("is ever collected.")}`);
  console.log();
  console.log(`  To opt out:  ${c.cyan("npx neonblade telemetry disable")}`);
  console.log(`  Learn more:  ${c.dim("https://neonbladeui.com/telemetry")}`);
  console.log();
  console.log(`  ${c.dim("─".repeat(54))}`);
  console.log();

  writeConfig({ noticeShown: true });
}

/**
 * Fire-and-forget: send a download event to the telemetry endpoint.
 * Uses Node's built-in https module — zero extra dependencies.
 * Never throws, never blocks, never prints anything on failure.
 */
function sendTelemetry(component) {
  if (isTelemetryDisabled()) return;

  const payload = JSON.stringify({
    event_type: "download",
    component,
    session_id: getAnonymousId(),
    cli_version: CLI_VERSION,
  });

  try {
    const url = new URL(TELEMETRY_ENDPOINT);
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
          "User-Agent": `neonblade-cli/${CLI_VERSION}`,
        },
        timeout: 3000, // 3 s max — never block the user
      },
      () => {}, // response handler — we don't need to read it
    );

    req.on("error", () => {}); // silently ignore network errors
    req.on("timeout", () => req.destroy());
    req.write(payload);
    req.end();
  } catch {
    // Silently ignore any synchronous errors
  }
}

// ── Entry point ────────────────────────────────────────────────────────────────
async function main() {
  const [command, subcommand] = process.argv.slice(2);

  banner();

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  // ── Telemetry management commands ──────────────────────────────
  if (command === "telemetry") {
    handleTelemetryCommand(subcommand);
    return;
  }

  if (command !== "add") {
    log.error(`Unknown command: ${c.yellow(`"${command}"`)}`);
    console.log();
    printHelp();
    process.exit(1);
  }

  // no component name → show available
  if (!subcommand) {
    await listComponents();
    return;
  }

  await addComponent(subcommand);
}

// ── Telemetry sub-commands ─────────────────────────────────────────────────────
function handleTelemetryCommand(sub) {
  switch (sub) {
    case "disable":
      writeConfig({ telemetry: false });
      log.success("Telemetry disabled. No usage data will be collected.");
      console.log(
        `  ${c.dim("To re-enable: ")}${c.cyan("npx neonblade telemetry enable")}`,
      );
      console.log();
      break;

    case "enable":
      writeConfig({ telemetry: true });
      log.success(
        "Telemetry enabled. Thank you for helping improve NeonBlade UI!",
      );
      console.log();
      break;

    case "status":
      if (isTelemetryDisabled()) {
        log.warn(`Telemetry is ${c.yellow("disabled")}.`);
      } else {
        log.success(`Telemetry is ${c.green("enabled")}.`);
      }
      console.log(`  ${c.dim("Anonymous ID:")} ${c.dim(getAnonymousId())}`);
      console.log();
      break;

    default:
      log.error(`Unknown telemetry sub-command: ${c.yellow(`"${sub || ""}"`)}`);
      console.log();
      console.log(
        `  ${c.bold("Usage")}  ${c.cyan("npx neonblade telemetry")} ${c.yellow("<disable|enable|status>")}`,
      );
      console.log();
      process.exit(1);
  }
}

// ── Add component ──────────────────────────────────────────────────────────────
async function addComponent(component) {
  // Show notice on very first run (before anything else happens)
  maybeShowTelemetryNotice();

  const projectRoot = process.cwd();
  const appRoot = findAppPath(projectRoot);
  const defaultBase = detectDefaultBase(appRoot);

  log.step(`Adding ${c.cyan(component)} …`);
  console.log();

  const userBase = await promptForPath(defaultBase, appRoot);
  console.log();

  const manifest = await fetchManifest(component);

  // ── Fire telemetry ping (non-blocking) ──────────────────────
  // Sent right after the manifest is confirmed valid, before files
  // are written. If the download fails later, we've still counted
  // the intent — consistent with how npm/pip count installs.
  sendTelemetry(component);

  const componentsBase =
    path.basename(userBase) === "components"
      ? userBase
      : `${userBase}/components`;
  const resolvedBase = path.resolve(appRoot, componentsBase, "neonblade-ui");
  log.step(
    `Writing files to ${c.cyan(path.relative(projectRoot, resolvedBase) || `${componentsBase}/neonblade-ui`)}`,
  );

  for (const file of manifest.files) {
    const res = await fetch(file.url);
    if (!res.ok) {
      log.error(`Failed to download: ${c.dim(file.url)}`);
      process.exit(1);
    }
    const content = await res.text();
    const dest = resolveFileDest(appRoot, userBase, file.path);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, content);
    log.file(path.relative(projectRoot, dest));
  }

  const pm = detectPackageManager(appRoot);

  if (manifest.dependencies && manifest.dependencies.length > 0) {
    console.log();
    log.step(`Installing dependencies via ${c.cyan(pm)}`);
    console.log(`     ${c.dim(manifest.dependencies.join("  "))}`);
    console.log();
    const cmd = buildInstallCmd(pm, manifest.dependencies);
    execSync(cmd, { stdio: "inherit", cwd: appRoot });
  }

  console.log();
  log.line();
  log.success(`${c.bold(c.cyan(component))} added successfully!`);
  console.log(`       ${c.dim("location →")} ${c.dim(resolvedBase)}`);
  console.log();
}

// ── List all available components ──────────────────────────────────────────────
async function listComponents() {
  let registry;
  try {
    const res = await fetch(`${BASE_URL}/registry.json`);
    if (!res.ok) throw new Error();
    registry = await res.json();
  } catch {
    log.error("Could not reach the registry.");
    console.log(`  ${c.dim("Check your internet connection")}`);
    console.log();
    process.exit(1);
  }

  // Group components by category
  const grouped = registry.components.reduce((acc, comp) => {
    (acc[comp.category] ??= []).push(comp);
    return acc;
  }, {});

  console.log(c.bold(c.white("  Available components")));
  console.log();

  for (const cat of Object.keys(grouped).sort()) {
    console.log(`  ${c.cyan(cat)}`);
    for (const comp of grouped[cat]) {
      const namePad = comp.name.padEnd(34);
      console.log(
        `    ${c.yellow("›")} ${c.white(namePad)} ${c.dim(comp.description)}`,
      );
    }
    console.log();
  }

  log.line();
  console.log();
  console.log(
    `  ${c.bold("Usage  ")}  ${c.cyan("npx neonblade add")} ${c.yellow("<component-name>")}`,
  );
  console.log(
    `  ${c.bold("Example")}  ${c.cyan("npx neonblade add")} ${c.yellow("ascii-rain")}`,
  );
  console.log();
}

// ── Help ───────────────────────────────────────────────────────────────────────
function printHelp() {
  console.log(`  ${c.bold("Commands")}`);
  console.log();
  console.log(
    `    ${c.cyan("npx neonblade add")} ${c.yellow("<component>")}   Add a component to your project`,
  );
  console.log(
    `    ${c.cyan("npx neonblade add")}                 List all available components`,
  );
  console.log();
  console.log(`  ${c.bold("Telemetry")}`);
  console.log();
  console.log(
    `    ${c.cyan("npx neonblade telemetry disable")}   Stop sending anonymous usage data`,
  );
  console.log(
    `    ${c.cyan("npx neonblade telemetry enable")}    Re-enable usage data collection`,
  );
  console.log(
    `    ${c.cyan("npx neonblade telemetry status")}    Show current telemetry status`,
  );
  console.log();
  console.log(`  ${c.dim("Docs → https://neonbladeui.com")}`);
  console.log();
}

// ── Utilities ──────────────────────────────────────────────────────────────────
async function fetchManifest(component) {
  try {
    const res = await fetch(`${BASE_URL}/components/${component}/index.json`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    log.error(
      `Component ${c.yellow(`"${component}"`)} not found in the registry.`,
    );
    console.log();
    console.log(
      `  Run ${c.cyan("npx neonblade add")} to see all available components.`,
    );
    console.log();
    process.exit(1);
  }
}

function buildInstallCmd(pm, deps) {
  const pkg = deps.join(" ");
  if (pm === "pnpm") return `pnpm add ${pkg}`;
  if (pm === "yarn") return `yarn add ${pkg}`;
  return `npm install ${pkg}`;
}

// ── Detect the default components folder within the app root ────────────────
// Returns the components directory; neonblade-ui/ is always appended by resolveFileDest.
function detectDefaultBase(appRoot) {
  if (fs.existsSync(path.join(appRoot, "src"))) {
    return "src/components";
  }
  if (fs.existsSync(path.join(appRoot, "app"))) {
    return "app/components";
  }
  return "components";
}

// ── Strip the registry prefix and resolve to the user's chosen base ───────────
// Always writes under <userBase>/components/neonblade-ui/ (or <userBase>/neonblade-ui/
// if userBase already ends with "components").
function resolveFileDest(appRoot, userBase, filePath) {
  const REGISTRY_PREFIX = "components/neonblade-ui/";
  const relative = filePath.startsWith(REGISTRY_PREFIX)
    ? filePath.slice(REGISTRY_PREFIX.length)
    : filePath;
  const componentsBase =
    path.basename(userBase) === "components"
      ? userBase
      : `${userBase}/components`;
  return path.resolve(appRoot, componentsBase, "neonblade-ui", relative);
}

// ── Interactive prompt for output path ────────────────────────────────────────
async function promptForPath(defaultBase, appRoot) {
  const { createInterface } = require("readline");

  console.log(`  ${c.bold("Output path")}`);
  console.log(
    `  ${c.dim("Default :")} ${c.cyan(defaultBase)} ${c.dim(`→ will create neonblade-ui/ inside`)}`,
  );
  console.log(
    `  ${c.dim("Example :")} ${c.dim("app  or  app/components  or  src/lib")}`,
  );
  console.log();

  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `  ${c.yellow("?")} Press Enter to use default, or type a path: `,
      (answer) => {
        rl.close();
        const trimmed = answer.trim();

        if (!trimmed) {
          resolve(defaultBase);
          return;
        }

        // Normalize: forward slashes, strip surrounding slashes
        const normalized = trimmed
          .replace(/\\/g, "/")
          .replace(/^\/+|\/+$/g, "");

        // Reject absolute paths
        if (path.isAbsolute(trimmed)) {
          console.log();
          log.error(
            `"${trimmed}" is an absolute path. Please enter a relative path (e.g. src/components/ui).`,
          );
          process.exit(1);
        }

        // Reject path traversal
        if (normalized.split("/").includes("..")) {
          console.log();
          log.error('Path cannot contain ".." segments.');
          process.exit(1);
        }

        // Reject file paths (have an extension)
        if (path.extname(normalized)) {
          console.log();
          log.error(
            `"${normalized}" looks like a file path. Please enter a directory (e.g. src/components/ui).`,
          );
          process.exit(1);
        }

        // Reject paths that escape the app root
        const resolved = path.resolve(appRoot, normalized);
        if (!resolved.startsWith(appRoot)) {
          console.log();
          log.error("Path must be inside the project directory.");
          process.exit(1);
        }

        resolve(normalized);
      },
    );
  });
}

function findAppPath(root) {
  const appsDir = path.join(root, "apps");
  if (!fs.existsSync(appsDir)) return root;

  for (const app of fs.readdirSync(appsDir)) {
    const appPath = path.join(appsDir, app);
    const pkgPath = path.join(appPath, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      if (pkg.dependencies && pkg.dependencies.next) return appPath;
    }
  }
  return root;
}

function detectPackageManager(dir) {
  if (fs.existsSync(path.join(dir, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(dir, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(dir, "package-lock.json"))) return "npm";
  return "npm";
}

main().catch((err) => {
  console.error(c.red(`\n  ✖  ${err.message || String(err)}\n`));
  process.exit(1);
});
