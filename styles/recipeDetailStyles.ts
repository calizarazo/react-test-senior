import type { SxProps, Theme } from '@mui/material/styles';

export const recipeDetailPageLayoutSx: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export const recipeDetailLoadingBoxSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  minHeight: '400px',
};

export const recipeDetailContainerSx: SxProps<Theme> = {
  py: 4,
  flex: 1,
};

export const recipeDetailErrorAlertSx: SxProps<Theme> = {
  mb: 2,
};

export const recipeDetailBackButtonSx: SxProps<Theme> = {
  mt: 2,
};

export const recipeDetailBackButtonMainSx: SxProps<Theme> = {
  mb: 3,
};

export const recipeDetailPaperSx: SxProps<Theme> = {
  p: 4,
};

export const recipeDetailChipsWrapperSx: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  mb: 3,
  flexWrap: 'wrap',
};

export const recipeDetailRatingSectionSx: SxProps<Theme> = {
  mb: 3,
};

export const recipeDetailRatingBoxSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const recipeDetailDividerSx: SxProps<Theme> = {
  my: 3,
};

export const recipeDetailTagsWrapperSx: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap',
};

