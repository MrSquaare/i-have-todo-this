import { TodoDTO } from "@common/types";

import { fetchApi } from "./fetch";

export const fetchTodos = async (): Promise<TodoDTO[]> => {
  return fetchApi().get("/todos").json();
};
