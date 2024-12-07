import { BACKEND_URL } from "@/constants/backend-url";
import { HttpClient } from "@/utils/http-client";

export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> =>
  new HttpClient(BACKEND_URL).fetch(...args);
