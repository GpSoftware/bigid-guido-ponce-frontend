import { z } from 'zod';

export type Comment = {
  id: number;
  comment: string;
  user_id: number;
  article_id: number;
  author: string;
  article_title: string;
};

export const CreateComment = z.object({
  article_id: z.number(),
  comment: z.string().min(6),
});
export type CreateComment = z.infer<typeof CreateComment>;

export const UpdateComment = CreateComment.partial();
export type UpdateComment = z.infer<typeof UpdateComment>;