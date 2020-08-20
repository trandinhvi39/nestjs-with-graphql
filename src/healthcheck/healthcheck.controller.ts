import { Controller, Get } from '@nestjs/common';

import { HealthcheckService } from './healthcheck.service';

@Controller()
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get('/healthcheck')
  healthcheck(): string {
    return this.healthcheckService.healthcheck();
  }
}
