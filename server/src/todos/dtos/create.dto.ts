import { PickType } from "@nestjs/swagger";

import { Todo } from "../entities/todo.entity";

export class CreateTodoDTO extends PickType(Todo, ["title", "description"]) {}
