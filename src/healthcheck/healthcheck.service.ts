import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  healthcheck(): string {
    return 'OK';
  }
}
