import { EntitySchema } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import { Product } from '@wecon/domain/ps/model/Product';
import ProductInterface from './interface/ProductInterface';

export const ProductEntity = new EntitySchema<Product>({
  name: 'Product',
  tableName: 'product',
  target: Product,
  columns: {
    ...BaseSchema,
    ...ProductInterface,
  },
  relations: {
    product_brand: {
      type: 'many-to-one',
      target: 'ProductBrand',
      joinColumn: {
        name: 'product_brand_id',
      },
      inverseSide: 'product',
    },
    product_type: {
      type: 'many-to-one',
      target: 'ProductType',
      joinColumn: {
        name: 'product_type_id',
      },
      inverseSide: 'product',
    },
    product_types: {
      type: 'many-to-many',
      target: 'ProductType',
      joinTable: {
        name: 'product_product_type',
      },
    },
  },
});
