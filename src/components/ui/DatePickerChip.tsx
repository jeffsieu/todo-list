import { CalendarMonthRounded } from '@mui/icons-material';
import { Chip, Popover } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useId, useState } from 'react';

export type DatePickerChipProps = {
  value?: Date | null;
  label?: string;
  placeholder?: string;
  onChange?: (date: Date | null) => void;
  hideDeleteButton?: boolean;
};

export default function DatePickerChip({
  value,
  label,
  placeholder = 'Select date',
  onChange,
  hideDeleteButton = false,
}: DatePickerChipProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const id = useId();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const dateDayjs = value ? dayjs(value) : null;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Chip
        label={label ?? dateDayjs?.format('DD/MM/YYYY') ?? placeholder}
        onClick={handleClick}
        variant="outlined"
        icon={<CalendarMonthRounded />}
        onDelete={
          !hideDeleteButton && value != null
            ? () => {
                onChange?.(null);
              }
            : undefined
        }
        color="secondary"
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
        <StaticDatePicker
          slots={{
            toolbar: () => <div />,
          }}
          slotProps={{
            actionBar: {
              onAccept: () => {
                handleClose();
              },
              onCancel: () => {
                handleClose();
              },
            },
          }}
          value={dateDayjs}
          onChange={(newDate) => {
            onChange?.(newDate?.toDate() ?? null);
          }}
        />
      </Popover>
    </>
  );
}
