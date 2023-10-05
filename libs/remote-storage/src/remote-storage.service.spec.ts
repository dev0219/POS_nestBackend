import { Test, TestingModule } from '@nestjs/testing';
import { RemoteStorageService } from './remote-storage.service';

describe('RemoteStorageService', () => {
  let service: RemoteStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteStorageService],
    }).compile();

    service = module.get<RemoteStorageService>(RemoteStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
