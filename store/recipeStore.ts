import { create } from 'zustand';
import { Recipe } from '@/types/recipe';
import { recipesApi } from '@/services/api';

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
 * Acciones disponibles en el store de recetas.
 *
 * @public
 */
interface RecipeActions {
  /**
   * Obtiene todas las recetas desde la API y aplica el filtro de dificultad actual.
   */
  fetchRecipes: () => Promise<void>;
  /**
   * Obtiene una receta específica por su ID.
   *
   * @param id - Identificador de la receta a obtener
   */
  fetchRecipeById: (id: number) => Promise<void>;
  /**
   * Establece el filtro de dificultad y actualiza la lista filtrada.
   *
   * @param difficulty - Nivel de dificultad a filtrar
   */
  setDifficultyFilter: (difficulty: 'All' | 'Easy' | 'Medium' | 'Hard') => void;
  /**
   * Establece la página actual en la paginación.
   *
   * @param page - Número de página (basado en 1)
   */
  setCurrentPage: (page: number) => void;
  /** Limpia el mensaje de error del store */
  clearError: () => void;
  /** Limpia la receta seleccionada */
  clearSelectedRecipe: () => void;
}

/**
 * Store completo de recetas que combina estado y acciones.
 *
 * @public
 */
type RecipeStore = RecipeState & RecipeActions;

/**
 * Hook de Zustand para acceder al store de recetas.
 * Proporciona estado global y acciones para gestionar recetas en la aplicación.
 *
 * @returns El store de recetas con estado y acciones
 *
 * @example
 * ```typescript
 * const { recipes, loading, fetchRecipes } = useRecipeStore();
 *
 * useEffect(() => {
 *   fetchRecipes();
 * }, []);
 * ```
 *
 * @public
 */
export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  selectedRecipe: null,
  loading: false,
  error: null,
  difficultyFilter: 'All',
  currentPage: 1,
  itemsPerPage: 10,

  /**
   * @internal
   */
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

  /**
   * @internal
   */
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

  /**
   * @internal
   */
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

  /**
   * @internal
   */
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  /**
   * @internal
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * @internal
   */
  clearSelectedRecipe: () => {
    set({ selectedRecipe: null });
  },
}));

