import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '@/types/recipe';
import { recipesApi } from '@/services/api';
import type { RootState } from './store';

/**
 * Estado del store de recetas que contiene los datos y el estado de carga.
 *
 * @public
 */
interface RecipeState {
  /** Lista completa de todas las recetas cargadas */
  recipes: Recipe[];
  /** Lista de recetas filtradas según el filtro de dificultad aplicado */
  filteredRecipes: Recipe[];
  /** Receta actualmente seleccionada para ver en detalle */
  selectedRecipe: Recipe | null;
  /** Indica si hay una petición en curso */
  loading: boolean;
  /** Mensaje de error si ocurrió algún problema */
  error: string | null;
  /** Filtro de dificultad actualmente aplicado */
  difficultyFilter: 'All' | 'Easy' | 'Medium' | 'Hard';
  /** Página actual en la paginación */
  currentPage: number;
  /** Número de elementos por página */
  itemsPerPage: number;
}

/**
 * Estado inicial del store de recetas.
 *
 * @internal
 */
const initialState: RecipeState = {
  recipes: [],
  filteredRecipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
  difficultyFilter: 'All',
  currentPage: 1,
  itemsPerPage: 10,
};

/**
 * Thunk asíncrono para obtener todas las recetas desde la API.
 * Aplica el filtro de dificultad actual después de cargar las recetas.
 *
 * @public
 */
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { getState }) => {
    const response = await recipesApi.getAllRecipes();
    const state = getState() as RootState;
    const { difficultyFilter } = state.recipes;

    // Filter by difficulty if needed
    const filtered =
      difficultyFilter === 'All'
        ? response.recipes
        : response.recipes.filter(
            (recipe) => recipe.difficulty === difficultyFilter
          );

    return {
      recipes: response.recipes,
      filteredRecipes: filtered,
    };
  }
);

/**
 * Thunk asíncrono para obtener una receta específica por su ID.
 *
 * @param id - Identificador de la receta a obtener
 * @public
 */
export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id: number) => {
    const recipe = await recipesApi.getRecipeById(id);
    return recipe;
  }
);

/**
 * Slice de Redux para gestionar el estado de las recetas.
 * Incluye reducers síncronos y maneja los thunks asíncronos.
 *
 * @public
 */
const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    /**
     * Establece el filtro de dificultad y actualiza la lista filtrada.
     *
     * @param state - Estado actual del store
     * @param action - Acción con el nivel de dificultad a filtrar
     */
    setDifficultyFilter: (
      state,
      action: PayloadAction<'All' | 'Easy' | 'Medium' | 'Hard'>
    ) => {
      state.difficultyFilter = action.payload;
      state.currentPage = 1;

      // If recipes are already loaded, filter client-side
      if (state.recipes.length > 0) {
        const filtered =
          action.payload === 'All'
            ? state.recipes
            : state.recipes.filter(
                (recipe) => recipe.difficulty === action.payload
              );
        state.filteredRecipes = filtered;
      }
    },
    /**
     * Establece la página actual en la paginación.
     *
     * @param state - Estado actual del store
     * @param action - Acción con el número de página (basado en 1)
     */
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    /**
     * Limpia el mensaje de error del store.
     *
     * @param state - Estado actual del store
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Limpia la receta seleccionada.
     *
     * @param state - Estado actual del store
     */
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchRecipes cases
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload.recipes;
        state.filteredRecipes = action.payload.filteredRecipes;
        state.currentPage = 1;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Error desconocido al obtener las recetas';
      })
      // fetchRecipeById cases
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Error desconocido al obtener la receta';
      });
  },
});

export const {
  setDifficultyFilter,
  setCurrentPage,
  clearError,
  clearSelectedRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
