import { DTO } from "@common/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsUUID } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity implements DTO {
  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "The id of the entity",
    example: "123e4567-e89b-12d3-a456-426655440000",
  })
  @PrimaryGeneratedColumn("uuid")
  @IsUUID("4")
  id: string;

  @ApiProperty({
    type: "string",
    format: "date-time",
    description: "The date the entity was created",
    example: "2021-01-01T00:00:00.000Z",
  })
  @CreateDateColumn()
  @IsDateString()
  created_at: string;
}
