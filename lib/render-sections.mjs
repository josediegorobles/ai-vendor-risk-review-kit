function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function escapeCell(value) {
  return String(value).replace(/\n/g, "<br>").replace(/\|/g, "\\|");
}

function table(headers, rows) {
  const header = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`).join("\n");
  return [header, separator, body].join("\n");
}

export function renderHeader(review) {
  return `# ${review.review.title}

> Sample procurement-grade technical risk review. This is not legal advice, certification, a pentest, or a compliance guarantee.

| Field | Value |
|---|---|
| Review ID | ${review.review.id} |
| Review date | ${review.review.date} |
| Generated | ${review.review.date} |
| Reviewer | ${review.review.reviewer} |
| Vendor | ${review.vendor.name} |
| Product / plan | ${review.vendor.product} / ${review.vendor.plan} |
| Final recommendation | ${review.final_recommendation.outcome} |
| Risk level | ${review.executive_summary.risk_level} |`;
}

export function renderExecutiveSummary(review) {
  return `## Executive Summary

**Verdict:** ${review.executive_summary.verdict}

${review.executive_summary.summary}

**Key risks**

${bulletList(review.executive_summary.key_risks)}

**Key controls**

${bulletList(review.executive_summary.key_controls)}

**Caveats**

${bulletList(review.executive_summary.caveats)}`;
}

export function renderAdoptionScenario(review) {
  return `## Company Adoption Scenario

**Company profile:** ${review.adoption_scenario.company_profile}

**Intended use:** ${review.adoption_scenario.intended_use}

**Users:** ${review.adoption_scenario.users}

**Deployment context:** ${review.adoption_scenario.deployment_context}

**Decision impact:** ${review.adoption_scenario.decision_impact}

**Out of scope / non-goals**

${bulletList(review.adoption_scenario.non_goals)}`;
}

export function renderDataExposure(review) {
  const rows = review.data_exposure_map.map((item) => [
    item.category,
    item.examples.join("<br>"),
    item.source_systems.join("<br>"),
    item.exposure_path,
    item.sensitivity,
    item.retention_or_processing_note,
    item.control_notes,
  ]);

  return `## Data Exposure Map

${table(["Category", "Examples", "Source systems", "Exposure path", "Sensitivity", "Processing note", "Control notes"], rows)}`;
}

export function renderAiActRole(review) {
  return `## AI Act Role Hypothesis

**Likely role:** ${review.ai_act_role_hypothesis.likely_role}

**Risk classification:** ${review.ai_act_role_hypothesis.risk_classification}

${review.ai_act_role_hypothesis.rationale}

**Caveats**

${bulletList(review.ai_act_role_hypothesis.caveats)}

**Review triggers**

${bulletList(review.ai_act_role_hypothesis.review_triggers)}`;
}

export function renderSecurityQuestions(review) {
  const rows = review.security_privacy_questions.map((item) => [
    item.category,
    item.question,
    item.why_it_matters,
    item.evidence_needed,
  ]);

  return `## Security And Privacy Review Questions

${table(["Category", "Question", "Why it matters", "Evidence needed"], rows)}`;
}

export function renderLockIn(review) {
  const rows = review.lock_in_risks.map((item) => [
    item.risk,
    item.scenario,
    item.impact,
    item.mitigation,
  ]);

  return `## Operational Dependency And Lock-In Risks

${table(["Risk", "Scenario", "Impact", "Mitigation"], rows)}`;
}

export function renderOversight(review) {
  const rows = review.human_oversight_checklist.map((item) => [
    item.control,
    item.owner,
    item.status,
    item.evidence,
  ]);

  return `## Human Oversight Checklist

${table(["Control", "Owner", "Status", "Evidence"], rows)}`;
}

export function renderRecommendedControls(review) {
  const rows = review.recommended_controls.map((item) => [
    item.priority,
    item.control,
    item.rationale,
    item.owner,
    item.timing,
  ]);

  return `## Recommended Controls

${table(["Priority", "Control", "Rationale", "Owner", "Timing"], rows)}`;
}

export function renderRecommendation(review) {
  return `## Final Recommendation

**Outcome:** ${review.final_recommendation.outcome}

${review.final_recommendation.rationale}

**Conditions**

${bulletList(review.final_recommendation.conditions)}

**Pause triggers**

${bulletList(review.final_recommendation.pause_triggers)}

**Next review:** ${review.final_recommendation.next_review}`;
}

export function renderEvidenceAppendix(review) {
  const rows = review.evidence_sources.map((item) => [
    item.title,
    `[${item.publisher}](${item.url})`,
    item.retrieved,
    item.notes,
  ]);

  return `## Evidence Appendix

${table(["Source", "Publisher", "Retrieved", "Notes"], rows)}`;
}

export function renderMarkdown(review) {
  return `${[
    renderHeader(review),
    renderExecutiveSummary(review),
    renderAdoptionScenario(review),
    renderDataExposure(review),
    renderAiActRole(review),
    renderSecurityQuestions(review),
    renderLockIn(review),
    renderOversight(review),
    renderRecommendedControls(review),
    renderRecommendation(review),
    renderEvidenceAppendix(review),
  ].join("\n\n")}
`;
}
