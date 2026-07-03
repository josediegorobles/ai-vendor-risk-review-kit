import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { loadReview } from "../lib/load-review.mjs";
import { renderMarkdown } from "../lib/render-sections.mjs";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, "..");
const chatgptSample = path.join(repoRoot, "samples/chatgpt-team/vendor-review.yaml");
const goldenReports = [
  "chatgpt-team",
  "microsoft-365-copilot",
  "notion-ai",
];

test("loads and renders a valid sample review", () => {
  const review = loadReview(chatgptSample);
  const markdown = renderMarkdown(review);
  assert.match(markdown, /^# /);
  assert.match(markdown, /## Data Exposure Map/);
  assert.match(markdown, /## Evidence Appendix/);
});

for (const slug of goldenReports) {
  test(`renders ${slug} exactly like the golden fixture`, () => {
    const sample = path.join(repoRoot, `samples/${slug}/vendor-review.yaml`);
    const fixture = path.join(repoRoot, `test/fixtures/reports/${slug}.md`);
    assert.equal(renderMarkdown(loadReview(sample)), fs.readFileSync(fixture, "utf8"));
  });
}

test("fails clearly when required fields are missing", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "vendor-review-invalid-"));
  const invalidPath = path.join(tmpDir, "vendor-review.yaml");
  fs.writeFileSync(invalidPath, "review:\n  id: broken\n");

  assert.throws(
    () => loadReview(invalidPath),
    /must have required property/
  );
});
