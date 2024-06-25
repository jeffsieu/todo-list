import { ThemeProvider, createTheme } from '@mui/material';
import m3Theme from '../../m3theme.json';

const theme = createTheme(m3Theme as any);

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
