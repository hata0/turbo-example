import type { HttpHandler } from "msw";
import type { NextRouter } from "next/router";

export type Parameters = {
  nextjs?: {
    router?: Partial<NextRouter>;
  };
  msw?: {
    handlers?: HttpHandler[];
  };
};
