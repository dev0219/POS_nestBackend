import { EntitySchemaColumnOptions } from 'typeorm';

export default {
  name: {
    type: String,
    length: 200,
    nullable: false,
    comment: 'Name of the business',
  } as EntitySchemaColumnOptions,
  address: {
    type: String,
    length: 500,
    unique: true,
    comment: 'Address of the business',
  } as EntitySchemaColumnOptions,
  gps: {
    type: 'point',
    comment: 'GPS coordinates of the business',
  } as EntitySchemaColumnOptions,
  phone: {
    type: String,
    length: 20,
    unique: false,
    nullable: true,
    comment: 'Phone number of the business',
  } as EntitySchemaColumnOptions,
  business_type_id: {
    type: 'uuid',
  } as EntitySchemaColumnOptions,
};
