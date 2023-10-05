"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const ps_module_1 = require("./ps.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(ps_module_1.PsModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            name: 'wecon-ps',
            servers: [`nats://${process.env.NATS_SERVER}`],
            queue: 'commands',
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map