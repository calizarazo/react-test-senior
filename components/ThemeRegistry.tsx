'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { theme } from '@/theme/theme';
import { store } from '@/store/store';

/**
 * Componente que registra y proporciona el tema de Material-UI a toda la aplicación.
 * También aplica CssBaseline para normalizar los estilos base.
 *
 * @param props - Propiedades del componente
 * @param props.children - Componentes hijos que recibirán el tema
 * @returns El proveedor de tema con los componentes hijos
 *
 * @remarks
 * Este componente debe envolver toda la aplicación para que el tema
 * esté disponible en todos los componentes. Se usa en el layout principal.
 *
 * @example
 * ```tsx
 * <ThemeRegistry>
 *   <App />
 * </ThemeRegistry>
 * ```
 *
 * @public
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}

