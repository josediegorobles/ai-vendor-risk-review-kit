# AI Vendor Risk Review Kit

Procurement-grade technical risk reviews for companies adopting AI tools.

Before a small or mid-sized company buys or deploys an AI tool, this kit shows the kind of technical procurement memo I can deliver in 24-48 hours: data exposure, vendor risk, likely AI Act role, security questions, lock-in risk, human oversight controls, and a practical go / go-with-controls / pause recommendation.

## Offer

**AI Vendor Risk Review**

- **490 EUR + VAT**
- **24-48h turnaround**
- **First 3 reviews**
- **White-label available** for lawyers, consultants, and advisory firms that need a technical review layer

Best fit: a company is about to buy, approve, or expand an AI tool and wants a focused technical risk memo before the decision becomes operational reality.

## What You Get

- Executive memo for decision-makers
- Company adoption scenario and assumptions
- Data exposure map
- AI Act role hypothesis with caveats
- Vendor lock-in and operational dependency review
- Human oversight checklist
- Security and privacy procurement questions
- Recommended controls before rollout
- Final recommendation: **Go**, **Go with controls**, or **Pause**
- Evidence appendix with public vendor and regulatory sources

## What This Is Not

- Not legal advice
- Not a certification
- Not a pentest
- Not a GDPR or AI Act compliance guarantee
- Not a full vendor audit
- Not a replacement for counsel, DPO, procurement, or security approval

The review is a technical and procurement-oriented risk memo. It is designed to help teams ask better questions, document assumptions, and avoid adopting AI tools blindly.

## Sample Packs

This repository includes three sample reviews generated from structured YAML:

- [Microsoft 365 Copilot](reports/microsoft-365-copilot.md)
- [ChatGPT Team / Business](reports/chatgpt-team.md)
- [Notion AI](reports/notion-ai.md)

The samples use public vendor documentation and official AI Act sources. They are illustrative, not a verdict on any specific customer deployment.

## How It Works

1. Fill in a `vendor-review.yaml` using the schema in [schema/vendor-review.schema.json](schema/vendor-review.schema.json).
2. Validate the review.
3. Generate a Markdown report.
4. Use the report as a decision memo, procurement appendix, or white-label technical input.

```bash
npm ci
npm run validate
npm run generate
npm run check
```

Generate one report:

```bash
node scripts/generate-report.mjs samples/chatgpt-team/vendor-review.yaml
```

## Repository Structure

```text
schema/      JSON Schema for vendor-review.yaml
templates/   Markdown report template for human authors
samples/     Public sample review packs
reports/     Generated Markdown reports
docs/        Methodology, offer, and disclaimer
scripts/     Generator and validators
test/        Minimal generator tests
```

## Contact

- Email: [jose@josedrobles.com](mailto:jose@josedrobles.com)
- LinkedIn: [Jose Robles](https://www.linkedin.com/in/jose-robles-644a4352/)
- Book a technical review: [Calendly](https://calendly.com/jd-robles/technical-review)

## License

MIT. See [LICENSE](LICENSE).
