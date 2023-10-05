import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
import { DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommandsService } from './commands/commands.service';
import { EventsService } from './events/events.service';

export enum EventsModuleConnectionType {
  /**
   * Enable to client connection to send commands
   */
  COMMANDS,
  /**
   * Enable to client connection to send events
   */
  EVENTS,
  /**
   * Enable to client connection to send commands and events
   */
  COMMANDS_EVENT,
}

export class EventsModule {
  public static register(opts: {
    connectionName: string;
    connectionType: EventsModuleConnectionType;
  }): DynamicModule {
    const imports = [];
    const providers = [];
    if (
      opts.connectionType == EventsModuleConnectionType.COMMANDS ||
      opts.connectionType == EventsModuleConnectionType.COMMANDS_EVENT
    ) {
      imports.push(
        ClientsModule.register([
          {
            name: 'COMMANDS_SERVICE',
            transport: Transport.NATS,
            options: {
              servers: [`nats://${process.env.NATS_SERVER}`],
              queue: 'commands',
              name: opts.connectionName,
            },
          },
        ]),
      );
      providers.push(CommandsService);
    }
    if (
      opts.connectionType == EventsModuleConnectionType.EVENTS ||
      opts.connectionType == EventsModuleConnectionType.COMMANDS_EVENT
    ) {
      imports.push(
        NatsJetStreamTransport.register({
          connectionOptions: {
            servers: process.env.NATS_SERVER,
            name: opts.connectionName,
          },
        }),
      );
      providers.push(EventsService);
    }

    const exports = [...providers];
    return {
      imports,
      providers,
      exports,
      module: EventsModule,
    };
  }
}
