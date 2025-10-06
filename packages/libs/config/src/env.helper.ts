import { EnvSchema } from "./env";

export function loadEnv() {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) throw new Error(JSON.stringify(parsed.error.format(), null, 2));
  return parsed.data;
}
