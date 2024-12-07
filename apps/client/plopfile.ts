import { HttpClient } from "@/utils/http-client";
import type { OpenAPIObject, OperationObject } from "openapi3-ts/oas30";
import type { ActionType, NodePlopAPI } from "plop";
import { z } from "zod";

const MethodSchema = z.enum(["get", "put", "post", "delete", "options", "head", "patch", "trace"]);
type Method = z.infer<typeof MethodSchema>;

type Data = {
  tagName: string;
  tag: string;
  handlerData: HandlerData;
};

type HandlerData = {
  name: string;
  method: Method;
  mockpath: string;
};

const toPascalCase = (input: string): string => {
  return input
    .split(/[\s_-]+/) // スペース、アンダースコア、ハイフンで分割
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

export default async function (plop: NodePlopAPI) {
  const doc: OpenAPIObject = await new HttpClient("http://localhost:8787").fetch("/doc", {
    method: "get",
  });

  let tagList: string[] = [];

  const data = Object.entries(doc.paths).flatMap(([path, item]): Data[] => {
    const methodData = Object.entries(item)
      .filter(([key]) => MethodSchema.safeParse(key).success)
      .map((value) => {
        const [method, operation] = value as [Method, OperationObject];
        const tags = operation.tags;

        const tag = tags?.length ? `/${tags.join("/")}` : "";
        if (!tagList.includes(tag)) {
          tagList = [...tagList, tag];
        }
        const tagName = tags?.length ? tags[tags.length - 1] : "";
        return { method, tag, tagName };
      });
    const pathArray = path
      .split("/") // スラッシュで分割
      .filter((segment) => segment) // 空の要素を除外
      .map((segment) =>
        segment.startsWith("{") && segment.endsWith("}")
          ? segment.slice(1, -1) // 波括弧を取り除く
          : segment,
      );
    const mockpath = path.replace(/{([^}]*)}/g, ":$1");

    return methodData.map((methodData): Data => {
      const name = toPascalCase(methodData.method) + toPascalCase(pathArray.join(" "));
      return {
        tagName: methodData.tagName,
        tag: methodData.tag,
        handlerData: {
          name,
          method: methodData.method,
          mockpath,
        },
      };
    });
  });

  plop.setGenerator("mocks", {
    description: "generate mocks from openapi",
    prompts: [],
    actions: [
      ...tagList.map(
        (tag): ActionType => ({
          type: "add",
          path: `src/gen/api${tag}/mock.ts`,
          templateFile: "plop-templates/mock/mock.ts.hbs",
          force: true,
        }),
      ),
      ...data.flatMap((data): ActionType[] => [
        {
          type: "append",
          path: `src/gen/api${data.tag}/mock.ts`,
          templateFile: "plop-templates/mock/handler.ts.hbs",
          data: data.handlerData satisfies HandlerData,
        },
        {
          type: "modify",
          path: `src/gen/api${data.tag}/mock.ts`,
          pattern: /(\/\/ IMPORTS)/g,
          template: 'import { get{{name}}ResponseMock } from "./{{tagName}}.msw";\n$1',
          data: {
            name: data.handlerData.name,
            tagName: data.tagName,
          },
        },
      ]),
      ...tagList.map(
        (tag): ActionType => ({
          type: "modify",
          path: `src/gen/api${tag}/mock.ts`,
          pattern: /(\/\/ IMPORTS)/g,
        }),
      ),
    ],
  });
}
