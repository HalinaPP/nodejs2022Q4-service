import { LOGGING_LEVEL } from './../config';
import { ConsoleLogger } from '@nestjs/common';

export class LoggingService extends ConsoleLogger {
  private loggingLevel: number;

  constructor() {
    super();
    this.loggingLevel = LOGGING_LEVEL;
  }

  log(message: string) {
    super.log(message);
  }

  error(message: any) {
    if (this.loggingLevel > 0) {
      super.error(message);
    }
  }

  warn(message: any) {
    if (this.loggingLevel > 1) {
      super.warn(message);
    }
  }

  debug(message: any) {
    if (this.loggingLevel > 2) {
      super.debug(message);
    }
  }

  verbose(message: any) {
    if (this.loggingLevel === 4) {
      super.verbose(message);
    }
  }
}
