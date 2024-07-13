import { TypeOrmModule } from '@nestjs/typeorm';
import Config from '@/config';

import Entities from './entities';

const DatabaseConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  username: Config.database.username,
  password: Config.database.password,
  database: Config.database.database,
  host: Config.database.host,
  logging: Config.database.logging,
  port: Config.database.port,
  synchronize: true,
  ssl: process.env.POSTGRES_SSL === 'true',
  entities: Entities,
});

export default DatabaseConfig;
