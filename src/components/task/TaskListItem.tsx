import { Task } from '@/models/Task';
import { ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';
import TaskStatusPickerChip from '../ui/TaskStatusPickerChip';
import DatePickerChip from '../ui/DatePickerChip';

export type TaskListItemProps = {
  task: Task;
  onDelete: () => void;
  onUpdate: (task: Task) => void;
  onClick: () => void;
};

export default function TaskListItem({
  task,
  onDelete,
  onUpdate,
  onClick,
}: TaskListItemProps) {
  return (
    <ListItem
      disablePadding
      sx={{ flexDirection: 'column', alignItems: 'start' }}
    >
      <ListItemButton
        onClick={onClick}
        sx={{
          alignSelf: 'stretch',
          flexDirection: 'column',
          alignItems: 'start',
        }}
        disableRipple
        disableTouchRipple
      >
        <ListItemText
          primary={task.title}
          secondary={task.description}
          primaryTypographyProps={{
            variant: 'subtitle1',
            color: (theme) => theme.palette.text.primary,
            fontWeight: 'medium',
            gutterBottom: false,
          }}
          secondaryTypographyProps={{
            className: 'truncate',
            color: (theme) => theme.palette.text.secondary,
          }}
          sx={{ margin: 0 }}
        />
      </ListItemButton>
      <Stack
        direction="row"
        paddingInline={(theme) => theme.spacing(2)}
        gap={(theme) => theme.spacing(1)}
        flexWrap="wrap"
      >
        <TaskStatusPickerChip
          value={task.status}
          onChange={(newStatus) => {
            onUpdate({
              ...task,
              status: newStatus,
            });
          }}
        />
        {task.dueDate && (
          <DatePickerChip
            placeholder="Due date"
            value={task.dueDate}
            hideDeleteButton
            onChange={(date) => {
              onUpdate({
                ...task,
                dueDate: date,
              });
            }}
          />
        )}
      </Stack>
    </ListItem>
  );
}
