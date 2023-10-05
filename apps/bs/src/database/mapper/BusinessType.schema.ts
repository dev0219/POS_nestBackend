import { BusinessType } from '@wecon/domain/bs/model/BusinessType';
import { EntitySchema } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import BusinessTypeInterface from './interface/BusinessTypeInterface';

export const BusinessTypeEntity = new EntitySchema<BusinessType>({
  name: 'BusinessType',
  tableName: 'business_type',
  target: BusinessType,
  columns: {
    ...BaseSchema,
    ...BusinessTypeInterface,
  },
  relations: {
    business: {
      type: 'one-to-many',
      target: 'Business',
      inverseSide: 'business_type',
      joinColumn: {
        name: 'business_type_id',
      },
    },
    business_category: {
      type: 'many-to-one',
      target: 'BusinessCategory',
      inverseSide: 'business_type',
      joinColumn: {
        name: 'business_category_id',
      },
    },
  },
});
