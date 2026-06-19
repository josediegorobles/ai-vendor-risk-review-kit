#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadReview } from "./generate-report.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const sampleFiles = [
  "samples/microsoft-365-copilot/vendor-review.yaml",
  "samples/chatgpt-team/vendor-review.yaml",
  "samples/notion-ai/vendor-review.yaml",
].map((file) => path.join(repoRoot, file));

let failures = 0;

for (const file of sampleFiles) {
  try {
    loadReview(file);
    console.log(`valid ${path.relative(repoRoot, file)}`);
  } catch (error) {
    failures += 1;
    console.error(error.message);
  }
}

if (failures > 0) {
  process.exit(1);
}
