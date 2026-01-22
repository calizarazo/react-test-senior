'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  InputBase,
  Box,
  IconButton,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import { styled, alpha } from '@mui/material/styles';

/**
 * Componente estilizado para el contenedor de búsqueda en la barra de navegación.
 *
 * @internal
 */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

/**
 * Componente estilizado para el wrapper del ícono de búsqueda.
 *
 * @internal
 */
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

/**
 * Componente estilizado para el input de búsqueda.
 *
 * @internal
 */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

/**
 * Componente de barra de navegación principal de la aplicación.
 * Incluye el logo, título, barra de búsqueda y botón de inicio de sesión.
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
        <Toolbar
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            py: { xs: 1.5, sm: 1 },
            gap: { xs: 1.5, sm: 0 },
            justifyContent: 'space-between',
          }}
        >
          {/* Logo a la izquierda */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ mr: 1 }}
            >
              <RestaurantIcon />
            </IconButton>
          </Box>

          {/* Iniciar Sesión y Búsqueda a la derecha */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'center', sm: 'flex-end' },
            }}
          >
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              sx={{ flexShrink: 0, display: { xs: 'none', sm: 'flex' } }}
            >
              Iniciar Sesión
            </Button>
            <Search sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: 200 } }}>
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
              sx={{ flexShrink: 0, display: { xs: 'flex', sm: 'none' } }}
            >
              Iniciar Sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Separador ondulado */}
      <Box
        sx={{
          width: '100%',
          height: '24px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: 'background.default',
        }}
      >
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

