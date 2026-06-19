# Notion AI Vendor Risk Review

> Sample procurement-grade technical risk review. This is not legal advice, certification, a pentest, or a compliance guarantee.

| Field | Value |
|---|---|
| Review ID | sample-notion-ai |
| Review date | 2026-06-19 |
| Generated | 2026-06-19 |
| Reviewer | Jose Robles |
| Vendor | Notion |
| Product / plan | Notion AI / Business or Enterprise workspace |
| Final recommendation | Go with controls |
| Risk level | Medium |

## Executive Summary

**Verdict:** Go with controls

Notion AI is a useful candidate for knowledge-work acceleration where Notion is already the company wiki. The main risk is workspace permission sprawl: if sensitive HR, client, finance, or strategy pages are broadly visible, AI search and summarization can make that exposure easier to discover and reuse.

**Key risks**

- Users may query across pages they can access but should not need for their role.
- Client workspaces and guest access can complicate confidentiality boundaries.
- AI subprocessors and retention differ by plan and feature, especially for Enterprise versus non-Enterprise workspaces.
- Generated summaries may flatten caveats, dates, or ownership in operational procedures.

**Key controls**

- Review teamspaces, guests, inherited page permissions, and sensitive HR/client areas before rollout.
- Limit AI use to approved teamspaces during the pilot.
- Confirm subprocessor, retention, zero-data-retention, and Enterprise plan details.
- Require human approval before using generated client-facing text.

**Caveats**

- This sample uses public Notion documentation and does not inspect private Trust Center reports.
- Enterprise Search, AI connectors, and third-party connected apps require separate data-flow review.
- This is a technical procurement review, not legal advice.

## Company Adoption Scenario

**Company profile:** An 85-person agency and operations consultancy using Notion as its internal wiki, project hub, and client delivery workspace.

**Intended use:** Enable Notion AI to summarize project pages, draft meeting notes, search internal knowledge, rewrite client-facing drafts, and help staff find procedures.

**Users:** Consultants, project managers, operations, HR, and leadership.

**Deployment context:** The company uses shared client spaces, guest access, HR pages, project databases, and internal SOPs in the same Notion workspace. Permission hygiene is uneven.

**Decision impact:** AI outputs will support internal knowledge work and drafts. They should not determine HR, performance, contractual, legal, or client delivery decisions without human review.

**Out of scope / non-goals**

- No use for employee scoring, hiring, performance evaluation, or disciplinary decisions.
- No automatic client advice or contractual interpretation.
- No Enterprise Search connector rollout until the base workspace permissions are reviewed.

## Data Exposure Map

| Category | Examples | Source systems | Exposure path | Sensitivity | Processing note | Control notes |
| --- | --- | --- | --- | --- | --- | --- |
| Workspace pages and databases | Project pages<br>SOPs<br>Meeting notes<br>Client delivery databases | Notion workspace<br>Teamspaces<br>Shared pages | Notion AI may use pages available to the requesting user to answer, summarize, or draft content. | Medium | Notion states AI respects existing permissions and describes different LLM provider retention defaults by plan. | Pilot only in reviewed teamspaces and remove broad access from sensitive databases. |
| Client confidential information | Client strategy notes<br>Contracts excerpts<br>Delivery risks<br>Commercial terms | Client workspaces<br>Shared pages<br>Consultant notes | Users may ask Notion AI to summarize or rewrite client pages and then reuse output externally. | High | Client confidentiality obligations may be stricter than default workspace settings or public vendor documentation. | Separate client spaces, restrict guest visibility, and require client-facing review before reuse. |
| HR and internal operations | People notes<br>Performance context<br>Compensation planning<br>Internal incidents | HR teamspace<br>Leadership pages<br>Private databases | If HR pages are visible to broad groups, AI features may make sensitive context easier to locate. | High | The review assumes HR use is out of scope; any HR AI use needs separate review. | Exclude HR and performance content from pilot; audit page access and guest access. |

## AI Act Role Hypothesis

**Likely role:** Customer as deployer of a third-party AI system for internal knowledge work; Notion as vendor/provider of the workspace AI service, subject to exact contract and feature use.

**Risk classification:** Likely not high-risk for the stated knowledge-search and drafting use if HR, hiring, worker evaluation, client eligibility, and other high-impact decisions remain excluded.

The planned deployment is assistive and focused on summarization, drafting, and knowledge retrieval. Human staff remain responsible for decisions and external outputs. The risk hypothesis changes if Notion AI is used in HR, employee management, performance review, or decisions affecting natural persons.

**Caveats**

- Use in HR or worker management can materially change AI Act analysis and should be reviewed separately.
- Enterprise Search and external connectors can expand data sources and must be mapped before rollout.
- Final legal interpretation depends on exact use, sector, affected people, and contractual structure.

**Review triggers**

- Enabling Enterprise Search or connectors to Slack, Microsoft Teams, Jira, Google Drive, or other systems.
- Using AI outputs for HR, hiring, performance, disciplinary, or staffing decisions.
- Granting broad guest/client access to AI-enabled workspaces.

