import { Test, TestingModule } from '@nestjs/testing';
import { CommandsService } from './commands.service';

describe('CommandsService', () => {
  let service: CommandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandsService,
        {
          provide: 'COMMANDS_SERVICE',
          useFactory: () => {
            send: jest.fn(() => []);
          },
        },
      ],
    }).compile();

    service = module.get<CommandsService>(CommandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
