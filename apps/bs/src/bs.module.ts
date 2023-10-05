import { Module } from '@nestjs/common';
import { BsController } from './bs.controller';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from '@wecon/cache';
import { RemoteStorageModule } from '@wecon/remote-storage';
import { EventsModule, EventsModuleConnectionType } from '@wecon/events';

@Module({
  imports: [
    DatabaseModule,
    CacheModule,
    RemoteStorageModule,
    EventsModule.register({
      connectionName: 'wecon-bs',
      connectionType: EventsModuleConnectionType.COMMANDS_EVENT,
    }),
  ],
  controllers: [BsController],
  providers: [],
})
export class BsModule {}
