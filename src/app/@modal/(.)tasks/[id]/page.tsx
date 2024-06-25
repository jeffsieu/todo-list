import TaskDetails from '@/components/task/TaskDetails';
import RouteModal from '@/components/ui/RouteModal';

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <RouteModal>
      <TaskDetails id={id} isMini={true} />
    </RouteModal>
  );
}
