'use client';

import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/store/recipeStore';

/**
 * Componente que muestra una tabla paginada con todas las recetas disponibles.
 * Permite navegar a los detalles de una receta haciendo clic en una fila.
 *
 * @returns El componente de tabla de recetas con paginación
 *
 * @remarks
 * El componente maneja automáticamente:
 * - La carga de recetas al montarse
 * - Estados de carga y error
 * - Paginación de resultados
 * - Navegación a detalles de receta
 *
 * @example
 * ```tsx
 * <RecipeTable />
 * ```
 *
 * @public
 */
const RecipeTable: React.FC = () => {
  const router = useRouter();
  const {
    filteredRecipes,
    loading,
    error,
    currentPage,
    itemsPerPage,
    fetchRecipes,
    setCurrentPage,
  } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Maneja el cambio de página en la tabla.
   *
   * @param _event - Evento del cambio de página (no utilizado)
   * @param newPage - Nueva página seleccionada (basada en 0)
   */
  const handleChangePage = (_event: unknown, newPage: number) => {
    setCurrentPage(newPage + 1); // Convert from 0-based to 1-based
  };

  /**
   * Maneja el clic en una fila de la tabla para navegar a los detalles de la receta.
   *
   * @param recipeId - Identificador de la receta a visualizar
   */
  const handleRowClick = (recipeId: number) => {
    router.push(`/recipe/${recipeId}`);
  };

  const paginatedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron recetas
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de recetas">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Cocina
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Tiempo Preparación (min)
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Tiempo Cocción (min)
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Raciones
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Dificultad
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRecipes.map((recipe) => (
              <TableRow
                key={recipe.id}
                hover
                onClick={() => handleRowClick(recipe.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {recipe.name}
                </TableCell>
                <TableCell align="right">{recipe.cuisine}</TableCell>
                <TableCell align="right">{recipe.prepTimeMinutes}</TableCell>
                <TableCell align="right">{recipe.cookTimeMinutes}</TableCell>
                <TableCell align="right">{recipe.servings}</TableCell>
                <TableCell align="right">
                  <Box
                    component="span"
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor:
                        recipe.difficulty === 'Easy'
                          ? 'success.light'
                          : recipe.difficulty === 'Medium'
                          ? 'warning.light'
                          : 'error.light',
                      color:
                        recipe.difficulty === 'Easy'
                          ? 'success.contrastText'
                          : recipe.difficulty === 'Medium'
                          ? 'warning.contrastText'
                          : 'error.contrastText',
                      fontWeight: 'bold',
                    }}
                  >
                    {recipe.difficulty}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredRecipes.length}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
        labelRowsPerPage=""
      />
    </>
  );
};

export default RecipeTable;

