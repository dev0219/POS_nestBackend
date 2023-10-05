import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule, EventsModuleConnectionType } from '@wecon/events';
import { BusinessController } from './presentation/controllers/business.controller';
import { ProductsController } from './presentation/controllers/products.controller';
import { RemoteStorageModule } from '@wecon/remote-storage';

export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return ['.env.test', '.env'];
    case 'stage':
      return ['.env.stage', '.env'];
    case 'development':
      return ['.env.development', '.env'];
    case 'production':
    default:
      return ['.env'];
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    EventsModule.register({
      connectionName: 'wecon-api',
      connectionType: EventsModuleConnectionType.COMMANDS,
    }),
    RemoteStorageModule,
  ],
  controllers: [BusinessController, ProductsController],
  providers: [],
})
export class AppModule {}
