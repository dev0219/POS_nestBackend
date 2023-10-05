import { Module } from '@nestjs/common';
import { RemoteStorageService } from './remote-storage.service';

@Module({
  providers: [RemoteStorageService],
  exports: [RemoteStorageService],
})
export class RemoteStorageModule {}
