import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function getDBConfig(): TypeOrmModuleOptions {
  const entityPath = join(__dirname, '**', '*.schema.{ts,js}');
  console.log(process.env.PS_DB_HOST);
  return {
    type: 'postgres',
    host: process.env.PS_DB_HOST,
    port: Number.parseInt(process.env.PS_DB_PORT),
    username: process.env.PS_DB_USERNAME,
    password: process.env.PS_DB_PASSWORD,
    database: process.env.PS_DB_DATABASE,
    entities: [entityPath],
    synchronize: false, // use migrations instead
    autoLoadEntities: true,
  };
}
