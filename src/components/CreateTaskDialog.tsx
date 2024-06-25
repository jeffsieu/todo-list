import { TaskDraft } from '@/models/Task';
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ResponsiveDialog from './ResponsiveDialog';
import TaskStatusPickerChip from './ui/TaskStatusPickerChip';
import DatePickerChip from './ui/DatePickerChip';
import dayjs from 'dayjs';

type CreateTaskFormValues = TaskDraft;

export type CreateTaskProps = {
  onTaskCreate: (task: TaskDraft) => void;
  open: boolean;
  onClose: () => void;
};

export default function CreateTaskDialog({
  onTaskCreate,
  open,
  onClose,
}: CreateTaskProps) {
  const [shouldAddMore, setShouldAddMore] = useState(false);
  const { register, handleSubmit, reset, control } =
    useForm<CreateTaskFormValues>({
      defaultValues: {
        title: '',
        description: '',
        dueDate: null,
        status: 'to-do',
      },
    });

  return (
    <ResponsiveDialog open={open} onClose={onClose}>
      <DialogTitle>New task</DialogTitle>
      <DialogContent>
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit((data) => {
            onTaskCreate(data);
            reset({
              title: '',
              description: '',
              status: data.status,
            });

            if (shouldAddMore) {
              return;
            }

            setShouldAddMore(false);
            onClose();
          })}
        >
          <div className="flex flex-col gap-y-2">
            <TextField
              label="Title"
              required
              variant="filled"
              {...register('title')}
            />
            <TextField
              label="Description"
              minRows={3}
              multiline
              variant="filled"
              {...register('description')}
            />
            <div className="flex justify-between items-center flex-wrap gap-x-2 gap-y-4">
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <TaskStatusPickerChip
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
                <Controller
                  control={control}
                  name="dueDate"
                  render={({ field }) => {
                    return (
                      <DatePickerChip
                        placeholder="Due date"
                        value={field.value}
                        onChange={(date) => {
                          field.onChange({
                            target: {
                              value: date,
                            },
                          });
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div className="flex items-center justify-end flex-grow">
                <FormControlLabel
                  control={
                    <Switch
                      checked={shouldAddMore}
                      onChange={(event) =>
                        setShouldAddMore(event.target.checked)
                      }
                    />
                  }
                  label="Add another task"
                />
                <Button type="submit" variant="contained">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </ResponsiveDialog>
  );
}
