import { renderHook } from "@testing-library/react";
import wretch from "wretch";

import { useNotFound } from "./useNotFound";

describe("useNotFound", () => {
  it("should return hasNotFound as false when error is undefined", () => {
    const { result } = renderHook(() => useNotFound(undefined));

    expect(result.current.hasNotFound).toBe(false);
  });

  it("should return hasNotFound as false when error is not a WretchError", () => {
    const error = new Error("My error");
    const { result } = renderHook(() => useNotFound(error));

    expect(result.current.hasNotFound).toBe(false);
  });

  it("should return hasNotFound as false when error is a WretchError but not a 404", () => {
    const error = new wretch.WretchError("My error");
    const { result } = renderHook(() => useNotFound(error));

    expect(result.current.hasNotFound).toBe(false);
  });

  it("should return hasNotFound as true when error is a WretchError and a 404", () => {
    const error = new wretch.WretchError("My error");

    error.status = 404;

    const { result } = renderHook(() => useNotFound(error));

    expect(result.current.hasNotFound).toBe(true);
  });

  it("should not call the callback when hasNotFound is false", () => {
    const callback = jest.fn();
    const error = new wretch.WretchError("My error");

    renderHook(() => useNotFound(error, callback));

    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the callback when hasNotFound is true", () => {
    const callback = jest.fn();
    const error = new wretch.WretchError("My error");

    error.status = 404;

    renderHook(() => useNotFound(error, callback));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
