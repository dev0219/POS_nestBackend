import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BsModule } from './bs.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BsModule,
    {
      transport: Transport.NATS,
      options: {
        name: 'wecon-bs',
        servers: [`nats://${process.env.NATS_SERVER}`],
        queue: 'commands',
      },
    },
  );
  await app.listen();
}
bootstrap();
