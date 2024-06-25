'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AppThemeProvider from './AppThemeProvider';
import LocalTaskDatabaseProvider from './LocalTaskDatabaseProvider';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppThemeProvider>
        <LocalTaskDatabaseProvider>{children}</LocalTaskDatabaseProvider>
      </AppThemeProvider>
    </LocalizationProvider>
  );
}
