import { Body, Controller, Get, Post } from "@nestjs/common";

import { ToggleTodoDTO } from "./dtos/toggle.dto";
import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @Post()
  async toggle(@Body() toggleTodoDTO: ToggleTodoDTO) {
    throw new Error("Not implemented");
  }
}
