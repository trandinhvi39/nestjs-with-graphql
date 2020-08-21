import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import logger from '../configs/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    logger.log('info', `Requesting ${req.method} ${req.originalUrl}`, {
      tags: 'http',
      additionalInfo: { body: req.body, headers: req.headers },
    });
    next();
  }
}
