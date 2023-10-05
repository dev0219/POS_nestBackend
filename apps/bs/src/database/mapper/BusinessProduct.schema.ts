import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import { BusinessProduct } from '@wecon/domain/bs/model/BusinessProduct';

export const BusinessProductEntity = new EntitySchema<BusinessProduct>({
  name: 'BusinessProduct',
  tableName: 'business_product',
  target: BusinessProduct,
  columns: {
    ...BaseSchema,
    business_id: {
      type: String,
      length: 255,
      nullable: false,
    } as EntitySchemaColumnOptions,
    product_id: {
      type: String,
      length: 255,
      nullable: false,
    } as EntitySchemaColumnOptions,
  },
});
