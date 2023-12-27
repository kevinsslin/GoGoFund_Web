import { z } from "zod";

const publicEnvSchema = z.object({
  MAGIC_CONNECT_API_KEY: z.string(),
  RAINBOW_PROJECT_ID: z.string(),
});

type PublicEnv = z.infer<typeof publicEnvSchema>;

export const publicEnv: PublicEnv = {
  MAGIC_CONNECT_API_KEY:
    process.env.NEXT_PUBLIC_MAGIC_CONNECT_API_KEY || "pk_live_C417C83E51D79C20",
  RAINBOW_PROJECT_ID:
    process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID ||
    "966691db73928f3c8a904ea62261b457",
};

publicEnvSchema.parse(publicEnv);
