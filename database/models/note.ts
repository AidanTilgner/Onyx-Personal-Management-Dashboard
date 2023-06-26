import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  title!: string;

  @Column("text")
  content!: string;

  @ManyToOne(() => User, (user) => user.notes)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
