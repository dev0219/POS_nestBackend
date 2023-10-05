"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const bs_module_1 = require("./bs.module");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(bs_module_1.BsModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            name: 'wecon-bs',
            servers: [`nats://${process.env.NATS_SERVER}`],
            queue: 'commands',
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map