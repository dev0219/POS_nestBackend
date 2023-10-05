import { BaseModel } from '../../model/BaseModel';
import { IEntity } from '../../IEntity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductBrand } from './ProductBrand';
import { ProductType } from './ProductType';

export class Product extends BaseModel implements IEntity {
  @ApiProperty()
  name: string;

  @ApiProperty({ uniqueItems: true })
  barcode: string;

  @ApiProperty()
  short_name: string;

  @ApiProperty()
  measure: number;

  @ApiProperty({ required: false, nullable: true })
  product_brand?: Promise<ProductBrand>;

  @ApiProperty({ required: false, nullable: true })
  product_type?: Promise<ProductType>;

  @ApiProperty({ required: false, nullable: true })
  product_types?: Promise<ProductType[]>;

  @ApiProperty()
  photoUrl: string;
}

