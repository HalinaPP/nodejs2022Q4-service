import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl, body, query } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const logMessage = `[HTTP] ${method} ${statusCode} ${originalUrl} ${JSON.stringify(
        query,
      )} ${JSON.stringify(body)} ${contentLength} - ${userAgent} ${ip}`;

      if (res.statusCode >= 500) {
        this.logger.error(logMessage);
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}
