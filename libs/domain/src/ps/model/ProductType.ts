import { ApiProperty } from '@nestjs/swagger';
import { IEntity } from '@wecon/domain/IEntity';
import { BaseModel } from '@wecon/domain/model';
import { Product } from '@wecon/domain/ps/model/Product';
import { ProductCategory } from './ProductCategory';

export class ProductType extends BaseModel implements IEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  products_count: number;

  @ApiProperty({ required: false, nullable: true })
  products?: Promise<Product[]>;

  @ApiProperty({ required: false, nullable: true })
  product_category?: Promise<ProductCategory>;

  // @ApiProperty()
  product_category_id: string;
}
