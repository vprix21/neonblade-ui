#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const axios = require("axios")
const { execSync } = require("child_process")

const BASE_URL = "https://neonbladeui-registry.vercel.app"

async function main() {
  const projectRoot = process.cwd()
  const targetAppPath = findAppPath(projectRoot)

  const args = process.argv.slice(2)
  const command = args[0]
  const component = args[1]

  if (command !== "add") {
    console.log("Usage: neonblade add <component>")
    process.exit(1)
  }

  if (!component) {
    console.log("Please provide a component name")
    process.exit(1)
  }

  console.log("\n⚡ NeonBlade UI\n")

  logStep(`Adding ${component}...`)

  const data = await fetchComponent(component)

  logStep("Copying files...")

  for (const file of data.files) {
    const fileRes = await axios.get(file.url)

    const targetPath = path.join(
      targetAppPath,
      file.path
    )

    fs.mkdirSync(path.dirname(targetPath), { recursive: true })
    fs.writeFileSync(targetPath, fileRes.data)
  }

  if (data.dependencies && data.dependencies.length > 0) {
    logStep("Installing dependencies...")

    execSync(
      `pnpm add ${data.dependencies.join(" ")}`,
      {
        stdio: "inherit",
        cwd: targetAppPath,
      }
    )
  }

  logSuccess(`${component} added successfully`)
}

main()

// ---------------- HELPERS ----------------

function findAppPath(root) {
  const appsDir = path.join(root, "apps")

  if (!fs.existsSync(appsDir)) return root

  const apps = fs.readdirSync(appsDir)

  for (const app of apps) {
    const appPath = path.join(appsDir, app)
    const pkgPath = path.join(appPath, "package.json")

    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))

      if (pkg.dependencies && pkg.dependencies.next) {
        return appPath
      }
    }
  }

  return root
}

function logStep(message) {
  console.log(`📦 ${message}`)
}

function logSuccess(message) {
  console.log(`✅ ${message}`)
}

function logError(message) {
  console.log(`❌ ${message}`)
}

async function fetchComponent(component) {
  try {
    const res = await axios.get(
      `${BASE_URL}/components/${component}/index.json`
    )
    return res.data
  } catch (err) {
    logError(`Component "${component}" not found`)
    process.exit(1)
  }
}