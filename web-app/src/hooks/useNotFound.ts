import { useEffect, useMemo } from "react";
import wretch from "wretch";

export type UseNotFoundError = unknown | undefined;
export type UseNotFoundCallback = CallableFunction;

export const useNotFound = (
  error: UseNotFoundError,
  callback?: UseNotFoundCallback,
) => {
  const hasNotFound = useMemo(() => {
    if (error instanceof wretch.WretchError) {
      return error.status === 404;
    }

    return false;
  }, [error]);

  useEffect(() => {
    if (!callback || !hasNotFound) return;

    callback();
  }, [callback, hasNotFound]);

  return { hasNotFound };
};
