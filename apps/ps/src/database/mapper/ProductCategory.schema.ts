import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import { ProductCategory } from '@wecon/domain/ps/model';

export const ProductCategoryEntity = new EntitySchema<ProductCategory>({
  name: 'ProductCategory',
  tableName: 'product_category',
  target: ProductCategory,
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
      nullable: false,
      comment: 'Number of products in the brand',
    } as EntitySchemaColumnOptions,
  },
  relations: {
    product_types: {
      type: 'one-to-many',
      target: 'ProductType',
      inverseSide: 'product_category',
    },
    product_brands: {
      type: 'many-to-many',
      target: 'ProductBrand',
      joinTable: {
        name: 'product_category_product_brand',
      },
      inverseSide: 'product_categories',
    },
  },
});
