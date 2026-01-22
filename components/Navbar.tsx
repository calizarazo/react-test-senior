'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  toolbarSx,
  logoBoxSx,
  iconButtonSx,
  actionsBoxSx,
  loginButtonDesktopSx,
  searchSx,
  loginButtonMobileSx,
  separatorBoxSx,
} from '@/styles/navbarStyles';

/**
 * Componente de barra de navegación principal de la aplicación.
 * Incluye el logo, barra de búsqueda y botón de inicio de sesión.
 *
 * @returns El componente de barra de navegación
 *
 * @remarks
 * La barra de navegación es estática y siempre visible en la parte superior
 * de la aplicación. El campo de búsqueda está presente pero no implementa
 * funcionalidad de búsqueda aún.
 *
 * @example
 * ```tsx
 * <Navbar />
 * ```
 *
 * @public
 */
const Navbar: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={toolbarSx}>
          {/* Logo a la izquierda */}
          <Box sx={logoBoxSx}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={iconButtonSx}
            >
              <RestaurantIcon />
            </IconButton>
          </Box>

          {/* Iniciar Sesión y Búsqueda a la derecha */}
          <Box sx={actionsBoxSx}>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              sx={loginButtonDesktopSx}
            >
              Iniciar Sesión
            </Button>
            <Search sx={searchSx}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              sx={loginButtonMobileSx}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Separador ondulado */}
      <Box sx={separatorBoxSx}>
        <svg
          width="100%"
          height="24"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <path
            d="M0,12 Q150,2 300,12 T600,12 T900,12 T1200,12 L1200,24 L0,24 Z"
            fill="currentColor"
            opacity={0.1}
          />
          <path
            d="M0,12 Q150,2 300,12 T600,12 T900,12 T1200,12"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity={0.3}
          />
        </svg>
      </Box>
    </>
  );
};

export default Navbar;
