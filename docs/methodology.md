# Methodology

The AI Vendor Risk Review is a focused technical procurement memo for companies adopting AI tools.

## Review Principles

1. **Use-case first:** the same vendor can be low risk in one deployment and high risk in another.
2. **Data exposure before model debate:** the practical risk usually starts with what data users can enter or connect.
3. **Role hypothesis, not legal conclusion:** AI Act analysis is framed as a technical hypothesis to validate with counsel where appropriate.
4. **Controls over vibes:** each concern should lead to a procurement question, deployment constraint, or operational control.
5. **Evidence-based:** public vendor claims and official sources are cited in the appendix.

## Review Flow

1. Define the company scenario, users, intended use, and non-goals.
2. Map data categories and exposure paths.
3. Identify likely vendor and customer roles.
4. Form an AI Act role and risk hypothesis with caveats.
5. Ask security, privacy, retention, logging, data residency, admin, and subprocessor questions.
6. Identify operational dependency and lock-in risk.
7. Define human oversight controls.
8. Recommend Go, Go with controls, or Pause.

## Recommendation Scale

**Go** means the planned use appears technically reasonable with standard controls.

**Go with controls** means the adoption can proceed only after specific controls, scope limits, or procurement evidence are in place.

**Pause** means the use case should not move forward until material uncertainty is resolved, typically around sensitive data, high-impact decisions, weak vendor evidence, missing oversight, or unclear contractual terms.

## AI Act Handling

The review uses terms such as provider, deployer, high-risk, transparency, and human oversight as technical procurement hypotheses. It does not issue a legal classification.

Common caveats:

- The same tool may be treated differently depending on the use case.
- A company using an AI system professionally is often closer to a deployer role, but role allocation can change with customization, resale, integration, or placing a system on the market.
- High-risk analysis depends on the intended purpose, sector, affected people, and whether the system falls within listed categories.
- General-purpose AI and transparency obligations require separate review where relevant.

## Evidence Standard

Each report should cite:

- Vendor security/privacy documentation
- Product architecture or admin documentation where available
- Data processing, DPA, subprocessor, or retention documentation where available
- Official AI Act or European Commission sources for regulatory framing

Where evidence is missing, the report should say so and convert the gap into a procurement question.
