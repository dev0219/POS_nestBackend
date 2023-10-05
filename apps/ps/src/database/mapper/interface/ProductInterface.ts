import { EntitySchemaColumnOptions } from 'typeorm';

export default {
  barcode: {
    type: String,
    length: 48,
    nullable: false,
    comment: 'Barcode of product',
  } as EntitySchemaColumnOptions,
  name: {
    type: String,
    length: 200,
    nullable: false,
    comment: 'Name of product',
  } as EntitySchemaColumnOptions,
  short_name: {
    type: String,
    length: 200,
    nullable: false,
    comment: 'Short name of product',
  } as EntitySchemaColumnOptions,
  measure: {
    type: Number,
    nullable: false,
    comment: 'Measure of product',
  } as EntitySchemaColumnOptions,
  photoUrl: {
    type: String,
    nullable: true,
    comment: 'photo of product',
  } as EntitySchemaColumnOptions,
};
