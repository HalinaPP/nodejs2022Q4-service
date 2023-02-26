import { ConsoleLogger } from '@nestjs/common';

export class LoggingService extends ConsoleLogger {
  constructor() {
    super();
  }

  log(message: string) {
    super.log(message);
  }

  error(message: any) {
    super.error(message);
  }

  warn(message: any) {
    super.warn(message);
  }

  debug(message: any) {
    super.debug(message);
  }

  verbose(message: any) {
    super.verbose(message);
  }
}
