import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDBConfig } from './config';
import { Product } from '@wecon/domain/ps/model/Product';
import {
  ProductBrand,
  ProductCategory,
  ProductType,
} from '@wecon/domain/ps/model';

@Module({
  imports: [
    TypeOrmModule.forRoot(getDBConfig()),
    TypeOrmModule.forFeature([
      Product,
      ProductBrand,
      ProductCategory,
      ProductType,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
