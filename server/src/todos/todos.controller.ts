import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

import { NotFoundError } from "../common/errors/not-found";

import { CreateTodo } from "./dtos/create.dto";
import { Todo } from "./entities/todo.entity";
import { TodosService } from "./todos.service";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({ summary: "Get all todos" })
  @ApiResponse({ status: 200, type: [Todo] })
  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @ApiOperation({ summary: "Get a todo" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiResponse({ status: 200, type: Todo })
  @ApiResponse({ status: 404, description: "Todo not found" })
  @Get(":id")
  async findOne(@Param("id") id: Todo["id"]) {
    try {
      return await this.todosService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  @ApiOperation({ summary: "Create a todo" })
  @ApiResponse({ status: 201, type: Todo })
  @Post()
  async create(@Body() body: CreateTodo) {
    return this.todosService.create(body);
  }

  @ApiOperation({ summary: "Toggle a todo" })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  @ApiResponse({ status: 200, type: Todo })
  @Patch(":id/toggle")
  async toggle(@Param("id") id: Todo["id"]) {
    try {
      return await this.todosService.toggle(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
