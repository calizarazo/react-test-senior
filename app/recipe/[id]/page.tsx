'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRecipeById } from '@/store/recipeStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  recipeDetailPageLayoutSx,
  recipeDetailLoadingBoxSx,
  recipeDetailContainerSx,
  recipeDetailErrorAlertSx,
  recipeDetailBackButtonSx,
  recipeDetailBackButtonMainSx,
  recipeDetailPaperSx,
  recipeDetailChipsWrapperSx,
  recipeDetailRatingSectionSx,
  recipeDetailRatingBoxSx,
  recipeDetailDividerSx,
  recipeDetailTagsWrapperSx,
} from '@/styles/recipeDetailStyles';

/**
 * Página de detalle de una receta específica.
 * Muestra información completa de la receta incluyendo ingredientes,
 * instrucciones, valoración y etiquetas.
 *
 * @returns El componente de la página de detalle de receta
 *
 * @remarks
 * La página:
 * - Obtiene el ID de la receta desde los parámetros de la URL
 * - Carga automáticamente los datos de la receta al montarse
 * - Muestra estados de carga y error apropiados
 * - Permite volver a la lista de recetas
 *
 * @example
 * ```tsx
 * // Se renderiza automáticamente en rutas como "/recipe/1", "/recipe/2", etc.
 * ```
 *
 * @public
 */
export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const recipeId = parseInt(params.id as string, 10);
  const { selectedRecipe, loading, error } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
    }
  }, [recipeId, dispatch]);

  /**
   * Maneja la navegación de vuelta a la página principal.
   */
  const handleBack = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <Box sx={recipeDetailPageLayoutSx}>
        <Navbar />
        <Box sx={recipeDetailLoadingBoxSx}>
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={recipeDetailPageLayoutSx}>
        <Navbar />
        <Container maxWidth="lg" sx={recipeDetailContainerSx}>
          <Alert severity="error" sx={recipeDetailErrorAlertSx}>
            {error}
          </Alert>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Volver a la lista
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (!selectedRecipe) {
    return (
      <Box sx={recipeDetailPageLayoutSx}>
        <Navbar />
        <Container maxWidth="lg" sx={recipeDetailContainerSx}>
          <Typography variant="h6" color="text.secondary">
            Receta no encontrada
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={recipeDetailBackButtonSx}
          >
            Volver a la lista
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={recipeDetailPageLayoutSx}>
      <Navbar />
      <Container maxWidth="lg" sx={recipeDetailContainerSx}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={recipeDetailBackButtonMainSx}
        >
          Volver a la lista
        </Button>

        <Paper elevation={3} sx={recipeDetailPaperSx}>
          <Typography variant="h4" component="h1" gutterBottom>
            {selectedRecipe.name}
          </Typography>

          <Box sx={recipeDetailChipsWrapperSx}>
            <Chip label={selectedRecipe.cuisine} color="primary" />
            <Chip
              label={selectedRecipe.difficulty}
              color={
                selectedRecipe.difficulty === 'Easy'
                  ? 'success'
                  : selectedRecipe.difficulty === 'Medium'
                    ? 'warning'
                    : 'error'
              }
            />
            <Chip label={`${selectedRecipe.servings} raciones`} />
            <Chip
              label={`${selectedRecipe.prepTimeMinutes + selectedRecipe.cookTimeMinutes} min total`}
            />
          </Box>

          <Box sx={recipeDetailRatingSectionSx}>
            <Typography variant="h6" gutterBottom>
              Valoración
            </Typography>
            <Box sx={recipeDetailRatingBoxSx}>
              <Rating
                value={selectedRecipe.rating}
                precision={0.1}
                readOnly
                size="large"
              />
              <Typography variant="body1">
                {selectedRecipe.rating} ({selectedRecipe.reviewCount} reseñas)
              </Typography>
            </Box>
          </Box>

          <Divider sx={recipeDetailDividerSx} />

          <Typography variant="h6" gutterBottom>
            Ingredientes
          </Typography>
          <List>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListItemText primary={`• ${ingredient}`} />
              </ListItem>
            ))}
          </List>

          <Divider sx={recipeDetailDividerSx} />

          <Typography variant="h6" gutterBottom>
            Instrucciones
          </Typography>
          <List>
            {selectedRecipe.instructions.map((instruction, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${index + 1}. ${instruction}`}
                  primaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            ))}
          </List>

          {selectedRecipe.tags && selectedRecipe.tags.length > 0 && (
            <>
              <Divider sx={recipeDetailDividerSx} />
              <Typography variant="h6" gutterBottom>
                Etiquetas
              </Typography>
              <Box sx={recipeDetailTagsWrapperSx}>
                {selectedRecipe.tags.map((tag, index) => (
                  <Chip key={index} label={tag} variant="outlined" />
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
