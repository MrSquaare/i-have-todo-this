import { TodoDTO, TodoState } from "@common/types";

export const todosFixture: TodoDTO[] = [
  {
    id: "1",
    title: "Todo 1",
    state: TodoState.TODO,
  },
  {
    id: "2",
    title: "Todo 2",
    state: TodoState.DONE,
  },
];
