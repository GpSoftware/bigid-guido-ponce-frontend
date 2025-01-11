import { z } from 'zod';

export type Organization = {
  id: number;
  name: string;
  amount_of_users: number;
};

const CreateOrganization = z.object({
  name: z.string().min(3),
});
export type CreateOrganization = z.infer<typeof CreateOrganization>;
