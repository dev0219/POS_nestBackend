import { BusinessTypeProductCategory } from '@wecon/domain/bs/model';
import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import BaseSchema from './interface/BaseSchema';

export const BusinessTypeProductCategoryEntity =
  new EntitySchema<BusinessTypeProductCategory>({
    name: 'BusinessTypeProductCategory',
    tableName: 'business_type_product_category',
    target: BusinessTypeProductCategory,
    columns: {
      ...BaseSchema,
      business_type_id: {
        type: String,
        length: 255,
        nullable: false,
      } as EntitySchemaColumnOptions,
      product_category_id: {
        type: String,
        length: 255,
        nullable: false,
      } as EntitySchemaColumnOptions,
    },
  });
