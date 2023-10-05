import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';
import { RequestCommand } from '@wecon/domain/RequestCommand';

@Injectable()
export class CommandsService {
  constructor(@Inject('COMMANDS_SERVICE') private commandClient: ClientProxy) {}

  public async request<CommandInput, CommandOutput>(
    command: RequestCommand<CommandInput, CommandOutput>,
  ): Promise<CommandOutput> {
    let result = command.createOutput();
    await this.commandClient
      .send<CommandOutput>(command.getAction(), command.getPayload())
      .pipe(
        timeout(
          process.env.COMMAND_TIMEOUT
            ? parseInt(process.env.COMMAND_TIMEOUT)
            : 60000,
        ),
      )
      .forEach((value) => {
        result = value;
      });
    return result;
  }
}
