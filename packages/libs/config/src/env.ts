import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development','test','production']).default('development'),
  PORT: z.coerce.number().default(3000),

  // postgres
  DATABASE_URL: z.string(), // e.g. postgresql://kumaon:kumaon@localhost:5432/kumaon?schema=identity

  // mongo (when needed)
  MONGO_URI: z.string().optional(),

  // redis
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // auth
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('15m'),

  // nats
  NATS_URL: z.string().default('nats://localhost:4222'),
});

export type Env = z.infer<typeof EnvSchema>;
