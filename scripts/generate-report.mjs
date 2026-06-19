#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const schemaPath = path.join(repoRoot, "schema", "vendor-review.schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

function usage() {
  return [
    "Usage:",
    "  node scripts/generate-report.mjs samples/chatgpt-team/vendor-review.yaml",
    "  node scripts/generate-report.mjs --all",
    "",
    "Options:",
    "  --out-dir DIR  Write generated reports to DIR instead of reports/",
  ].join("\n");
}

function findSampleFiles() {
  const samplesDir = path.join(repoRoot, "samples");
  return fs.readdirSync(samplesDir)
    .flatMap((sample) => {
      const candidate = path.join(samplesDir, sample, "vendor-review.yaml");
      return fs.existsSync(candidate) ? [candidate] : [];
    })
    .sort();
}

function parseArgs(argv) {
  const args = [...argv];
  let outDir = path.join(repoRoot, "reports");
  const inputs = [];

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "--help" || arg === "-h") {
      console.log(usage());
      process.exit(0);
    }
    if (arg === "--out-dir") {
      const value = args.shift();
      if (!value) throw new Error("--out-dir requires a directory");
      outDir = path.resolve(process.cwd(), value);
      continue;
    }
    if (arg === "--all") {
      inputs.push(...findSampleFiles());
      continue;
    }
    inputs.push(path.resolve(process.cwd(), arg));
  }

  if (inputs.length === 0) {
    throw new Error(`No input file provided.\n\n${usage()}`);
  }

  return { inputs, outDir };
}

export function loadReview(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const review = yaml.load(source);
  if (!validate(review)) {
    const details = validate.errors
      .map((error) => {
        const location = error.instancePath || "/";
        return `${location}: ${error.message}`;
      })
      .join("\n");
    throw new Error(`Invalid vendor review: ${filePath}\n${details}`);
  }
  return review;
}

function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function table(headers, rows) {
  const header = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`).join("\n");
  return [header, separator, body].join("\n");
}

function escapeCell(value) {
  return String(value).replace(/\n/g, "<br>").replace(/\|/g, "\\|");
}

export function renderMarkdown(review) {
  const generatedAt = review.review.date;
  const exposureRows = review.data_exposure_map.map((item) => [
    item.category,
    item.examples.join("<br>"),
    item.source_systems.join("<br>"),
    item.exposure_path,
    item.sensitivity,
    item.retention_or_processing_note,
    item.control_notes,
  ]);
  const questionRows = review.security_privacy_questions.map((item) => [
    item.category,
    item.question,
    item.why_it_matters,
    item.evidence_needed,
  ]);
  const lockInRows = review.lock_in_risks.map((item) => [
    item.risk,
    item.scenario,
    item.impact,
    item.mitigation,
  ]);
  const oversightRows = review.human_oversight_checklist.map((item) => [
    item.control,
    item.owner,
    item.status,
    item.evidence,
  ]);
  const controlRows = review.recommended_controls.map((item) => [
    item.priority,
    item.control,
    item.rationale,
    item.owner,
    item.timing,
  ]);
  const evidenceRows = review.evidence_sources.map((item) => [
    item.title,
    `[${item.publisher}](${item.url})`,
    item.retrieved,
    item.notes,
  ]);

  return `# ${review.review.title}

> Sample procurement-grade technical risk review. This is not legal advice, certification, a pentest, or a compliance guarantee.

| Field | Value |
|---|---|
| Review ID | ${review.review.id} |
| Review date | ${review.review.date} |
| Generated | ${generatedAt} |
| Reviewer | ${review.review.reviewer} |
| Vendor | ${review.vendor.name} |
| Product / plan | ${review.vendor.product} / ${review.vendor.plan} |
| Final recommendation | ${review.final_recommendation.outcome} |
| Risk level | ${review.executive_summary.risk_level} |

## Executive Summary

**Verdict:** ${review.executive_summary.verdict}

${review.executive_summary.summary}

**Key risks**

${bulletList(review.executive_summary.key_risks)}

**Key controls**

${bulletList(review.executive_summary.key_controls)}

**Caveats**

${bulletList(review.executive_summary.caveats)}

## Company Adoption Scenario

**Company profile:** ${review.adoption_scenario.company_profile}

**Intended use:** ${review.adoption_scenario.intended_use}

**Users:** ${review.adoption_scenario.users}

**Deployment context:** ${review.adoption_scenario.deployment_context}

**Decision impact:** ${review.adoption_scenario.decision_impact}

**Out of scope / non-goals**

${bulletList(review.adoption_scenario.non_goals)}

## Data Exposure Map

${table(["Category", "Examples", "Source systems", "Exposure path", "Sensitivity", "Processing note", "Control notes"], exposureRows)}

## AI Act Role Hypothesis

**Likely role:** ${review.ai_act_role_hypothesis.likely_role}

**Risk classification:** ${review.ai_act_role_hypothesis.risk_classification}

${review.ai_act_role_hypothesis.rationale}

**Caveats**

${bulletList(review.ai_act_role_hypothesis.caveats)}

**Review triggers**

${bulletList(review.ai_act_role_hypothesis.review_triggers)}

## Security And Privacy Review Questions

${table(["Category", "Question", "Why it matters", "Evidence needed"], questionRows)}

## Operational Dependency And Lock-In Risks

${table(["Risk", "Scenario", "Impact", "Mitigation"], lockInRows)}

## Human Oversight Checklist

${table(["Control", "Owner", "Status", "Evidence"], oversightRows)}

## Recommended Controls

${table(["Priority", "Control", "Rationale", "Owner", "Timing"], controlRows)}

## Final Recommendation

**Outcome:** ${review.final_recommendation.outcome}

${review.final_recommendation.rationale}

**Conditions**

${bulletList(review.final_recommendation.conditions)}

**Pause triggers**

${bulletList(review.final_recommendation.pause_triggers)}

**Next review:** ${review.final_recommendation.next_review}

## Evidence Appendix

${table(["Source", "Publisher", "Retrieved", "Notes"], evidenceRows)}
`;
}

export function outputPathFor(inputPath, outDir) {
  const parent = path.basename(path.dirname(inputPath));
  return path.join(outDir, `${parent}.md`);
}

export function generateOne(inputPath, outDir) {
  const review = loadReview(inputPath);
  const markdown = renderMarkdown(review);
  fs.mkdirSync(outDir, { recursive: true });
  const target = outputPathFor(inputPath, outDir);
  fs.writeFileSync(target, markdown);
  return target;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const { inputs, outDir } = parseArgs(process.argv.slice(2));
    const outputs = inputs.map((input) => generateOne(input, outDir));
    for (const output of outputs) {
      console.log(`generated ${path.relative(repoRoot, output)}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
