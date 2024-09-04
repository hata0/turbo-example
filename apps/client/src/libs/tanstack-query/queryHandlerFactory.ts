import { type QueryFunction, queryOptions } from "@tanstack/react-query";

type Props<TQueryFnData> = {
  queryKey: string[];
  queryFn: QueryFunction<TQueryFnData, string[]>;
};

type HandlerProps<TQueryFnData, TData> = Omit<
  Parameters<typeof queryOptions<TQueryFnData, Error, TData, string[]>>[0],
  "queryFn" | "queryKey"
> & {
  queryKey?: string[];
};

export const queryHandlerFactory = <TQueryFnData = unknown>({
  queryFn,
  queryKey: origin,
}: Props<TQueryFnData>) => {
  return <TData = TQueryFnData>({
    queryKey: params,
    ...args
  }: HandlerProps<TQueryFnData, TData> = {}) => {
    return queryOptions({
      queryFn: queryFn,
      queryKey: params ? [...origin, ...params] : origin,
      ...args,
    });
  };
};
