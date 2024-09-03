import { HttpError } from "./http-error";

export type Init<TBody> = Omit<RequestInit, "body" | "method"> & {
  body?: TBody;
};

/**
 * @deprecated openapi の生成したものを使うこと
 */
export const fetcher = async <TBody extends object>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS",
  path: RequestInfo | URL,
  { body, headers, ...restInit }: Init<TBody> = {},
) => {
  const res = await fetch(path, {
    ...restInit,
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    method,
  });

  if (!res.ok) {
    throw new HttpError(res.status);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await res.json();
};
