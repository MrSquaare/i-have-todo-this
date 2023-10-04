import {
  ArrowsInLineVertical,
  ArrowsOutLineVertical,
} from "@phosphor-icons/react";
import * as Collapsible from "@radix-ui/react-collapsible";
import classNames from "classnames";
import { FC, ReactNode } from "react";

import { PropsOf } from "../../types/props";
import { Tooltip } from "../ui/tooltip";

import { TodoList, TodoListProps } from "./list";

export type CollapsibleTodoListProps = TodoListProps & {
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  rootProps?: PropsOf<typeof Collapsible.Root>;
  triggerProps?: PropsOf<typeof Collapsible.Trigger>;
  contentProps?: PropsOf<typeof Collapsible.Content>;
};

export const CollapsibleTodoList: FC<CollapsibleTodoListProps> = ({
  trigger,
  open,
  onOpenChange,
  rootProps,
  triggerProps,
  contentProps,
  ...listProps
}) => {
  return (
    <Collapsible.Root onOpenChange={onOpenChange} open={open} {...rootProps}>
      <Collapsible.Trigger
        data-testid={"collapsible-todo-list-trigger"}
        {...triggerProps}
        className={classNames(
          "mb-2 flex w-full items-center justify-between",
          triggerProps?.className,
        )}
      >
        {trigger}
        <Tooltip content={open ? "Close" : "Open"}>
          {open ? (
            <ArrowsInLineVertical
              aria-label={"Close collapsed todo list"}
              className={"mr-1"}
              size={20}
              weight={"fill"}
            />
          ) : (
            <ArrowsOutLineVertical
              aria-label={"Open collapsed todo list"}
              className={"mr-1"}
              size={20}
              weight={"fill"}
            />
          )}
        </Tooltip>
      </Collapsible.Trigger>
      <Collapsible.Content
        {...contentProps}
        className={classNames(
          "overflow-hidden data-[state=closed]:animate-collapseHide data-[state=open]:animate-collapseShow",
          contentProps?.className,
        )}
      >
        <TodoList {...listProps} />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
