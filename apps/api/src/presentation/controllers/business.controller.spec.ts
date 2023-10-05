import { Test, TestingModule } from '@nestjs/testing';
import { BusinessController } from './business.controller';
import { BusinessCase } from '../../application/use-cases/business/business.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from '../../domain/model/Business';
import { IBusinessRepository } from '../../application/ports/IBusinessRepository';
import { BusinessRepository } from '../../../../bs/src/database/repositories/BusinessRepository';

describe('BusinessController', () => {
  let businessController: BusinessController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BusinessController],
      providers: [
        BusinessCase,
        { provide: IBusinessRepository, useClass: BusinessRepository },
      ],
    }).compile();

    businessController = app.get<BusinessController>(BusinessController);
  });

  describe('Get all the business', () => {
    it('should return a list of all the active business', () => {
      expect(businessController.getActiveBusiness()).toBe('Hello World!');
    });
  });
});
