import * as RadixTooltip from "@radix-ui/react-tooltip";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import { PropsOf } from "../../types/props";

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  rootProps?: PropsOf<typeof RadixTooltip.Root>;
  triggerProps?: PropsOf<typeof RadixTooltip.Trigger>;
  portalProps?: PropsOf<typeof RadixTooltip.Portal>;
  contentProps?: PropsOf<typeof RadixTooltip.Content>;
};

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  rootProps,
  triggerProps,
  portalProps,
  contentProps,
}) => {
  return (
    <RadixTooltip.Root delayDuration={0} {...rootProps}>
      <RadixTooltip.Trigger {...triggerProps} asChild>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal {...portalProps}>
        <RadixTooltip.Content
          sideOffset={5}
          {...contentProps}
          className={classNames(
            "rounded-full bg-neutral-800 px-2 py-1 text-white",
            contentProps?.className,
          )}
        >
          {content}
          <RadixTooltip.Arrow className={"fill-neutral-800"} />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};
