import { http, HttpResponse, type HttpResponseResolver } from "msw";

type HandlerFactoryArgs = {
  isNetworkError?: boolean;
  error?: {
    status: number;
  };
  resolver?: HttpResponseResolver;
};

export const httpHandlerFactory = (
  method: keyof typeof http,
  path: string,
  defaultResolver: HttpResponseResolver,
) => {
  return ({ error, isNetworkError, resolver }: HandlerFactoryArgs = {}) => {
    if (isNetworkError) {
      return http[method](path, () => {
        return HttpResponse.error();
      });
    }
    if (error) {
      return http[method](path, () => {
        return HttpResponse.json(null, {
          status: error.status,
        });
      });
    }
    return http[method](path, async (args) => {
      await baseResolver(args);
      return (await resolver?.(args)) ?? (await defaultResolver(args));
    });
  };
};

const baseResolver: HttpResponseResolver = ({ request }) => {
  request.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
};
