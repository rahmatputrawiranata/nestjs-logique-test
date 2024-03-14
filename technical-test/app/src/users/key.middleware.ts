import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction } from 'express';

@Injectable()
export class KeyMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers['key'], 'key');
    if (!req.headers['key']) {
      throw new HttpException(
        {
          error: 'API key is missing',
        },
        403,
      );
    }

    if (req.headers['key'] !== this.configService.get<string>('API_KEY')) {
      throw new HttpException(
        {
          error: 'Invalid API key',
        },
        401,
      );
    }

    next();
  }
}
