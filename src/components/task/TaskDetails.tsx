'use client';

import { Stack, Typography } from '@mui/material';
import { useTaskDatabase } from '../providers/TaskDatabaseProvider';
import { Controller, useForm } from 'react-hook-form';
import DatePickerChip from '../ui/DatePickerChip';
import TaskStatusPickerChip from '../ui/TaskStatusPickerChip';
import { Task } from '@/models/Task';

type TaskDetailsProps = {
  id: string;
};

function useTask(id: string) {
  const database = useTaskDatabase();

  return database.tasks.find((task) => task.id === id);
}

type TaskFormValues = Omit<Task, 'id'>;

export default function TaskDetails({ id }: TaskDetailsProps) {
  const task = useTask(id);
  const { upsertTask } = useTaskDatabase();
  const { control } = useForm<TaskFormValues>({
    defaultValues: task,
  });

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <Stack
      direction="column"
      sx={{ padding: (theme) => theme.spacing(2), alignItems: 'start' }}
    >
      <Typography variant="h6">{task.title}</Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >
        {task.description}
      </Typography>
      <div className="flex items-center gap-2 mt-2">
        <TaskStatusPickerChip
          value={task.status}
          onChange={(status) => {
            upsertTask({
              ...task,
              status,
            });
          }}
        />
        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => {
            return (
              <DatePickerChip
                placeholder="Due date"
                value={task.dueDate}
                onChange={(dueDate) => {
                  upsertTask({
                    ...task,
                    dueDate,
                  });
                }}
              />
            );
          }}
        />
      </div>
    </Stack>
  );
}
