import classNames from "classnames";
import { forwardRef } from "react";

export type BadgeProps = JSX.IntrinsicElements["span"];

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      {...props}
      className={classNames(
        "rounded-full bg-gray-300 px-2 text-center text-lg text-gray-500",
        className,
      )}
    />
  );
});
