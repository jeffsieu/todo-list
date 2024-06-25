'use client';

import { useRouter } from 'next/navigation';
import ResponsiveDialog from '../ResponsiveDialog';

export default function RouteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <ResponsiveDialog
        open={true}
        onClose={() => {
          router.back();
        }}
      >
        {children}
      </ResponsiveDialog>
    </>
  );
}
