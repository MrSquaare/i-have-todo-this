import classNames from "classnames";
import { FC } from "react";

export type BadgeProps = JSX.IntrinsicElements["span"];

export const Badge: FC<BadgeProps> = ({ className, ...props }) => {
  return (
    <span
      {...props}
      className={classNames(
        "rounded-full bg-gray-300 px-2 text-center text-lg text-gray-500",
        className,
      )}
    />
  );
};
