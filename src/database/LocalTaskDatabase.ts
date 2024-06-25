import { useCallback, useEffect, useMemo, useState } from 'react';
import { TaskDatabase } from './TaskDatabase';
import { Task, TaskDraft, taskSchema } from '@/models/Task';
import useLocalStorage from './useLocalStorage';
import z from 'zod';
import superjson from 'superjson';

const LOCAL_DATABASE_NAME = 'my-task-list';
const LOCAL_DATABASE_VERSION = 1;

const initialTasks: Task[] = [
  {
    id: 'TOD-1',
    title: 'Make Task List',
    dueDate: new Date('2024-06-24'),
    description:
      'Make a task list app with React and TypeScript. Super duper duper duper long description',
    status: 'in-progress',
  },
  {
    id: 'TOD-2',
    title: 'hello',
    dueDate: null,
    description: 'my task',
    status: 'completed',
  },
  {
    id: 'TOD-3',
    title: 'Make Task List',
    dueDate: new Date('2024-06-24'),
    description:
      'Make a task list app with React and TypeScript. Super duper duper duper long description',
    status: 'in-progress',
  },
];

function generatePseudoRandomId() {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

function isTaskDraft(task: Task | TaskDraft): task is TaskDraft {
  return !('id' in task);
}

const tasksSchema = z.array(taskSchema);

export function useLocalTaskDatabase(): TaskDatabase {
  const [tasksRaw, setTasksRaw] = useLocalStorage(LOCAL_DATABASE_NAME);

  const tasks = useMemo(() => {
    if (!tasksRaw) {
      return initialTasks;
    }

    try {
      const parsedTasks = superjson.parse(tasksRaw);
      console.log(parsedTasks);
      const tasks = tasksSchema.parse(parsedTasks);

      return tasks;
    } catch (e) {
      console.log(e);
      return initialTasks;
    }
  }, [tasksRaw]);

  const setTasks = useCallback(
    (newTasks: Task[]) => {
      setTasksRaw(superjson.stringify(newTasks));
    },
    [setTasksRaw]
  );

  const addTask = useCallback(
    (newTask: TaskDraft) => {
      const id = generatePseudoRandomId();
      const newTasks = [...tasks, { ...newTask, id }];

      setTasks(newTasks);
    },
    [setTasks, tasks]
  );

  const updateTask = useCallback(
    (newTask: Task) => {
      const newTasks = tasks.map((task) => {
        if (task.id !== newTask.id) {
          return task;
        }

        return newTask;
      });

      setTasks(newTasks);
    },
    [setTasks, tasks]
  );

  const upsertTask = useCallback(
    async (newTask: TaskDraft) => {
      if (isTaskDraft(newTask)) {
        addTask(newTask);
      } else {
        updateTask(newTask);
      }
    },
    [addTask, updateTask]
  );

  const deleteTask = useCallback(
    async (taskToDelete: Task) => {
      const newTasks = tasks.filter((task) => task.id !== taskToDelete.id);

      setTasks(newTasks);
    },
    [setTasks, tasks]
  );

  return useMemo(
    () => ({
      upsertTask,
      deleteTask,
      tasks,
    }),
    [deleteTask, tasks, upsertTask]
  );
}
