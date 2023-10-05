import { EntitySchema } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import BusinessTypeInterface from './interface/BusinessTypeInterface';
import { BusinessTypeSuggested } from '@wecon/domain/bs/model/BusinessTypeSuggested';

export const BusinessTypeSuggestedEntity =
  new EntitySchema<BusinessTypeSuggested>({
    name: 'BusinessTypeSuggested',
    tableName: 'business_type_suggested',
    target: BusinessTypeSuggested,
    columns: {
      ...BaseSchema,
      ...BusinessTypeInterface,
    },
    relations: {
      business: {
        type: 'one-to-one',
        target: 'Business',
        inverseSide: 'business_type_suggested',
        joinColumn: { name: 'business_id' },
      },
      business_category: {
        type: 'many-to-one',
        target: 'BusinessCategory',
        inverseSide: 'business_type_suggested',
        joinColumn: {
          name: 'business_category_id',
        },
      },
    },
  });
