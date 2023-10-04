import classNames from "classnames";
import { forwardRef } from "react";

import { Loader } from "./loader";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "primary" | "secondary" | "light";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { children, variant, size, loading, className, ...props },
    ref,
  ) {
    const isDisabled = props.disabled || loading;

    return (
      <button
        disabled={isDisabled}
        ref={ref}
        {...props}
        className={classNames(
          "relative rounded-full px-4 py-2 font-medium overflow-hidden focus:outline-none focus:ring focus:ring-blue-500/50",
          {
            "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
            "bg-neutral-200 hover:bg-neutral-300": variant === "secondary",
            "bg-white border border-neutral-300 hover:bg-neutral-100":
              variant === "light",
            "!text-sm !px-2 !py-1": size === "sm",
            "!text-lg !px-8 !py-4": size === "lg",
            "cursor-not-allowed": isDisabled,
          },
          className,
        )}
      >
        {children}
        <div
          className={classNames(
            "absolute inset-0 flex items-center justify-center",
            {
              "bg-blue-600/75": variant === "primary",
              "bg-neutral-200/75": variant === "secondary",
              "bg-white/75 border": variant === "light",
              hidden: !isDisabled,
            },
          )}
        />
        <div
          className={classNames(
            "absolute inset-0 flex items-center justify-center",
            { hidden: !loading },
          )}
        >
          <Loader weight={"bold"} />
        </div>
      </button>
    );
  },
);
