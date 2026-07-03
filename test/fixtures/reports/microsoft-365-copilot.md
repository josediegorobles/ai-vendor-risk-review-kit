# Microsoft 365 Copilot Vendor Risk Review

> Sample procurement-grade technical risk review. This is not legal advice, certification, a pentest, or a compliance guarantee.

| Field | Value |
|---|---|
| Review ID | sample-microsoft-365-copilot |
| Review date | 2026-06-19 |
| Generated | 2026-06-19 |
| Reviewer | Jose Robles |
| Vendor | Microsoft |
| Product / plan | Microsoft 365 Copilot / Commercial Microsoft 365 tenant add-on |
| Final recommendation | Go with controls |
| Risk level | Medium |

## Executive Summary

**Verdict:** Go with controls

Microsoft 365 Copilot is a plausible fit for a controlled pilot because it operates inside the Microsoft 365 service boundary and uses existing user permissions. The main adoption risk is not the model itself, but overshared internal data, weak SharePoint/Teams permissions, prompt handling, and users treating generated answers as verified business facts.

**Key risks**

- Permission sprawl can make sensitive files discoverable to users through Copilot if those users already have access.
- Meeting summaries and document drafts may include client confidential information, employee data, pricing, or strategy.
- Web search and agents may introduce separate data-handling terms that need plan-specific review.
- Staff may over-rely on generated summaries or proposal drafts without source checks.

**Key controls**

- Run a permissions and external sharing cleanup before enabling pilot users.
- Limit pilot scope to named user groups and approved business tasks.
- Require human review before client-facing reuse of generated content.
- Confirm DPA, retention, audit, Purview, sensitivity label, and web query settings with Microsoft documentation and tenant configuration.

**Caveats**

- This sample uses public Microsoft documentation and does not review private contract terms.
- Risk changes materially if Copilot Studio agents or third-party plugins are added.
- This is a technical procurement review, not legal advice or AI Act classification.

## Company Adoption Scenario

**Company profile:** A 120-person professional services firm in Spain using Microsoft 365 for email, Teams, SharePoint, OneDrive, Word, Excel, and PowerPoint.

**Intended use:** Enable Copilot for 25 pilot users to summarize meetings, draft client proposals, search internal knowledge, and accelerate document review.

**Users:** Partners, sales leads, project managers, and operations staff.

**Deployment context:** The company already uses Entra ID, Microsoft 365 groups, SharePoint sites, Teams channels, and sensitivity labels, but has not completed a permissions cleanup before AI rollout.

**Decision impact:** Copilot output will support internal productivity and client-facing drafts, but humans remain responsible for final decisions and external communications.

**Out of scope / non-goals**

- No automated hiring, credit, health, legal, or disciplinary decisions.
- No autonomous client advice without professional review.
- No custom Copilot agent connected to external systems during the first pilot.

## Data Exposure Map

| Category | Examples | Source systems | Exposure path | Sensitivity | Processing note | Control notes |
| --- | --- | --- | --- | --- | --- | --- |
| Internal documents | Client proposals<br>Project plans<br>Internal policies<br>Commercial templates | SharePoint<br>OneDrive<br>Teams files | Copilot grounds responses in Microsoft Graph data that the signed-in user is authorized to access. | High | Prompts and responses may be stored in Copilot interaction history and governed by Microsoft 365 retention/audit capabilities depending on configuration. | Review SharePoint permissions, external sharing, guest access, sensitivity labels, and restricted search options before pilot. |
| Communications | Email threads<br>Teams chats<br>Meeting transcripts<br>Calendar context | Exchange<br>Teams<br>Outlook calendar | Users may ask Copilot to summarize or draft from communications they can already access. | High | Generated summaries can preserve sensitive context even when the original communication is fragmented across systems. | Define meeting recording/transcription rules and prohibit summarizing privileged or highly confidential meetings without approval. |
| Prompt and response content | User prompts<br>Generated proposal text<br>Generated analysis | Microsoft 365 Copilot | Users enter prompts and receive responses inside Microsoft 365 apps and Copilot chat surfaces. | Medium | Microsoft states enterprise data protection applies to prompts and responses, but customer retention settings and licensing should be verified. | Create prompt rules for confidential data, client identifiers, legal advice, and personal data. |

## AI Act Role Hypothesis

**Likely role:** Customer as deployer of a third-party AI system; Microsoft likely acts as provider/vendor for the product, subject to contract and exact use.

**Risk classification:** Likely not high-risk for the stated productivity pilot, assuming no use for employment, credit, education, health, law enforcement, safety, or access-to-essential-services decisions.

The intended use is productivity support: summarization, drafting, and internal search. The tool does not make or materially determine decisions about natural persons in this scenario. Transparency, user training, human oversight, and data governance remain relevant.

**Caveats**

- If Copilot outputs are used to rank candidates, evaluate employees, assess customers, or make decisions affecting people, the hypothesis must be reopened.
- If the company builds custom agents or places an AI-enabled service on the market, role allocation may change.
- Private sector and national guidance may affect the final assessment.

**Review triggers**

- Connecting Copilot Studio agents to CRM, HR, finance, ticketing, or customer support systems.
- Using outputs directly in client advice or regulated professional work.
- Expanding from pilot users to company-wide access without permissions review.

## Security And Privacy Review Questions

