import { z } from "zod";

const privateEnvSchema = z.object({
  POSTGRES_URL: z.string().url(),
  MAGIC_CONNECT_API_KEY: z.string(),
  RAINBOW_PROJECT_ID: z.string(),
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  POSTGRES_URL: process.env.POSTGRES_URL!,
  MAGIC_CONNECT_API_KEY: process.env.MAGIC_CONNECT_API_KEY!,
  RAINBOW_PROJECT_ID: process.env.RAINBOW_PROJECT_ID!,
};

privateEnvSchema.parse(privateEnv);
