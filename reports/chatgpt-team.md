# ChatGPT Team / Business Vendor Risk Review

> Sample procurement-grade technical risk review. This is not legal advice, certification, a pentest, or a compliance guarantee.

| Field | Value |
|---|---|
| Review ID | sample-chatgpt-team |
| Review date | 2026-06-19 |
| Generated | 2026-06-19 |
| Reviewer | Jose Robles |
| Vendor | OpenAI |
| Product / plan | ChatGPT Team / ChatGPT Business / Team or Business workspace |
| Final recommendation | Go with controls |
| Risk level | Medium |

## Executive Summary

**Verdict:** Go with controls

A managed ChatGPT workspace can reduce shadow AI risk compared with personal accounts, but only if the company defines data entry rules, admin responsibilities, retention expectations, and review workflows. The main risk is users pasting sensitive customer data, confidential roadmap material, credentials, or proprietary code into prompts without a clear policy.

**Key risks**

- Customer support content may contain personal data, contractual issues, or confidential customer context.
- Developers may paste source code, logs, credentials, or vulnerability details into prompts.
- Workspace admins and provider support processes may have access patterns that need contractual and policy review.
- AI-generated code, analysis, and sales claims may be reused without adequate verification.

**Key controls**

- Create a data classification policy for prompts before rollout.
- Require redaction of customer identifiers and secrets.
- Assign workspace admins and review retention/export/delete settings.
- Define human review for support, sales, security, and code outputs.

**Caveats**

- OpenAI public documentation uses ChatGPT Business naming; this sample keeps the chatgpt-team directory for recognizable team-workspace evaluation.
- This review does not assess private enterprise terms, DPA execution, or security portal artifacts.
- This is a technical procurement review and does not provide legal advice.

## Company Adoption Scenario

**Company profile:** A 60-person B2B software company in Spain evaluating a shared ChatGPT workspace for product, support, sales, and engineering productivity.

**Intended use:** Use ChatGPT for drafting support replies, summarizing customer feedback, writing internal product briefs, generating SQL or code snippets, and preparing sales collateral.

**Users:** Support managers, product managers, sales engineers, and a small engineering pilot group.

**Deployment context:** Employees already use personal AI tools informally. The company wants a managed workspace with admin controls, but has not yet defined what customer or source-code data may be entered.

**Decision impact:** Outputs will support drafts and internal analysis. They must not be used as final legal, security, customer entitlement, hiring, or production code decisions without human review.

**Out of scope / non-goals**

- No automated customer eligibility, pricing, or account restriction decisions.
- No uploading production secrets, private keys, regulated health data, or full customer databases.
- No fine-tuning or custom external integration in this first review.

## Data Exposure Map

| Category | Examples | Source systems | Exposure path | Sensitivity | Processing note | Control notes |
| --- | --- | --- | --- | --- | --- | --- |
| Customer support data | Support tickets<br>Customer complaints<br>Contractual context<br>Account configuration details | Helpdesk<br>CRM<br>Email | Users may paste excerpts into ChatGPT to summarize, classify, or draft replies. | High | OpenAI states workspace admins can control retention for ChatGPT Business, and deleted or unsaved conversations are removed within stated timeframes subject to caveats. | Use redaction rules, prohibit full-ticket dumps by default, and require review before sending customer-facing replies. |
| Product and roadmap data | Roadmap notes<br>Customer feedback<br>Pricing ideas<br>Competitive analysis | Product docs<br>Notion or Confluence<br>CRM | Product and sales users may use prompts to convert notes into briefs, release notes, or sales messaging. | Medium | Workspace retention and export controls should be configured before broad use. | Mark confidential strategy as restricted and require source checking before external claims. |
| Engineering data | Code snippets<br>Stack traces<br>Logs<br>Architecture diagrams | GitHub<br>CI logs<br>Monitoring<br>Internal docs | Engineers may paste snippets or errors into ChatGPT for debugging or explanation. | High | Secrets and customer identifiers can appear in logs and code, making prompt hygiene critical. | Prohibit secrets and production logs, require local redaction, and define rules for AI-generated code review. |

## AI Act Role Hypothesis

**Likely role:** Customer as deployer of a general-purpose AI product in a professional context; OpenAI as vendor/provider of the service, subject to product and contractual details.

**Risk classification:** Likely not high-risk for the stated drafting, summarization, and productivity scenario, provided outputs do not determine decisions affecting people or access to essential services.

The proposed use is assistive and internal. Human users remain accountable for support replies, sales collateral, product decisions, and code changes. The hypothesis changes if outputs are used to make or materially influence decisions about people, customers, employment, credit, health, education, or legal rights.

**Caveats**

- General-purpose AI obligations and transparency rules may matter separately from high-risk classification.
- Use in HR, customer scoring, fraud decisions, or automated support resolution requires separate review.
- A legal review is needed for final AI Act role allocation and contractual duties.

**Review triggers**

- Connecting ChatGPT to internal systems through custom GPTs, actions, API integrations, or knowledge connectors.
- Using generated outputs to decide refunds, eligibility, account restrictions, or complaint outcomes.
- Allowing production code suggestions without engineering review and security testing.

