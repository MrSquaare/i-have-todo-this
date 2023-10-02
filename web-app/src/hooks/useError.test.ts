import { renderHook } from "@testing-library/react";
import wretch from "wretch";

import { useError } from "./useError";

describe("useError", () => {
  it("should be defined", () => {
    expect(useError).toBeDefined();
  });

  it("should return message from WretchError json object", () => {
    const error = new wretch.WretchError();

    error.json = {
      message: "My error",
    };

    const { result } = renderHook(() => useError(error));

    expect(result.current.globalError).toEqual("My error");
  });

  it("should return message from WretchError message", () => {
    const error = new wretch.WretchError("My error");

    const { result } = renderHook(() => useError(error));

    expect(result.current.globalError).toEqual("My error");
  });

  it("should return message from Error", () => {
    const error = new Error("My error");

    const { result } = renderHook(() => useError(error));

    expect(result.current.globalError).toEqual("My error");
  });

  it("should return message from string", () => {
    const error = "My error";

    const { result } = renderHook(() => useError(error));

    expect(result.current.globalError).toEqual("My error");
  });

  it("should return generic error message unknown error", () => {
    const error = 123;

    const { result } = renderHook(() => useError(error));

    expect(result.current.globalError).toBeDefined();
  });

  it("should return undefined if no error", () => {
    const { result } = renderHook(() => useError(undefined));

    expect(result.current.globalError).toBeUndefined();
  });
});
