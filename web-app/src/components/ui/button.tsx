import classNames from "classnames";
import { FC } from "react";

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: "primary" | "secondary" | "light";
  size?: "sm" | "md" | "lg";
};

export const Button: FC<ButtonProps> = ({
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "rounded-full px-4 py-2 font-medium",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-neutral-200 hover:bg-neutral-300": variant === "secondary",
          "bg-white hover:bg-neutral-100 border border-neutral-300":
            variant === "light",
          "!text-sm !px-2 !py-1": size === "sm",
          "!text-lg !px-8 !py-4": size === "lg",
        },
        className,
      )}
    />
  );
};
