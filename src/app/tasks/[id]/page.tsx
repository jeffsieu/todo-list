'use client';

import TaskDetails from '@/components/task/TaskDetails';
import { ArrowBack } from '@mui/icons-material';
import { Button, Container } from '@mui/material';

export default function TaskPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <Container>
      <Button
        sx={{ marginTop: (theme) => theme.spacing(2) }}
        href="/"
        startIcon={<ArrowBack />}
        variant="outlined"
      >
        Back to all tasks
      </Button>
      <TaskDetails id={id} isMini={false} />
    </Container>
  );
}
