import { z } from 'zod';

export type User = {
  id: number;
  username: string;
  email: string;
  organization_id: number;
  organization_name: string;
  amount_of_articles: number;
  amount_of_comments: number;
};

export const CreateUser = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
  organization_id: z.number(),
});
export type CreateUser = z.infer<typeof CreateUser>;

export const UpdateUser = CreateUser.partial();
export type UpdateUser = z.infer<typeof UpdateUser>;