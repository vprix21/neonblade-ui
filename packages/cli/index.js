#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const BASE_URL = "https://neonbladeui-registry.vercel.app";

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

// ── Entry point ────────────────────────────────────────────────────────────────
async function main() {
  const [command, component] = process.argv.slice(2);

  banner();

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command !== "add") {
    log.error(`Unknown command: ${c.yellow(`"${command}"`)}`);
    console.log();
    printHelp();
    process.exit(1);
  }

  // no component name → show available
  if (!component) {
    await listComponents();
    return;
  }

  await addComponent(component);
}

// ── Add component ──────────────────────────────────────────────────────────────
async function addComponent(component) {
  const projectRoot = process.cwd();
  const appRoot = findAppPath(projectRoot);
  const defaultBase = detectDefaultBase(appRoot);

  log.step(`Adding ${c.cyan(component)} …`);
  console.log();

  const userBase = await promptForPath(defaultBase, appRoot);
  console.log();

  const manifest = await fetchManifest(component);

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
