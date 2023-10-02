import { TodoDTO, TodoState } from "@common/types";

export const todosFixture: TodoDTO[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    title: "Todo 1",
    state: TodoState.TODO,
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    title: "Todo 2",
    state: TodoState.DONE,
  },
];
