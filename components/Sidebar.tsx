'use client';

import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useRecipeStore } from '@/store/recipeStore';

/**
 * Propiedades del componente Sidebar.
 *
 * @public
 */
interface SidebarProps {
  /** Indica si el sidebar está abierto (para móviles) */
  open: boolean;
  /** Función callback que se ejecuta cuando se cierra el sidebar */
  onClose: () => void;
  /** Ancho del drawer en píxeles */
  drawerWidth: number;
}

/**
 * Componente de barra lateral que permite filtrar recetas por dificultad.
 * Se muestra como un drawer permanente en desktop y temporal en móviles.
 *
 * @param props - Propiedades del componente
 * @param props.open - Estado de apertura del drawer (móviles)
 * @param props.onClose - Callback para cerrar el drawer
 * @param props.drawerWidth - Ancho del drawer
 * @returns El componente de barra lateral con filtros
 *
 * @remarks
 * El componente se adapta automáticamente:
 * - En móviles: drawer temporal que se abre/cierra
 * - En desktop: drawer permanente siempre visible
 *
 * @example
 * ```tsx
 * <Sidebar
 *   open={mobileOpen}
 *   onClose={handleDrawerToggle}
 *   drawerWidth={240}
 * />
 * ```
 *
 * @public
 */
const Sidebar: React.FC<SidebarProps> = ({ open, onClose, drawerWidth }) => {
  const { difficultyFilter, setDifficultyFilter } = useRecipeStore();

  const difficulties: Array<'All' | 'Easy' | 'Medium' | 'Hard'> = [
    'All',
    'Easy',
    'Medium',
    'Hard',
  ];

  /**
   * Maneja el cambio de filtro de dificultad.
   *
   * @param difficulty - Nivel de dificultad seleccionado
   */
  const handleFilterChange = (difficulty: 'All' | 'Easy' | 'Medium' | 'Hard') => {
    setDifficultyFilter(difficulty);
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, pt: 2 }}>
      <Typography variant="h6" sx={{ px: 2, mb: 1, fontWeight: 'bold' }}>
        Filtrar por Dificultad
      </Typography>
      <Divider />
      <List>
        {difficulties.map((difficulty) => (
          <ListItem key={difficulty} disablePadding>
            <ListItemButton
              selected={difficultyFilter === difficulty}
              onClick={() => handleFilterChange(difficulty)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemText primary={difficulty === 'All' ? 'Todas' : difficulty} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'relative',
            height: '100%',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

