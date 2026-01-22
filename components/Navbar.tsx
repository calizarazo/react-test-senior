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
import MenuIcon from '@mui/icons-material/Menu';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  toolbarSx,
  logoBoxSx,
  iconButtonSx,
  menuButtonSx,
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
 * @param isMobile - Indica si el dispositivo es móvil
 * @param onMenuClick - Función que se ejecuta al hacer clic en el botón del menú
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
 * <Navbar isMobile={true} onMenuClick={handleDrawerToggle} />
 * ```
 *
 * @public
 */
interface NavbarProps {
  isMobile?: boolean;
  onMenuClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMobile = false, onMenuClick }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={toolbarSx}>
          {/* Icono del menú a la izquierda (solo móvil) */}
          {isMobile && onMenuClick && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={menuButtonSx}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Logo centrado */}
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
