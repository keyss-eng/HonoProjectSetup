import { z } from 'zod';

export const joinWaitlistSchema = z.object({
  email: z.string()
    .email({ message: "Please enter a valid email address format" })
    .endsWith("@gmail.com", { message: "invalid email" }),
  referred_by: z.string().optional()
});

export type JoinWaitlistDTO = z.infer<typeof joinWaitlistSchema>;