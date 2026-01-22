import type { SxProps, Theme } from '@mui/material/styles';

export const pageLayoutSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export const contentWrapperSx: SxProps<Theme> = {
  display: 'flex',
  flex: 1,
  position: 'relative',
};

export const menuButtonSx: SxProps<Theme> = {
  position: 'fixed',
  top: 16,
  left: 16,
  zIndex: 0,
  backgroundColor: 'background.paper',
  marginLeft: 5,
  boxShadow: 2,
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

export const getMainBoxSx = (drawerWidth: number): SxProps<Theme> => ({
  flexGrow: 1,
  p: 3,
  width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
});

export const titleWrapperSx: SxProps<Theme> = {
  textAlign: 'center',
  mb: 4,
};

export const titleSx: SxProps<Theme> = {
  fontWeight: 'bold',
  mb: 3,
};

