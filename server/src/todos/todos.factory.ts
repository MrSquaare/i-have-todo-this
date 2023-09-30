import { TodoState } from "@common/types";
import { faker } from "@faker-js/faker";

import { Factory } from "../common/factory";

import { Todo } from "./entities/todo.entity";

export class TodosFactory extends Factory<Todo> {
  protected entity = Todo;
  protected attrs(): Todo {
    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      state: faker.helpers.arrayElement([TodoState.TODO, TodoState.DONE]),
    };
  }
}
