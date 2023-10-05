import { EntitySchemaColumnOptions } from 'typeorm';

export default {
  id: {
    type: 'uuid',
    primary: true,
    generated: 'uuid',
    primaryGeneratedColumn: 'uuid',
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'timestamp with time zone',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp with time zone',
    updateDate: true,
  } as EntitySchemaColumnOptions,
  updatedBy: {
    name: 'updated_by',
    type: String,
    nullable: true,
  } as EntitySchemaColumnOptions,
};
