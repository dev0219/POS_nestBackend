import { NestFactory } from '@nestjs/core';
import { PsModule } from './ps.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PsModule,
    {
      transport: Transport.NATS,
      options: {
        name: 'wecon-ps',
        servers: [`nats://${process.env.NATS_SERVER}`],
        queue: 'commands',
      },
    },
  );
  await app.listen();
}
bootstrap();
