import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const libDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(libDir, "..");
const schemaPath = path.join(repoRoot, "schema", "vendor-review.schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });

addFormats(ajv);

const validate = ajv.compile(schema);

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
