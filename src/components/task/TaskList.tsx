import { Task } from '@/models/Task';
import { Card, Divider, List, Typography } from '@mui/material';
import TaskListItem from './TaskListItem';

export type TaskListProps = {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (task: Task) => void;
};

export default function TaskList({
  title,
  tasks,
  onTaskClick,
  onTaskUpdate,
  onTaskDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h5">{title}</Typography>
      <Card variant="outlined">
        <List>
          {tasks.map((task, index) => (
            <>
              {index > 0 && (
                <Divider sx={{ marginTop: (theme) => theme.spacing(2) }} />
              )}
              <TaskListItem
                key={task.id}
                task={task}
                onClick={() => {
                  onTaskClick(task);
                }}
                onDelete={() => {
                  onTaskDelete(task);
                }}
                onUpdate={(newTask) => {
                  onTaskUpdate(newTask);
                }}
              />
            </>
          ))}
        </List>
      </Card>
    </div>
  );
}
