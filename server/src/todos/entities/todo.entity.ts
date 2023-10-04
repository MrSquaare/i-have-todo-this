import { TodoDTO, TodoState } from "@common/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Entity, Column } from "typeorm";

import { BaseEntity } from "../../common/entities/base";

@Entity()
export class Todo extends BaseEntity implements TodoDTO {
  @ApiProperty({
    description: "The title of the todo",
    example: "Buy milk",
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "The description of the todo",
    example: "Buy milk from the store",
  })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "The state of the todo",
    enum: TodoState,
    example: TodoState.TODO,
  })
  @Column({ type: "int", default: TodoState.TODO })
  @IsEnum(TodoState)
  state: TodoState;
}
