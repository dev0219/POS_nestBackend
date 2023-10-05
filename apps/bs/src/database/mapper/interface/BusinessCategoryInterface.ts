import { EntitySchemaColumnOptions } from 'typeorm';

export default {
  name: {
    type: String,
    length: 200,
    nullable: false,
    comment: 'Name of the business category',
  } as EntitySchemaColumnOptions,
};
