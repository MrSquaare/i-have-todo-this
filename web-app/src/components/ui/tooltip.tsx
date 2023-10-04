import * as RadixTooltip from "@radix-ui/react-tooltip";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import { PropsOf } from "../../types/props";

export type TooltipProps = PropsOf<typeof RadixTooltip.Trigger> & {
  content: ReactNode;
  rootProps?: PropsOf<typeof RadixTooltip.Root>;
  portalProps?: PropsOf<typeof RadixTooltip.Portal>;
  contentProps?: PropsOf<typeof RadixTooltip.Content>;
};

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  rootProps,
  portalProps,
  contentProps,
  ...triggerProps
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
