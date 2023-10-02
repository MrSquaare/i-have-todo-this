import { DTO } from "@common/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsUUID } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity implements DTO {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  @IsUUID("4")
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  @IsDateString()
  created_at: string;
}
