import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import { ProductBrand } from '@wecon/domain/ps/model';

export const ProductBrandEntity = new EntitySchema<ProductBrand>({
  name: 'ProductBrand',
  tableName: 'product_brand',
  target: ProductBrand,
  columns: {
    ...BaseSchema,
    name: {
      type: String,
      length: 200,
      nullable: false,
      comment: 'Name of brand',
    } as EntitySchemaColumnOptions,
    products_count: {
      type: Number,
      comment: 'Number of products in the brand',
    } as EntitySchemaColumnOptions,
  },
  relations: {
    products: {
      type: 'one-to-many',
      target: 'Product',
      inverseSide: 'product_brand',
    },
    product_categories: {
      type: 'many-to-many',
      target: 'ProductCategory',
      joinTable: {
        name: 'product_category_product_brand',
      },
      inverseSide: 'product_brands',
    },
  },
});
