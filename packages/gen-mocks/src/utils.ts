import { fromPromise } from "neverthrow";

export class HttpClient {
  constructor(private readonly baseUrl: string) {}

  public async fetch<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
    const res = await fromPromise(
      fetch(`${this.baseUrl}${input}`, {
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
  }
}

export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP response status code: ${status}`);
  }
}