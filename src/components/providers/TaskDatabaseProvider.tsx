'use client';

import { TaskDatabase } from '@/database/TaskDatabase';
import { createContext, useContext } from 'react';

export type TaskDatabaseProviderProps = {
  database: TaskDatabase;
  children: React.ReactNode;
};

const TaskDatabaseContext = createContext<TaskDatabase>({
  upsertTask: async (task) => {},
  deleteTask: async (task) => {},
  tasks: [],
});

export function useTaskDatabase() {
  return useContext(TaskDatabaseContext);
}

export default function TaskDatabaseProvider({
  database,
  children,
}: TaskDatabaseProviderProps) {
  return (
    <TaskDatabaseContext.Provider value={database}>
      {children}
    </TaskDatabaseContext.Provider>
  );
}
