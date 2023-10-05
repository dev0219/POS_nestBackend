import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import { ProductType } from '@wecon/domain/ps/model';

export const ProductTypeEntity = new EntitySchema<ProductType>({
  name: 'ProductType',
  tableName: 'product_type',
  target: ProductType,
  columns: {
    ...BaseSchema,
    name: {
      type: String,
      length: 200,
      nullable: false,
      comment: 'Name of product',
    } as EntitySchemaColumnOptions,
    products_count: {
      type: Number,
      comment: 'Number of products in the brand',
    } as EntitySchemaColumnOptions,
  },
  relations: {
    products: {
      type: 'many-to-many',
      target: 'Product',
      joinTable: {
        name: 'product_product_type',
      },
    },
    product_category: {
      type: 'many-to-one',
      target: 'ProductCategory',
      joinColumn: {
        name: 'product_category_id',
      },
      inverseSide: 'product_types',
    },
  },
});
