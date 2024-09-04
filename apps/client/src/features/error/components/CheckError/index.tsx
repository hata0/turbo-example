"use client";

import { type FetchError, type RequiredError, ResponseError } from "@packages/openapi";
import { Custom401 } from "../401";
import { Custom500 } from "../500";
import { UnexpectedError } from "../UnexpectedError";

type Props = {
  error: Error | ResponseError | FetchError | RequiredError;
  reset: () => void;
};

export const CheckError = ({ error, reset }: Props) => {
  if (error instanceof ResponseError) {
    if (error.response.status === 401) {
      return <Custom401 />;
    }
    return <Custom500 />;
  }
  return <UnexpectedError reset={reset} />;
};
