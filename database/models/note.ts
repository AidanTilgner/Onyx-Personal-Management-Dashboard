import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
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

  @OneToMany(() => User, (user) => user.notes)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
