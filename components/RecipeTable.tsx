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
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRecipes, setCurrentPage } from '@/store/recipeStore';
import {
  loadingBoxSx,
  errorAlertSx,
  emptyBoxSx,
  tableContainerSx,
  tableSx,
  tableCellHeaderSx,
  tableRowSx,
  getDifficultyBadgeSx,
} from '@/styles/recipeTableStyles';

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
  const dispatch = useAppDispatch();
  const {
    filteredRecipes,
    loading,
    error,
    currentPage,
    itemsPerPage,
  } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Maneja el cambio de página en la tabla.
   *
   * @param _event - Evento del cambio de página (no utilizado)
   * @param newPage - Nueva página seleccionada (basada en 0)
   */
  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setCurrentPage(newPage + 1)); // Convert from 0-based to 1-based
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
      <Box sx={loadingBoxSx}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={errorAlertSx}>
        {error}
      </Alert>
    );
  }

  if (filteredRecipes.length === 0) {
    return (
      <Box sx={emptyBoxSx}>
        <Typography variant="h6" color="text.secondary">
          No se encontraron recetas
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        className="table-container"
        sx={tableContainerSx}
      >
        <Table sx={tableSx} aria-label="tabla de recetas">
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellHeaderSx}>Nombre</TableCell>
              <TableCell sx={tableCellHeaderSx} align="right">
                Cocina
              </TableCell>
              <TableCell sx={tableCellHeaderSx} align="right">
                Tiempo Preparación (min)
              </TableCell>
              <TableCell sx={tableCellHeaderSx} align="right">
                Tiempo Cocción (min)
              </TableCell>
              <TableCell sx={tableCellHeaderSx} align="right">
                Raciones
              </TableCell>
              <TableCell sx={tableCellHeaderSx} align="right">
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
                sx={tableRowSx}
              >
                <TableCell component="th" scope="row">
                  {recipe.name}
                </TableCell>
                <TableCell align="right">{recipe.cuisine}</TableCell>
                <TableCell align="right">{recipe.prepTimeMinutes}</TableCell>
                <TableCell align="right">{recipe.cookTimeMinutes}</TableCell>
                <TableCell align="right">{recipe.servings}</TableCell>
                <TableCell align="right">
                  <Box component="span" sx={getDifficultyBadgeSx(recipe.difficulty)}>
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
