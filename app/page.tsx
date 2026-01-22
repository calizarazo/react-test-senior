'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Toolbar,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import RecipeTable from '@/components/RecipeTable';
import {
  pageLayoutSx,
  contentWrapperSx,
  getMainBoxSx,
  titleWrapperSx,
  titleSx,
} from '@/styles/pageStyles';

/**
 * Ancho del drawer lateral en píxeles.
 *
 * @internal
 */
const drawerWidth = 240;

/**
 * Página principal de la aplicación que muestra la lista de recetas.
 * Incluye la barra de navegación, sidebar de filtros, tabla de recetas y pie de página.
 *
 * @returns El componente de la página principal
 *
 * @remarks
 * La página se adapta responsivamente:
 * - En móviles: muestra un botón de menú para abrir/cerrar el sidebar
 * - En desktop: muestra el sidebar permanentemente visible
 *
 * @example
 * ```tsx
 * // Esta es la página principal, se renderiza automáticamente en la ruta "/"
 * ```
 *
 * @public
 */
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * Maneja la apertura/cierre del drawer en dispositivos móviles.
   */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={pageLayoutSx}>
      <Navbar isMobile={isMobile} onMenuClick={handleDrawerToggle} />
      <Box sx={contentWrapperSx}>
        <Sidebar
          open={mobileOpen}
          onClose={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
        <Box component="main" sx={getMainBoxSx(drawerWidth)} className="main-content">
          <Toolbar />
          <Container maxWidth="lg" className="container-recipes">
            <Box sx={titleWrapperSx}>
              <Typography variant="h4" component="h1" sx={titleSx}>
                Tabla de recetas
              </Typography>
            </Box>
            <RecipeTable />
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
