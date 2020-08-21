import { Test } from '@nestjs/testing';

import { HealthcheckService } from './healthcheck.service';
import { HealthcheckController } from './healthcheck.controller';

describe('HealthcheckService', () => {
  let healthcheckController: HealthcheckController;
  let healthcheckService: HealthcheckService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile();
    healthcheckController = moduleRef.get<HealthcheckController>(HealthcheckController);
    healthcheckService = moduleRef.get<HealthcheckService>(HealthcheckService);
  });

  it('healthcheck controller should be defined', () => {
    expect(healthcheckController).toBeDefined();
  });

  it('healthcheck service should be defined', () => {
    expect(healthcheckService).toBeDefined();
  });
});
