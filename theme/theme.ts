import { createTheme } from '@mui/material/styles';

/**
 * Configuración del tema de Material-UI para la aplicación.
 * Define los colores primarios, secundarios y la tipografía base.
 *
 * @returns El tema de Material-UI configurado
 *
 * @remarks
 * El tema utiliza:
 * - Color primario: azul (#1976d2)
 * - Color secundario: rosa (#dc004e)
 * - Fuente: sistema de fuentes nativas del sistema operativo
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@mui/material/styles';
 * import { theme } from '@/theme/theme';
 *
 * <ThemeProvider theme={theme}>
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @public
 */
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

