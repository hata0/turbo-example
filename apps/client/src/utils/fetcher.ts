// import { BACKEND_URL } from "@/constants/backend-url";
import { fromPromise } from "neverthrow";
import { HttpError } from "./http-error";

const BACKEND_URL = "http://localhost:8787";

export const fetcher = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<T> => {
  const res = await fromPromise(
    fetch(`${BACKEND_URL}${input}`, {
      cache: "no-store",
      ...init,
    }),
    (e) => e,
  );

  if (res.isErr()) {
    throw res.error;
  }

  if (!res.value.ok) {
    throw new HttpError(res.value.status);
  }

  const data = await res.value.json();

  return data;
};
