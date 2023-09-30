import { PickType } from "@nestjs/swagger";

import { Todo } from "../entities/todo.entity";

export class ToggleTodoDTO extends PickType(Todo, ["id"]) {}
