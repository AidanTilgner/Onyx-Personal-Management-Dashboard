import Logger from "../utils/logger";

export class Service {
  private name: string;
  private version: string;
  private logger: Logger;
  private availableViaClient: boolean;
  private description: string;

  constructor({
    name,
    version,
    description,
    availableViaClient = false,
  }: {
    name: string;
    version: string;
    description: string;
    availableViaClient?: boolean;
  }) {
    this.name = name;
    this.version = version;
    this.logger = new Logger({ name: this.getServiceVersionedFormattedName() });
    this.availableViaClient = availableViaClient;
    this.description = description;
  }

  public getServiceVersionedFormattedName() {
    return `${this.name} service - version ${this.version}`;
  }

  public getServiceRawName() {
    return this.name;
  }

  public getServiceName() {
    return `${this.name} service`;
  }

  public getServiceRouteName() {
    return `${this.name}-v${this.version}`;
  }

  public getServiceDescription() {
    return this.description;
  }

  public isAvailableViaClient() {
    return this.availableViaClient;
  }

  public getServiceVersion() {
    return this.version;
  }

  public getServiceTitleAndDescription() {
    return {
      name: this.getServiceRawName(),
      title: this.getServiceName(),
      description: this.getServiceDescription(),
      version: this.getServiceVersion(),
      formatted_name: this.getServiceVersionedFormattedName(),
    };
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
