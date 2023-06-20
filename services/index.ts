import Logger from "../utils/logger";
import * as EmailService from "./email";

export const services = {
  email: EmailService,
};

export const enabledServices = [EmailService];
