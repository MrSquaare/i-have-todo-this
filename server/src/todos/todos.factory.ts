import { TodoState } from "@common/types";
import { faker } from "@faker-js/faker";

import { Factory } from "../common/factory";

import { Todo } from "./entities/todo.entity";

export class TodosFactory extends Factory<Todo> {
  protected entity = Todo;
  protected attrs(): Todo {
    return {
      id: faker.string.uuid(),
      created_at: new Date().toISOString(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      state: faker.helpers.arrayElement([TodoState.TODO, TodoState.DONE]),
    };
  }
}
