import Logger from "../utils/logger";
import * as EmailService from "./email";

export class Service {
  private name: string;
  private version: string;
  private logger: Logger;

  constructor({ name, version }: { name: string; version: string }) {
    this.name = name;
    this.version = version;
    this.logger = new Logger({ name: this.getServiceVersionedFormattedName() });
  }

  public getServiceVersionedFormattedName() {
    return `${this.name} service - version ${this.version}`;
  }

  public getServiceName() {
    return `${this.name} service`;
  }

  public getServiceRouteName() {
    return `${this.name}-v${this.version}`;
  }

  public log(...args: any[]) {
    this.logger.log(...args);
  }

  public error(...args: any[]) {
    this.logger.error(...args);
  }

  public getLogger() {
    return this.logger;
  }
}

export const services = {
  email: EmailService,
};

export const enabledServices = [EmailService];
