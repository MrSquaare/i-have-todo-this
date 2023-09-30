import { DTO } from "./dto";

export enum TodoState {
  TODO,
  DONE,
}

export type TodoDTO = DTO & {
  title: string;
  description?: string;
  state: TodoState;
};
