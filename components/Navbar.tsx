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
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <RestaurantIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Recetas del Mundo
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar recetas…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button
          color="inherit"
          startIcon={<LoginIcon />}
          sx={{ ml: 2 }}
        >
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