| Category | Question | Why it matters | Evidence needed |
| --- | --- | --- | --- |
| Permissions | What percentage of SharePoint sites, Teams channels, and OneDrive folders are accessible beyond their intended audience? | Copilot can surface information a user is already authorized to access, so existing oversharing becomes AI-discoverable. | Microsoft 365 access review, sharing report, Purview data security posture, or equivalent export. |
| Retention and audit | Which retention, eDiscovery, and audit policies apply to Copilot prompts, responses, and interaction history in this tenant? | The company needs to know how generated content can be reviewed, retained, deleted, or discovered. | Tenant policy screenshots or admin documentation linked to the purchased plan. |
| Web grounding | Is web search enabled, and what data-handling commitments apply to generated web queries? | Microsoft documents separate handling for web queries, including different controller terms for Bing search. | Admin setting export and Microsoft product terms for web query handling. |
| Agents and extensibility | Will users be allowed to install, build, or invoke agents, connectors, or plugins during the pilot? | Agents and third-party integrations can create new data flows beyond the base Copilot review. | Admin policy for Copilot Studio, connectors, app consent, and third-party apps. |

## Operational Dependency And Lock-In Risks

| Risk | Scenario | Impact | Mitigation |
| --- | --- | --- | --- |
| Microsoft 365 ecosystem dependency | Copilot value depends on Microsoft 365 content, identities, labels, meetings, and document workflows. | Switching later may require changing collaboration habits and retraining staff, not just replacing a model. | Keep original documents in standard formats, document approved use cases, and avoid building critical workflows that only exist as Copilot prompts. |
| Permission remediation backlog | Copilot rollout reveals years of inherited SharePoint and Teams access debt. | Rollout may stall or expose sensitive material to users who technically had access but no business need. | Treat permissions cleanup as a pilot prerequisite and assign site owners before rollout. |
| Plan-specific controls | The company assumes all security controls are available, but some require E5, Purview, or additional configuration. | Procurement may approve a tool without the controls needed for the target risk level. | Map required controls to actual licenses before purchase. |

## Human Oversight Checklist

| Control | Owner | Status | Evidence |
| --- | --- | --- | --- |
| Named pilot owner approves use cases and user group. | COO | Required | Pilot charter with allowed and prohibited uses. |
| Generated external content is reviewed by an accountable employee before sending. | Department leads | Required | Review checklist for proposals, emails, and client deliverables. |
| Users verify source documents for factual or contractual claims. | Pilot users | Required | User guidance and spot checks. |
| Sensitive meetings require explicit approval before transcription and AI summary. | Legal or operations | Recommended | Meeting recording policy and Teams admin settings. |

## Recommended Controls

| Priority | Control | Rationale | Owner | Timing |
| --- | --- | --- | --- | --- |
| P0 | Complete a targeted permissions cleanup for pilot users and high-risk repositories. | The largest practical risk is exposing already-overshared data through AI search and summarization. | IT | Before pilot |
| P0 | Disable third-party agents/connectors during the first pilot unless separately reviewed. | This keeps data flows bounded while the company learns operational behavior. | IT security | Before pilot |
| P1 | Publish an AI acceptable-use note for Copilot. | Users need clear boundaries for personal data, client confidential data, legal advice, and external reuse. | Operations | Pilot week 1 |
| P1 | Collect user feedback and incident reports for 30 days. | The company needs evidence before expanding from pilot to broad deployment. | Pilot owner | During pilot |

## Final Recommendation

**Outcome:** Go with controls

Proceed with a limited pilot only after permissions, web query, retention, and agent settings are confirmed. The tool is credible for productivity use, but the deployment should be treated as a data governance project, not a simple software enablement.

**Conditions**

- Pilot limited to 25 named users and approved use cases.
- Permissions cleanup completed for pilot SharePoint sites, Teams channels, and OneDrive folders.
- No HR, legal, health, credit, or automated decision use without separate review.
- Human review required before client-facing reuse.

**Pause triggers**

- Material unresolved external sharing or guest access findings.
- No clear tenant-level retention/audit answer for prompts and responses.
- Business insists on immediate company-wide rollout.

**Next review:** Repeat after 30 pilot days or before enabling agents, connectors, or company-wide rollout.

## Evidence Appendix

| Source | Publisher | Retrieved | Notes |
| --- | --- | --- | --- |
| Data, Privacy, and Security for Microsoft 365 Copilot | [Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-privacy) | 2026-06-19 | Used for permissions, privacy, and data access framing. |
| Microsoft 365 Copilot architecture and how it works | [Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/microsoft-365-copilot-architecture) | 2026-06-19 | Used for service boundary, Microsoft Graph grounding, MFA, and user permission scope. |
| Enterprise data protection in Microsoft 365 Copilot and Microsoft 365 Copilot Chat | [Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/enterprise-data-protection) | 2026-06-19 | Used for enterprise data protection, prompts/responses, web query caveats, and agents caveat. |
| AI Act Service Desk - Article 26 | [European Commission AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26) | 2026-06-19 | Used for deployer obligation and human oversight framing where high-risk analysis is triggered. |
| AI Act Explorer | [European Commission AI Act Service Desk](https://ai-act-service-desk.ec.europa.eu/en/ai-act-explorer) | 2026-06-19 | Used as official navigation reference for Regulation (EU) 2024/1689. |
