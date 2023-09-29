import { TodoDTO, TodoState } from "@common/types";
import { Entity, Column } from "typeorm";

import { BaseEntity } from "../../common/entities/base";

@Entity()
export class Todo extends BaseEntity implements TodoDTO {
  @Column()
  title: string;

  @Column({ type: "int", default: TodoState.TODO })
  state: TodoState;
}
