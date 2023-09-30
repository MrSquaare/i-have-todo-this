import { DTO } from "@common/types";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity implements DTO {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
