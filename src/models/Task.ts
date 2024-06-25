import z from 'zod';

export const taskStatusSchema = z.enum(['to-do', 'in-progress', 'completed']);
export const taskDraftSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: taskStatusSchema,
  dueDate: z.date().nullable(),
});
export const taskSchema = taskDraftSchema.extend({
  id: z.string(),
});

export type TaskDraft = z.infer<typeof taskDraftSchema>;
export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusSchema>;
