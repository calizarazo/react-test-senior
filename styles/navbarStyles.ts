import { InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';

/**
 * Componente estilizado para el contenedor de búsqueda en la barra de navegación.
 */
export const Search = styled('div')(({ theme }) => ({
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
 */
export const SearchIconWrapper = styled('div')(({ theme }) => ({
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
 */
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

export const toolbarSx: SxProps<Theme> = {
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'stretch', sm: 'center' },
  py: { xs: 1.5, sm: 1 },
  gap: { xs: 1.5, sm: 0 },
  justifyContent: 'space-between',
};

export const logoBoxSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  width: { xs: '100%', sm: 'auto' },
  justifyContent: { xs: 'center', sm: 'flex-start' },
};

export const iconButtonSx: SxProps<Theme> = {
  mr: 1,
};

export const actionsBoxSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  width: { xs: '100%', sm: 'auto' },
  justifyContent: { xs: 'center', sm: 'flex-end' },
};

export const loginButtonDesktopSx: SxProps<Theme> = {
  flexShrink: 0,
  display: { xs: 'none', sm: 'flex' },
};

export const searchSx: SxProps<Theme> = {
  width: { xs: '100%', sm: 'auto' },
  minWidth: { sm: 200 },
};

export const loginButtonMobileSx: SxProps<Theme> = {
  flexShrink: 0,
  display: { xs: 'flex', sm: 'none' },
};

export const separatorBoxSx: SxProps<Theme> = {
  width: '100%',
  height: '24px',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'background.default',
};

