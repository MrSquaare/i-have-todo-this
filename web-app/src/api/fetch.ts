import fetch from "cross-fetch";
import wretch from "wretch";

import { API_URL } from "../constants/api";

export type FetchAPIOptions = RequestInit & {
  url?: string;
};

export const fetchApi = (options?: FetchAPIOptions) => {
  const { url, ...init } = {
    url: API_URL,
    ...options,
  };

  return wretch(url, init).polyfills({
    fetch,
  });
};
