import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Business,
  BusinessCategory,
  BusinessProduct,
  BusinessType,
  BusinessTypeProductCategory,
  BusinessTypeSuggested,
} from '@wecon/domain/bs/model';
import { getDBConfig } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDBConfig()),
    TypeOrmModule.forFeature([
      Business,
      BusinessCategory,
      BusinessType,
      BusinessTypeSuggested,
      BusinessTypeProductCategory,
      BusinessProduct,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
