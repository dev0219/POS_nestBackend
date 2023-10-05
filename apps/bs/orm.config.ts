import { config } from 'dotenv';
import * as path from 'path';
import { join } from 'path';

import { DataSource } from 'typeorm';

export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return ['.env.test', '.env'];
    case 'stage':
      return ['.env.stage', '.env'];
    case 'development':
      return ['.env.development', '.env'];
    case 'production':
    default:
      return '.env';
  }
}

const envPath = setEnvironment();

const envFilePath = path.resolve(
  __dirname,
  '../../',
  Array.isArray(envPath) ? envPath[0] : envPath,
);
console.log(`================ ${envFilePath} ==================== `);
config({ path: envFilePath });
const migrationsPath = join(__dirname, 'src/database/migrations', '*.{ts,js}');
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.BS_DB_HOST,
  port: Number.parseInt(process.env.BS_DB_PORT),
  username: process.env.BS_DB_USERNAME,
  password: process.env.BS_DB_PASSWORD,
  database: process.env.BS_DB_DATABASE,
  entities: [],
  migrations: [migrationsPath],
});
