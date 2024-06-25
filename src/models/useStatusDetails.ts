import {
  CheckCircle,
  Close,
  Lightbulb,
  Pending,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { ChipProps, SvgIconTypeMap } from '@mui/material';
import { useMemo } from 'react';
import { TaskStatus } from './Task';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

const statusDetails: {
  status: TaskStatus;
  label: string;
  icon: MuiIcon;
  color: ChipProps['color'];
}[] = [
  {
    status: 'to-do',
    label: 'To do',
    icon: RadioButtonUnchecked,
    color: 'default',
  },
  {
    status: 'in-progress',
    label: 'In progress',
    icon: Pending,
    color: 'secondary',
  },
  {
    status: 'completed',
    label: 'Completed',
    icon: CheckCircle,
    color: 'success',
  },
];

export function useStatusDetails(status: TaskStatus) {
  return useMemo(() => {
    return statusDetails.find(({ status: s }) => s === status)!;
  }, [status]);
}
