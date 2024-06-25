'use client';

import TaskDetails from '@/components/task/TaskDetails';
import { Container } from '@mui/material';

export default function TaskPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <Container>
      <TaskDetails id={id} />
    </Container>
  );
}
