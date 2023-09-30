import { useMemo } from "react";
import wretch from "wretch";

export const useError = (error?: unknown) => {
  return useMemo(() => {
    if (error instanceof wretch.WretchError) {
      if (error.json instanceof Object) {
        if ("message" in error.json) {
          return { globalError: error.json.message };
        }
      }

      return { globalError: error.message };
    }

    if (error instanceof Error) {
      return { globalError: error.message };
    }

    if (typeof error === "string") {
      return { globalError: error };
    }

    if (error) {
      return { globalError: "An unknown error occurred" };
    }

    return {};
  }, [error]);
};
