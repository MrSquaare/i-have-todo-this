import { TodoDTO, TodoState } from "@common/types";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Entity, Column } from "typeorm";

import { BaseEntity } from "../../common/entities/base";

@Entity()
export class Todo extends BaseEntity implements TodoDTO {
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ type: "int", default: TodoState.TODO })
  @IsEnum(TodoState)
  state: TodoState;
}