## Security And Privacy Review Questions

| Category | Question | Why it matters | Evidence needed |
| --- | --- | --- | --- |
| Training and data use | For the purchased workspace plan, are customer prompts, files, and outputs used to train OpenAI models by default? | Procurement must confirm business-data commitments for the exact plan and contract. | OpenAI plan documentation, DPA, business terms, or security portal artifact. |
| Retention | What retention period is configured for workspace conversations, and who can export or delete them? | Retention affects privacy, investigations, eDiscovery, and incident response. | Workspace admin setting screenshot and policy owner approval. |
| Admin visibility | Which workspace admins can view, export, or delete user conversations, and under what policy? | Internal admin access can itself become a privacy and confidentiality risk. | Admin role list, access policy, and audit process. |
| Source code | What kinds of source code, logs, and vulnerability details are users allowed to submit? | Engineering prompts can contain IP, credentials, customer data, or security-sensitive context. | Engineering acceptable-use rule and examples of allowed/disallowed prompts. |

## Operational Dependency And Lock-In Risks

| Risk | Scenario | Impact | Mitigation |
| --- | --- | --- | --- |
| Prompt workflow dependency | Teams build daily drafting, support, or analysis habits around a single workspace. | Switching tools later can disrupt workflows and reduce productivity if prompts and processes are undocumented. | Store reusable prompts and policies in company-owned documentation, not only inside chat history. |
| Workspace knowledge accumulation | Users treat chat history as a knowledge base for product and customer context. | Important operational knowledge becomes hard to export, govern, or migrate. | Require final decisions, reusable outputs, and approved guidance to be copied into canonical internal systems. |
| Generated-code reliance | Engineers speed up implementation using AI-generated code without review discipline. | Security, licensing, maintainability, and correctness risks can accumulate invisibly. | Apply normal code review, tests, SAST, dependency review, and human ownership to generated code. |

## Human Oversight Checklist

| Control | Owner | Status | Evidence |
| --- | --- | --- | --- |
| Human owner remains accountable for every customer-facing reply. | Support lead | Required | Support workflow requiring review before sending. |
| Generated code is reviewed and tested like human-written code. | Engineering manager | Required | Pull request checklist and CI evidence. |
| Users redact personal data, secrets, and customer identifiers unless explicitly approved. | All users | Required | Acceptable-use policy and onboarding record. |
| Workspace admin actions are logged and periodically reviewed. | IT or operations | Recommended | Admin review cadence and access list. |

## Recommended Controls

| Priority | Control | Rationale | Owner | Timing |
| --- | --- | --- | --- | --- |
| P0 | Create a prompt data classification rule before inviting users. | Users need concrete boundaries for customer data, secrets, code, and confidential business information. | COO and security owner | Before rollout |
| P0 | Configure workspace admins, retention, SSO/MFA, and export policy. | The company needs managed controls before replacing shadow AI use. | IT | Before rollout |
| P1 | Create approved prompt examples for support, product, sales, and engineering. | Good defaults reduce risky copy-paste behavior. | Department leads | Pilot week 1 |
| P1 | Run a 30-day incident and value review. | Expansion should be based on evidence of useful and safe behavior. | Pilot owner | After pilot |

## Final Recommendation

**Outcome:** Go with controls

Approve a managed workspace pilot as a safer alternative to unmanaged personal AI use, but only with explicit data-entry rules, admin configuration, and human review. The company should avoid treating the tool as approved for sensitive decisions or unrestricted code/data uploads.

**Conditions**

- Workspace purchased under business terms, not personal accounts.
- Retention, admin roles, SSO/MFA, and export controls documented.
- No secrets, full customer databases, regulated health data, or production logs in prompts.
- Human review required for customer, sales, security, and code outputs.

**Pause triggers**

- No DPA or business-data commitment available for the plan.
- Teams insist on uploading raw customer datasets or production logs.
- Outputs will decide customer eligibility, refunds, hiring, or account restrictions.

**Next review:** Repeat before adding connectors, custom GPT actions, API integrations, or high-impact decision workflows.

## Evidence Appendix

| Source | Publisher | Retrieved | Notes |
| --- | --- | --- | --- |
| Business data privacy, security, and compliance | [OpenAI](https://openai.com/business-data/) | 2026-06-19 | Used for business data, retention controls, and security framing. |
| Enterprise privacy at OpenAI | [OpenAI](https://openai.com/enterprise-privacy/) | 2026-06-19 | Used for ChatGPT Business privacy, admin visibility, SOC 2, and retention statements. |
| ChatGPT Business plan | [OpenAI](https://chatgpt.com/business/business-plan/) | 2026-06-19 | Used for plan-level business workspace positioning and public security claims. |
| AI Act Service Desk - Article 50 | [European Commission AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50) | 2026-06-19 | Used for transparency obligation framing where users interact with AI systems or AI-generated content is disclosed. |
| AI Act Service Desk - FAQ | [European Commission AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/faq) | 2026-06-19 | Used for general-purpose AI/provider context and official explanatory navigation. |
