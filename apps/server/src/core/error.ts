export class AppError<T> {
  constructor(
    public readonly code: T,
    public readonly message: string,
  ) {}
}

export const StatusCode = {
  Ok: 200,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
} as const;

export type StatusCodeType = typeof StatusCode;
