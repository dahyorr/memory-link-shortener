import { z } from "zod";

export const urlInputSchema = z.object({
  url: z.string().url(),
});
