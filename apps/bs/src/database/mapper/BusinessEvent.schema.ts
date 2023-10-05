import { BusinessEvent } from '@wecon/domain/bs/model';
import { EntitySchema } from 'typeorm';
import BaseSchema from './interface/BaseSchema';
import BusinessEventInterface from './interface/BusinessEventInterface';

export const BusinessEventEntity = new EntitySchema<BusinessEvent>({
  name: 'BusinessEvent',
  tableName: 'business_event',
  target: BusinessEvent,
  columns: {
    ...BaseSchema,
    ...BusinessEventInterface,
  },
});
