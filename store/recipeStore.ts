import { create } from 'zustand';
import { Recipe } from '@/types/recipe';
import { recipesApi } from '@/services/api';

interface RecipeState {
  recipes: Recipe[];
  filteredRecipes: Recipe[];
  selectedRecipe: Recipe | null;
  loading: boolean;
  error: string | null;
  difficultyFilter: 'All' | 'Easy' | 'Medium' | 'Hard';
  currentPage: number;
  itemsPerPage: number;
}

interface RecipeActions {
  fetchRecipes: () => Promise<void>;
  fetchRecipeById: (id: number) => Promise<void>;
  setDifficultyFilter: (difficulty: 'All' | 'Easy' | 'Medium' | 'Hard') => void;
  setCurrentPage: (page: number) => void;
  clearError: () => void;
  clearSelectedRecipe: () => void;
}

type RecipeStore = RecipeState & RecipeActions;

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
  difficultyFilter: 'All',
  currentPage: 1,
  itemsPerPage: 10,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      // Always fetch all recipes, then filter client-side
      const response = await recipesApi.getAllRecipes();
      const { difficultyFilter } = get();

      // Filter by difficulty if needed
      const filtered =
        difficultyFilter === 'All'
          ? response.recipes
          : response.recipes.filter(
              (recipe) => recipe.difficulty === difficultyFilter
            );

      set({
        recipes: response.recipes,
        filteredRecipes: filtered,
        loading: false,
        currentPage: 1,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error desconocido',
        loading: false,
      });
    }
  },

  fetchRecipeById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const recipe = await recipesApi.getRecipeById(id);
      set({ selectedRecipe: recipe, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Error desconocido',
        loading: false,
      });
    }
  },

  setDifficultyFilter: (difficulty: 'All' | 'Easy' | 'Medium' | 'Hard') => {
    const { recipes } = get();
    set({ difficultyFilter: difficulty, currentPage: 1 });

    // If recipes are already loaded, filter client-side
    if (recipes.length > 0) {
      const filtered =
        difficulty === 'All'
          ? recipes
          : recipes.filter((recipe) => recipe.difficulty === difficulty);
      set({ filteredRecipes: filtered });
    } else {
      // Otherwise, fetch recipes (which will apply the filter)
      get().fetchRecipes();
    }
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  clearError: () => {
    set({ error: null });
  },

  clearSelectedRecipe: () => {
    set({ selectedRecipe: null });
  },
}));

