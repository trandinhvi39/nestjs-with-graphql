import { Test } from '@nestjs/testing';

import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

describe('HealthcheckController', () => {
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

  describe('healthcheck', () => {
    it('should return status OK', async () => {
      const result = 'OK';
      jest.spyOn(healthcheckService, 'healthcheck').mockImplementation(() => result);
      expect(await healthcheckController.healthcheck()).toBe(result);
    });
  });
});
