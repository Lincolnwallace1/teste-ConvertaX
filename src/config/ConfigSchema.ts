import Z from 'zod';

const ConfigSchema = Z.object({
  api: Z.object({
    host: Z.string(),
    port: Z.number(),
  }),
  database: Z.object({
    host: Z.string(),
    username: Z.string(),
    password: Z.string(),
    database: Z.string(),
    port: Z.number(),
    logging: Z.boolean(),
  }),
});

export default ConfigSchema;
