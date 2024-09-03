/**
 * @deprecated openapi の生成したものを使うこと
 */
export class HttpError extends Error {
  constructor(public readonly status?: number) {
    super(`HTTP response status code: ${status}`);
  }
}
