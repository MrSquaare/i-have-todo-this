import { CreateTodoDTO, TodoDTO } from "@common/types";

import { fetchApi } from "./fetch";

export const fetchTodos = async (): Promise<TodoDTO[]> => {
  return fetchApi().get("/todos").json();
};

export const fetchTodo = async (id: TodoDTO["id"]): Promise<TodoDTO> => {
  return fetchApi().get(`/todos/${id}`).json();
};

export const createTodo = async (dto: CreateTodoDTO): Promise<TodoDTO> => {
  return fetchApi().post(dto, "/todos").json();
};

export const toggleTodo = async (id: TodoDTO["id"]): Promise<TodoDTO> => {
  return fetchApi().patch(undefined, `/todos/${id}/toggle`).json();
};
