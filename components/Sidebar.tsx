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
import {
  getDrawerContentSx,
  sidebarTitleSx,
  listItemButtonSx,
  getTemporaryDrawerSx,
  getPermanentDrawerSx,
} from '@/styles/sidebarStyles';

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
    <Box sx={getDrawerContentSx(drawerWidth)}>
      <Typography variant="h6" sx={sidebarTitleSx}>
        Filtrar por Dificultad
      </Typography>
      <Divider />
      <List>
        {difficulties.map((difficulty) => (
          <ListItem key={difficulty} disablePadding>
            <ListItemButton
              selected={difficultyFilter === difficulty}
              onClick={() => handleFilterChange(difficulty)}
              sx={listItemButtonSx}
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
          keepMounted: true,
        }}
        sx={getTemporaryDrawerSx(drawerWidth)}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={getPermanentDrawerSx(drawerWidth)}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
