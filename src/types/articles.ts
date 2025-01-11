import { z } from 'zod';

export type Article = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  author: string;
  amount_of_comments: number;
};

export const CreateArticle = z.object({
  title: z.string().min(6),
  content: z.string().min(10),
});
export type CreateArticle = z.infer<typeof CreateArticle>;

export const UpdateArticle = CreateArticle.partial();
export type UpdateArticle = z.infer<typeof UpdateArticle>;