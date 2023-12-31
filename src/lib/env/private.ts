import { z } from "zod";

const privateEnvSchema = z.object({
  POSTGRES_URL: z.string().url(),
  PINATA_JWT: z.string(),
});

type PrivateEnv = z.infer<typeof privateEnvSchema>;

export const privateEnv: PrivateEnv = {
  POSTGRES_URL: process.env.POSTGRES_URL!,
  PINATA_JWT: process.env.PINATA_JWT!,
};

privateEnvSchema.parse(privateEnv);
