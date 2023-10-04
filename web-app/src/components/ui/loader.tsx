import { CircleNotch, IconProps } from "@phosphor-icons/react";
import classNames from "classnames";
import { forwardRef } from "react";

export type LoaderProps = IconProps;

export const Loader = forwardRef<SVGSVGElement, LoaderProps>(function Loader(
  { className, ...props },
  ref,
) {
  return (
    <CircleNotch
      ref={ref}
      {...props}
      className={classNames("animate-spin", className)}
    />
  );
});
