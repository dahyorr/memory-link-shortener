import { z } from "zod";

export const encodeUrlSchema = z.object({
  url: z.string().url(),
});

export const decodeIdSchema = z.object({
  id: z.string(),
});