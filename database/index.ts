import { DataSource } from "typeorm";
import "reflect-metadata";
import { seedDatabase } from "./seeders";
import User from "./models/user";
import Note from "./models/note";
import RefreshToken from "./models/token";

export type Entities = User | RefreshToken | Note;

export const entities = {
  User,
  Note,
  RefreshToken,
};

export const dataSource = new DataSource({
  type: "sqlite",
  database: "datastore/database.sqlite",
  synchronize: true,
  entities: Object.values(entities),
  migrations: ["database/migrations/*.ts"],
  migrationsTableName: "migrations",
});

export const initializeDatabase = async () => {
  await dataSource.initialize();
  console.info("Database initialized");
  await seedDatabase();
  console.info("Database seeded");
  return dataSource;
};
