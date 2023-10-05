import { EntitySchemaColumnOptions } from 'typeorm';

export default {
  version: {
    type: Number,
    nullable: false,
    comment: 'Version of the event in the business',
  } as EntitySchemaColumnOptions,
  payload: {
    type: 'jsonb',
    nullable: false,
    comment: 'Payload of the event',
  } as EntitySchemaColumnOptions,
  event_type: {
    type: Number,
    nullable: false,
    comment: 'Type of the event',
  } as EntitySchemaColumnOptions,
};
