import { EntitySchemaColumnOptions } from 'typeorm';

export default {
  name: {
    type: String,
    length: 200,
    nullable: false,
    comment: 'Name of the business type',
  } as EntitySchemaColumnOptions,
  business_category_id: {
    type: 'uuid',
  } as EntitySchemaColumnOptions,
};
