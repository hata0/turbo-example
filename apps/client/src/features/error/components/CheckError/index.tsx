"use client";

import { HttpError } from "@/utils/http-error";
import { Custom401 } from "../401";
import { Custom500 } from "../500";
import { UnexpectedError } from "../UnexpectedError";

type Props = {
  error: Error;
  reset: () => void;
};

export const CheckError = ({ error, reset }: Props) => {
  if (error instanceof HttpError) {
    if (error.status === 401) {
      return <Custom401 />;
    }
    return <Custom500 />;
  }
  return <UnexpectedError reset={reset} />;
};
