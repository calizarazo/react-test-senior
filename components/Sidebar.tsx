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

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, drawerWidth }) => {
  const { difficultyFilter, setDifficultyFilter } = useRecipeStore();

  const difficulties: Array<'All' | 'Easy' | 'Medium' | 'Hard'> = [
    'All',
    'Easy',
    'Medium',
    'Hard',
  ];

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

