import { LOGGING_LEVEL, logFileName, errorLogFileName } from './../config';
import { ConsoleLogger } from '@nestjs/common';
import { writeToFile } from '../utils/helpers';

export class LoggingService extends ConsoleLogger {
  private loggingLevel: number;

  constructor() {
    super();
    this.loggingLevel = LOGGING_LEVEL;
  }

  async log(message: string) {
    await writeToFile(logFileName, message);
    super.log(message);
  }

  async error(message: any) {
    if (this.loggingLevel > 0) {
      await writeToFile(errorLogFileName, message);
      await writeToFile(logFileName, message);
      super.error(message);
    }
  }

  async warn(message: any) {
    if (this.loggingLevel > 1) {
      await writeToFile(logFileName, message);
      super.warn(message);
    }
  }

  async debug(message: any) {
    if (this.loggingLevel > 2) {
      await writeToFile(logFileName, message);
      super.debug(message);
    }
  }

  async verbose(message: any) {
    if (this.loggingLevel === 4) {
      await writeToFile(logFileName, message);
      super.verbose(message);
    }
  }
}
