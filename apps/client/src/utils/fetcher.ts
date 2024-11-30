import { BACKEND_URL } from "@/constants/backend-url";

export const fetcher = async <T>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(`${BACKEND_URL}/${input}`, init);
  const data = await res.json();

  return data;
};
