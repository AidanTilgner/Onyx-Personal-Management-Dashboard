import { dataSource } from "..";
import { hashPassword } from "../../utils/auth";
import User from "../models/user";
import { config } from "dotenv";

config();

const {
  INITIAL_PASSWORD,
  INITIAL_USER_EMAIL,
  INITIAL_USER_FIRST_NAME,
  INITIAL_USER_LAST_NAME,
} = process.env;

const defaultUser = {
  email: INITIAL_USER_EMAIL,
  password: INITIAL_PASSWORD,
  first_name: INITIAL_USER_FIRST_NAME,
  last_name: INITIAL_USER_LAST_NAME,
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

  if (
    !defaultUser.first_name ||
    !defaultUser.last_name ||
    !defaultUser.email ||
    !defaultUser.password
  ) {
    console.log("Insufficinet default user information, skipping seed.");
    return;
  }

  // if the user does not exist, create it
  const password = await hashPassword(defaultUser.password);
  if (!password) {
    console.error("Failed to hash password, skipping seed.");
    return;
  }
  const newUser = new User();
  newUser.firstName = defaultUser.first_name;
  newUser.lastName = defaultUser.last_name;
  newUser.email = defaultUser.email;
  newUser.role = "super_admin";
  newUser.password = password;

  console.info(
    "Seeding initial user",
    `${defaultUser.first_name} ${defaultUser.last_name} <${defaultUser.email}> (${defaultUser.password})`
  );
  await dataSource.getRepository(User).save(newUser);
};
