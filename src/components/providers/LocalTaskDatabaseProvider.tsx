import { useLocalTaskDatabase } from '@/database/LocalTaskDatabase';
import TaskDatabaseProvider from './TaskDatabaseProvider';

type LocalTaskDatabaseProviderProps = {
  children: React.ReactNode;
};

export default function LocalTaskDatabaseProvider({
  children,
}: LocalTaskDatabaseProviderProps) {
  const localDatabase = useLocalTaskDatabase();

  return (
    <TaskDatabaseProvider database={localDatabase}>
      {children}
    </TaskDatabaseProvider>
  );
}
