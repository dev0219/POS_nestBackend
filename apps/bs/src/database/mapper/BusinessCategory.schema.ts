import { BusinessCategory } from '@wecon/domain/bs/model/BusinessCategory';
import { EntitySchema } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import BusinessCategoryInterface from './interface/BusinessCategoryInterface';

export const BusinessCategoryEntity = new EntitySchema<BusinessCategory>({
  name: 'BusinessCategory',
  tableName: 'business_category',
  target: BusinessCategory,
  columns: {
    ...BaseSchema,
    ...BusinessCategoryInterface,
  },
  relations: {
    business: {
      type: 'one-to-many',
      target: 'Business',
      inverseSide: 'business_category',
    },
    business_type: {
      type: 'one-to-many',
      target: 'BusinessType',
      inverseSide: 'business_category',
    },
  },
});
