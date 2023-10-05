"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = exports.EventsModuleConnectionType = void 0;
const nestjs_nats_jetstream_transport_1 = require("@nestjs-plugins/nestjs-nats-jetstream-transport");
const microservices_1 = require("@nestjs/microservices");
const commands_service_1 = require("./commands/commands.service");
const events_service_1 = require("./events/events.service");
var EventsModuleConnectionType;
(function (EventsModuleConnectionType) {
    EventsModuleConnectionType[EventsModuleConnectionType["COMMANDS"] = 0] = "COMMANDS";
    EventsModuleConnectionType[EventsModuleConnectionType["EVENTS"] = 1] = "EVENTS";
    EventsModuleConnectionType[EventsModuleConnectionType["COMMANDS_EVENT"] = 2] = "COMMANDS_EVENT";
})(EventsModuleConnectionType = exports.EventsModuleConnectionType || (exports.EventsModuleConnectionType = {}));
class EventsModule {
    static register(opts) {
        const imports = [];
        const providers = [];
        if (opts.connectionType == EventsModuleConnectionType.COMMANDS ||
            opts.connectionType == EventsModuleConnectionType.COMMANDS_EVENT) {
            imports.push(microservices_1.ClientsModule.register([
                {
                    name: 'COMMANDS_SERVICE',
                    transport: microservices_1.Transport.NATS,
                    options: {
                        servers: [`nats://${process.env.NATS_SERVER}`],
                        queue: 'commands',
                        name: opts.connectionName,
                    },
                },
            ]));
            providers.push(commands_service_1.CommandsService);
        }
        if (opts.connectionType == EventsModuleConnectionType.EVENTS ||
            opts.connectionType == EventsModuleConnectionType.COMMANDS_EVENT) {
            imports.push(nestjs_nats_jetstream_transport_1.NatsJetStreamTransport.register({
                connectionOptions: {
                    servers: process.env.NATS_SERVER,
                    name: opts.connectionName,
                },
            }));
            providers.push(events_service_1.EventsService);
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
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map