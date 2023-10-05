import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService, {
        provide: NatsJetStreamClientProxy,
        useFactory: () => ({
          emit: jest.fn(() => {}),
        }),
      }],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
