import yaml from "yaml";
import { writeFileSync } from "fs";
import { app } from "../main";
import { join } from "path";

console.log("generating openapi docs");

const docs = app.getOpenAPIDocument({
  openapi: "3.0.0",
  info: { version: "1.0.0", title: "Tutorial API" },
});

const fileContent = yaml.stringify(docs);

const path = join(
  __dirname,
  "../../../../packages/openapi/src/openapi-docs.yml",
);

writeFileSync(path, fileContent, {
  encoding: "utf-8",
});

console.log("success");
