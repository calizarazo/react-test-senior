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
import { useRecipeStore } from '@/store/recipeStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = parseInt(params.id as string, 10);
  const { selectedRecipe, loading, error, fetchRecipeById } = useRecipeStore();

  useEffect(() => {
    if (recipeId) {
      fetchRecipeById(recipeId);
    }
  }, [recipeId, fetchRecipeById]);

  const handleBack = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            minHeight: '400px',
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
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
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
          <Typography variant="h6" color="text.secondary">
            Receta no encontrada
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Volver a la lista
          </Button>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Volver a la lista
        </Button>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {selectedRecipe.name}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
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

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Valoración
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

          <Divider sx={{ my: 3 }} />

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

          <Divider sx={{ my: 3 }} />

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
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Etiquetas
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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