## Security And Privacy Review Questions

| Category | Question | Why it matters | Evidence needed |
| --- | --- | --- | --- |
| Permissions | Which teamspaces, pages, and databases are visible to all workspace members or large groups? | Notion AI respects existing permissions, so poor permissions become easier to exploit through search and summarization. | Workspace access export, sensitive page inventory, and guest access report. |
| Subprocessors | Which AI subprocessors process customer data for this plan and feature set? | AI processing may involve third parties, and plan-specific retention or processing controls may differ. | Notion DPA, subprocessor list, Trust Center artifacts, or procurement response. |
| Retention | Does the selected workspace plan receive zero data retention with LLM providers, or a different retention period? | Notion public docs distinguish Enterprise defaults from non-Enterprise defaults for LLM provider retention. | Plan confirmation and admin/procurement documentation. |
| External sharing | Which client or guest pages will have AI-enabled content, and who can ask AI questions over them? | Client confidentiality and guest access boundaries are often operationally messy in Notion workspaces. | Guest list, client space inventory, and sharing policy. |

## Operational Dependency And Lock-In Risks

| Risk | Scenario | Impact | Mitigation |
| --- | --- | --- | --- |
| Workspace-as-operating-system dependency | The company already runs SOPs, projects, client notes, and knowledge in Notion, then adds AI on top. | The cost of leaving Notion rises because knowledge structure, AI habits, and daily operations converge in one platform. | Maintain export practices, canonical owners, and periodic backups for critical procedures and client records. |
| Implicit permission model | Teams rely on inherited page permissions and informal sharing rather than explicit data ownership. | Scaling AI use increases the consequences of old access mistakes. | Assign data owners for sensitive teamspaces and run quarterly access reviews. |
| AI connector expansion | After initial success, teams connect Slack, Jira, Drive, or Microsoft Teams to Enterprise Search. | Data exposure multiplies across systems before governance catches up. | Require a separate connector review for each connected source. |

## Human Oversight Checklist

| Control | Owner | Status | Evidence |
| --- | --- | --- | --- |
| Sensitive teamspaces are excluded from the initial pilot. | Operations | Required | Pilot scope list and workspace settings. |
| Client-facing text generated by Notion AI is reviewed by the responsible consultant. | Project leads | Required | Delivery checklist and approval note. |
| HR, performance, and staffing decisions do not use AI-generated summaries or recommendations. | HR lead | Required | HR exclusion note and training acknowledgement. |
| Workspace access and guest sharing are reviewed before expanding the pilot. | IT or operations | Recommended | Access review report. |

## Recommended Controls

| Priority | Control | Rationale | Owner | Timing |
| --- | --- | --- | --- | --- |
| P0 | Inventory sensitive teamspaces and remove broad access before enabling AI. | Workspace permission hygiene is the central control for Notion AI risk. | Operations | Before pilot |
| P0 | Exclude HR, finance, legal, and sensitive client spaces from initial use. | This keeps the first deployment in a lower-risk knowledge-work lane. | Leadership | Before pilot |
| P1 | Confirm plan-specific AI retention and subprocessor terms. | Public documentation indicates different retention defaults depending on plan and feature. | Procurement | Before purchase |
| P1 | Create page-level guidance for AI summaries and client-facing reuse. | Users need to know when AI output is a draft and when source verification is required. | Project management office | Pilot week 1 |

## Final Recommendation

**Outcome:** Go with controls

Proceed with a limited Notion AI pilot only after workspace permissions and sensitive teamspaces are cleaned up. The tool is reasonable for knowledge search and drafting, but not for HR, performance, or client-impacting decisions without a separate review.

**Conditions**

- Pilot limited to reviewed teamspaces and named user groups.
- HR, finance, legal, and sensitive client spaces excluded from pilot.
- Guest access and broad page permissions reviewed.
- Plan-specific retention and subprocessor position confirmed.

**Pause triggers**

- No reliable inventory of guest access or sensitive pages.
- Leadership wants AI summaries for HR or performance management.
- Enterprise Search connectors are enabled before source-system review.

**Next review:** Repeat before enabling Enterprise Search, external connectors, HR use cases, or company-wide rollout.

## Evidence Appendix

| Source | Publisher | Retrieved | Notes |
| --- | --- | --- | --- |
| Notion AI security and privacy practices | [Notion](https://www.notion.com/help/notion-ai-security-practices) | 2026-06-19 | Used for permissions, AI subprocessors, training, segregation, encryption, and retention defaults. |
| Notion Security and Compliance | [Notion](https://www.notion.com/security) | 2026-06-19 | Used for security, compliance, admin controls, AI governance, and enterprise control framing. |
| Security practices | [Notion Help Center](https://www.notion.com/help/security-and-privacy) | 2026-06-19 | Used for security program and compliance report context. |
| AI Act Service Desk - Article 14 | [European Commission AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14) | 2026-06-19 | Used for human oversight framing when a use case approaches high-risk territory. |
| AI Act Service Desk - Article 6 | [European Commission AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-6) | 2026-06-19 | Used for high-risk classification caveats and review triggers. |
