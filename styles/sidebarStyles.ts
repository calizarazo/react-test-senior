import type { SxProps, Theme } from '@mui/material/styles';

export const getDrawerContentSx = (drawerWidth: number): SxProps<Theme> => ({
  width: drawerWidth,
  pt: 2,
});

export const sidebarTitleSx: SxProps<Theme> = {
  px: 2,
  mb: 1,
  fontWeight: 'bold',
};

export const listItemButtonSx: SxProps<Theme> = {
  '&.Mui-selected': {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
};

export const getTemporaryDrawerSx = (drawerWidth: number): SxProps<Theme> => ({
  display: { xs: 'block', md: 'none' },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
  },
});

export const getPermanentDrawerSx = (drawerWidth: number): SxProps<Theme> => ({
  display: { xs: 'none', md: 'block' },
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    position: 'relative',
    height: '100%',
  },
});

