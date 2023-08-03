import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int4",
  })
  id: number;

  @Column()
  singleUUID: string;

  @Column("timestamptz", { default: () => "NOW()", nullable: false })
  createdOn: Date;

  @Column("timestamptz", { nullable: true })
  completedOn: Date | null;

  @Column("timestamptz", { nullable: true })
  updatedOn: Date | null;
}
