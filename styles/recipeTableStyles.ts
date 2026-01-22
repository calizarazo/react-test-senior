import type { SxProps, Theme } from '@mui/material/styles';

export const loadingBoxSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px',
};

export const errorAlertSx: SxProps<Theme> = {
  mb: 2,
};

export const emptyBoxSx: SxProps<Theme> = {
  textAlign: 'center',
  py: 4,
};

export const tableContainerSx: SxProps<Theme> = {
  mb: 2,
  overflowX: 'auto',
  width: { xs: '100%', sm: '100%', md: '100%' },
  marginLeft: { xs: 0, sm: 'auto', md: 0 },
};

export const tableSx: SxProps<Theme> = {
  minWidth: 650,
};

export const tableCellHeaderSx: SxProps<Theme> = {
  fontWeight: 'bold',
};

export const tableRowSx: SxProps<Theme> = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

/**
 * Retorna los estilos del badge de dificultad según el nivel.
 */
export const getDifficultyBadgeSx = (
  difficulty: string
): SxProps<Theme> => ({
  px: 1,
  py: 0.5,
  borderRadius: 1,
  backgroundColor:
    difficulty === 'Easy'
      ? 'success.light'
      : difficulty === 'Medium'
        ? 'warning.light'
        : 'error.light',
  color:
    difficulty === 'Easy'
      ? 'success.contrastText'
      : difficulty === 'Medium'
        ? 'warning.contrastText'
        : 'error.contrastText',
  fontWeight: 'bold',
});

