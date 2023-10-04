import { CircleNotch, IconProps } from "@phosphor-icons/react";
import classNames from "classnames";
import { FC } from "react";

export type LoaderProps = IconProps;

export const Loader: FC<LoaderProps> = ({ className, ...props }) => {
  return (
    <CircleNotch {...props} className={classNames("animate-spin", className)} />
  );
};
