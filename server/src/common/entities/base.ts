import { DTO } from "@common/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity implements DTO {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  @IsUUID("4")
  id: string;
}
