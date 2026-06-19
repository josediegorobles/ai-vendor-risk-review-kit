import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { generateOne, loadReview, renderMarkdown } from "../scripts/generate-report.mjs";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, "..");
const chatgptSample = path.join(repoRoot, "samples/chatgpt-team/vendor-review.yaml");

test("loads and renders a valid sample review", () => {
  const review = loadReview(chatgptSample);
  const markdown = renderMarkdown(review);
  assert.match(markdown, /^# /);
  assert.match(markdown, /## Data Exposure Map/);
  assert.match(markdown, /## Evidence Appendix/);
});

test("generates a report file in a selected output directory", () => {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "vendor-review-report-"));
  const output = generateOne(chatgptSample, outDir);
  assert.equal(path.basename(output), "chatgpt-team.md");
  assert.match(fs.readFileSync(output, "utf8"), /ChatGPT/);
});

test("fails clearly when required fields are missing", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vendor-review-invalid-"));
  const invalidPath = path.join(tmpDir, "vendor-review.yaml");
  fs.writeFileSync(invalidPath, "review:\n  id: broken\n");

  assert.throws(
    () => loadReview(invalidPath),
    /must have required property/
  );
});
