import 'dotenv/config';

import ConfigSchema from './ConfigSchema';

const Config = ConfigSchema.parse({
  api: {
    host: process.env.API_HOST!,
    port: Number(process.env.PORT || process.env.API_PORT),
  },
  database: {
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    logging: process.env.POSTGRES_LOGGING === 'true',
  },
});

export default Config;
