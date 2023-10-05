import { EntitySchema, EntitySchemaColumnOptions } from 'typeorm';
import BusinessInterface from './interface/BusinessInterface';
import BaseSchema from './interface/BaseSchema';
import { Business } from '@wecon/domain/bs/model/Business';

export const BusinessEntity = new EntitySchema<Business>({
  name: 'Business',
  tableName: 'business',
  target: Business,
  columns: {
    ...BaseSchema,
    ...BusinessInterface,
  },
  relations: {
    business_type: {
      type: 'many-to-one',
      target: 'BusinessType',
      joinColumn: {
        name: 'business_type_id',
      },
      inverseSide: 'business',
    },
  },
});
