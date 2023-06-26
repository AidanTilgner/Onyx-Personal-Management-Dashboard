import { User } from "../models/user";
import { dataSource } from "..";
import Logger from "../../utils/logger";

const userOperationsLogger = new Logger({
  name: "User Operations",
});

const { INITIAL_USER_NAME } = process.env;

export const getDefaultUser = async () => {
  try {
    const user = await dataSource.getRepository(User).findOne({
      where: {
        name: INITIAL_USER_NAME,
      },
    });
    return user;
  } catch (error) {
    userOperationsLogger.error(error);
    return null;
  }
};
