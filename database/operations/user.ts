import User from "../models/user";
import { dataSource } from "..";
import Logger from "../../utils/logger";

const userOperationsLogger = new Logger({
  name: "User Operations",
});

const { INITIAL_USER_EMAIL } = process.env;

export const getDefaultUser = async (loadRelations?: string[]) => {
  try {
    const user = await dataSource.getRepository(User).findOne({
      where: {
        email: INITIAL_USER_EMAIL,
      },
      relations: loadRelations,
    });
    return user;
  } catch (error) {
    userOperationsLogger.error(error);
    return null;
  }
};
