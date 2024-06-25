'use client';

import { Button, IconButton, Stack, Typography } from '@mui/material';
import { useTaskDatabase } from '../providers/TaskDatabaseProvider';
import { Controller, useForm } from 'react-hook-form';
import DatePickerChip from '../ui/DatePickerChip';
import TaskStatusPickerChip from '../ui/TaskStatusPickerChip';
import { Task } from '@/models/Task';
import { useRouter } from 'next/navigation';
import { OpenInNew } from '@mui/icons-material';

type TaskDetailsProps = {
  id: string;
  isMini: boolean;
};

function useTask(id: string) {
  const database = useTaskDatabase();

  return database.tasks.find((task) => task.id === id);
}

type TaskFormValues = Omit<Task, 'id'>;

export default function TaskDetails({ id, isMini }: TaskDetailsProps) {
  const router = useRouter();
  const task = useTask(id);
  const { upsertTask, deleteTask } = useTaskDatabase();
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
      <div className="flex items-center self-stretch justify-between">
        <Typography variant="h6">{task.title}</Typography>
        {isMini && (
          <IconButton
            aria-label="Open in new"
            onClick={() => {
              // open current url in new tab
              window.open(window.location.href, '_blank');
            }}
          >
            <OpenInNew />
          </IconButton>
        )}
      </div>
      <Typography
        variant="subtitle1"
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >
        {task.description}
      </Typography>
      <div className="flex justify-between items-center gap-2 mt-2 self-stretch">
        <div className="flex items-center gap-2">
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
        <Button
          variant="outlined"
          sx={{
            color: '#93000A',
          }}
          onClick={async () => {
            await deleteTask(task);
            router.back();
          }}
        >
          Delete task
        </Button>
      </div>
    </Stack>
  );
}
