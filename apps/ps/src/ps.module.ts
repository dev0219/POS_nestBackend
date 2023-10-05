import { Module } from '@nestjs/common';
import { PsController } from './ps.controller';
import { CacheModule } from '@wecon/cache';
import { RemoteStorageModule } from '@wecon/remote-storage';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CacheModule, RemoteStorageModule],
  controllers: [PsController],
  providers: [],
})
export class PsModule {}
