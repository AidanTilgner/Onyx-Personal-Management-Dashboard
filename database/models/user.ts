import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Note } from "./note";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text", { unique: true })
  name!: string;

  @Column("text", { unique: true })
  email!: string;

  @Column("text")
  password!: string;

  @Column("text")
  role!: string;

  @OneToMany(() => Note, (note) => note.user)
  notes!: Note[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
