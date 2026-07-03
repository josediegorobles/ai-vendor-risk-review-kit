#!/usr/bin/env node
import fs from "node:fs"; import path from "node:path"; import process from "node:process";
import { fileURLToPath } from "node:url"; import { loadReview } from "../lib/load-review.mjs";
import { renderMarkdown } from "../lib/render-sections.mjs";
const scriptDir = path.dirname(fileURLToPath(import.meta.url)); const repoRoot = path.resolve(scriptDir, "..");

const usage = () => [
  "Usage:",
  "  node scripts/generate-report.mjs samples/chatgpt-team/vendor-review.yaml",
  "  node scripts/generate-report.mjs --all",
  "",
  "Options:",
  "  --out-dir DIR  Write generated reports to DIR instead of reports/",
].join("\n");

function findSampleFiles() {
  const samplesDir = path.join(repoRoot, "samples");
  return fs.readdirSync(samplesDir)
    .flatMap((sample) => {
      const file = path.join(samplesDir, sample, "vendor-review.yaml");
      return fs.existsSync(file) ? [file] : [];
    })
    .sort();
}

function parseArgs(argv) {
  let outDir = path.join(repoRoot, "reports");
  const inputs = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--out-dir") {
      const value = argv[index += 1];
      if (!value) throw new Error("--out-dir requires a directory");
      outDir = path.resolve(process.cwd(), value);
    } else if (arg === "--all") inputs.push(...findSampleFiles());
    else inputs.push(path.resolve(process.cwd(), arg));
  }
  if (inputs.length === 0) throw new Error(`No input file provided.\n\n${usage()}`);
  return { inputs, outDir };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const { inputs, outDir } = parseArgs(process.argv.slice(2));
    fs.mkdirSync(outDir, { recursive: true });
    for (const input of inputs) {
      const target = path.join(outDir, `${path.basename(path.dirname(input))}.md`);
      fs.writeFileSync(target, renderMarkdown(loadReview(input)));
      console.log(`generated ${path.relative(repoRoot, target)}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
