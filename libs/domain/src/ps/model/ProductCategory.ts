import { ApiProperty } from '@nestjs/swagger';
import { BaseModel, IEntity } from '@wecon/domain';
import { ProductBrand } from './ProductBrand';
import { ProductType } from './ProductType';

export class ProductCategory extends BaseModel implements IEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  products_count: number;

  @ApiProperty({ required: false, nullable: true })
  product_types?: Promise<ProductType[]>;

  @ApiProperty({ required: false, nullable: true })
  product_brands?: Promise<ProductBrand[]>;
}
