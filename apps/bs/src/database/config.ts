import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function getDBConfig(): TypeOrmModuleOptions {
  const entityPath = join(__dirname, '**', '*.schema.{ts,js}');
  return {
    type: 'postgres',
    host: process.env.BS_DB_HOST,
    port: Number.parseInt(process.env.BS_DB_PORT),
    username: process.env.BS_DB_USERNAME,
    password: process.env.BS_DB_PASSWORD,
    database: process.env.BS_DB_DATABASE,
    entities: [entityPath],
    synchronize: false, // use migrations instead
    autoLoadEntities: true,
  };
}
