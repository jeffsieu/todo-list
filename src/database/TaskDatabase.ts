import { TaskDraft, Task } from '@/models/Task';

export type TaskDatabase = {
  upsertTask: (task: TaskDraft) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  tasks: Task[];
};
