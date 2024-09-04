import { writeFileSync } from "node:fs";
import { join } from "node:path";
import yaml from "yaml";
import { app } from "../main";

console.log("generating openapi docs");

const docs = app.getOpenAPIDocument({
  openapi: "3.0.0",
  info: { version: "1.0.0", title: "Tutorial API" },
});

const fileContent = yaml.stringify(docs);

const path = join(__dirname, "../../../../packages/openapi/src/openapi-docs.yml");

writeFileSync(path, fileContent, {
  encoding: "utf-8",
});

console.log("success");
