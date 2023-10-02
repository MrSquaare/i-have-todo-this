import { MigrationInterface, QueryRunner } from "typeorm";

import { Todo } from "../todos/entities/todo.entity";
import { TodosFactory } from "../todos/todos.factory";

export class Todos1696066876938 implements MigrationInterface {
  private factory = new TodosFactory();

  public async up(queryRunner: QueryRunner): Promise<void> {
    const todos = this.factory.makeMany(10);

    await queryRunner.manager.save(todos);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.clear(Todo);
  }
}
