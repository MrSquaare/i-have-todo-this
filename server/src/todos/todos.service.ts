import { TodoState } from "@common/types";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { NotFoundError } from "../common/errors/not-found";

import { CreateTodoDTO } from "./dtos/create.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async findOne(id: Todo["id"]): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundError(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async create(dto: CreateTodoDTO): Promise<Todo> {
    throw new Error("Not implemented");
  }

  async toggle(id: Todo["id"]): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundError(`Todo with id ${id} not found`);
    }

    todo.state =
      todo.state === TodoState.TODO ? TodoState.DONE : TodoState.TODO;

    return this.todosRepository.save(todo);
  }
}
