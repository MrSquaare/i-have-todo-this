import { TodoState } from "@common/types";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { NotFoundError } from "../common/errors/not-found";

import { CreateTodo } from "./dtos/create.dto";
import { Todo } from "./entities/todo.entity";

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find({
      order: { created_at: "DESC" },
    });
  }

  async findOne(id: Todo["id"]): Promise<Todo> {
    const todo = await this.todosRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundError(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async create(values: CreateTodo): Promise<Todo> {
    const todo = this.todosRepository.create(values);

    return this.todosRepository.save(todo);
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
