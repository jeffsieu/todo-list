import { Dialog, Drawer, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export type ResponsiveDialogProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ResponsiveDialog({
  open,
  onClose,
  children,
}: ResponsiveDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Drawer open={open} onClose={onClose} anchor="bottom">
        {children}
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {children}
    </Dialog>
  );
}
