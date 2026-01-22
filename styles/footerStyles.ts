import type { SxProps, Theme } from '@mui/material/styles';

export const footerSx: SxProps<Theme> = {
  py: 3,
  px: 2,
  mt: 'auto',
  backgroundColor: (theme: Theme) =>
    theme.palette.mode === 'light'
      ? theme.palette.grey[200]
      : theme.palette.grey[800],
};

