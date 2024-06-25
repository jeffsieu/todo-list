'use client';

import CreateTaskDialog from '@/components/CreateTaskDialog';
import TaskList from '@/components/task/TaskList';
import { Task, TaskDraft } from '@/models/Task';
import { Button, Container } from '@mui/material';
import { useMemo, useState } from 'react';
import { Add } from '@mui/icons-material';
import { useTaskDatabase } from '@/components/providers/TaskDatabaseProvider';
import _ from 'lodash-es';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { upsertTask, deleteTask, tasks } = useTaskDatabase();
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    router.push(`/tasks/${task.id}`);
  };

  const handleTaskCreate = (newTask: TaskDraft) => {
    upsertTask(newTask);
  };

  const handleTaskUpdate = (newTask: Task) => {
    upsertTask(newTask);
  };

  const handleTaskDelete = (taskToDelete: Task) => {
    deleteTask(taskToDelete);
  };

  const completedTasks = useMemo(
    () =>
      _.sortBy(_.filter(tasks, { status: 'completed' }), ['dueDate', 'title']),
    [tasks]
  );

  const activeTasks = useMemo(
    () =>
      _.sortBy(
        _.filter(tasks, ({ status }) => status !== 'completed'),
        ['status', 'dueDate', 'title']
      ),
    [tasks]
  );

  return (
    <main className="flex min-h-screen flex-col items-stretch p-4">
      <Container className="space-y-6" disableGutters>
        <Button
          startIcon={<Add />}
          variant="outlined"
          onClick={() => {
            setIsCreateTaskDialogOpen(true);
          }}
        >
          New task
        </Button>
        <CreateTaskDialog
          open={isCreateTaskDialogOpen}
          onClose={() => setIsCreateTaskDialogOpen(false)}
          onTaskCreate={handleTaskCreate}
        />
        {tasks.length === 0 && <div>No tasks yet.</div>}
        <TaskList
          title="Active"
          tasks={activeTasks}
          onTaskClick={handleTaskClick}
          onTaskDelete={handleTaskDelete}
          onTaskUpdate={handleTaskUpdate}
        />
        <TaskList
          title="Completed"
          tasks={completedTasks}
          onTaskClick={handleTaskClick}
          onTaskDelete={handleTaskDelete}
          onTaskUpdate={handleTaskUpdate}
        />
      </Container>
    </main>
  );
}
