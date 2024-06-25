import { TaskStatus } from '@/models/Task';
import { useStatusDetails } from '@/models/useStatusDetails';
import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from '@mui/material';
import { useId, useState } from 'react';

const statuses: TaskStatus[] = ['to-do', 'in-progress', 'completed'];

function TaskStatusItem({
  status,
  onClick,
}: {
  status: TaskStatus;
  onClick: () => void;
}) {
  const { label, icon: Icon } = useStatusDetails(status);

  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

type TaskStatusPickerChipProps = {
  value?: TaskStatus;
  onChange?: (status: TaskStatus) => void;
};

export default function TaskStatusPickerChip({
  value: status = 'to-do',
  onChange,
}: TaskStatusPickerChipProps) {
  const {
    label: statusLabel,
    icon: StatusIcon,
    color: statusColor,
  } = useStatusDetails(status);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = useId();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        aria-describedby={id}
        color={statusColor}
        icon={<StatusIcon />}
        label={statusLabel}
        variant="outlined"
        onClick={handleClick}
      />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id={id}
        open={open}
        onClose={handleClose}
      >
        <List>
          {statuses.map((status) => (
            <TaskStatusItem
              key={status}
              status={status}
              onClick={() => {
                onChange?.(status);
                handleClose();
              }}
            />
          ))}
        </List>
      </Popover>
    </>
  );
}
