import { dataSource } from "..";
import { User } from "../models/user";
import { config } from "dotenv";

config();

const { INITIAL_USER_NAME, INITIAL_PASSWORD, INITIAL_USER_EMAIL } = process.env;

const defaultUser = {
  name: INITIAL_USER_NAME,
  email: INITIAL_USER_EMAIL,
  password: INITIAL_PASSWORD,
};

export const seedDatabase = async () => {
  await seedInitialUser();
};

export const seedInitialUser = async () => {
  // see if the user exists
  const user = await dataSource.getRepository(User).findOne({
    where: {
      email: defaultUser.email,
    },
  });

  // if the user exists, return
  if (user) {
    console.log("Default user already exists, skipping seed.");
    return;
  }

  if (!defaultUser.name || !defaultUser.email || !defaultUser.password) {
    console.log("Insufficinet default user information, skipping seed.");
    return;
  }

  // if the user does not exist, create it
  const newUser = new User();
  newUser.name = defaultUser.name;
  newUser.email = defaultUser.email;
  newUser.password = defaultUser.password;
  newUser.role = "superadmin";

  console.info("Seeding initial user");
  await dataSource.getRepository(User).save(newUser);
};
