import { CreateTodoDTO } from "@common/types";
import { PickType } from "@nestjs/swagger";

import { Todo } from "../entities/todo.entity";

export class CreateTodo
  extends PickType(Todo, ["title", "description"])
  implements CreateTodoDTO {}
