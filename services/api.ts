import axios, { AxiosError } from 'axios';
import { Recipe, RecipesResponse } from '@/types/recipe';

/**
 * URL base de la API de DummyJSON para recetas.
 *
 * @internal
 */
const API_BASE_URL = 'https://dummyjson.com';

/**
 * Cliente HTTP configurado para realizar peticiones a la API de recetas.
 * Utiliza un interceptor para parsear manualmente las respuestas JSON
 * y manejar errores de forma consistente.
 *
 * @internal
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  responseType: 'text', // Get raw text first, then parse manually
  headers: {
    'Accept': 'application/json',
  },
});

/**
 * Interceptor de peticiones HTTP.
 * Actualmente pasa la configuración sin modificaciones.
 *
 * @param config - Configuración de la petición Axios
 * @returns La configuración de la petición sin modificaciones
 * @throws Rechaza la promesa si hay un error en la configuración
 *
 * @internal
 */
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuestas HTTP que maneja el parseo manual de JSON
 * y el manejo de errores de forma consistente.
 *
 * @param response - Respuesta HTTP recibida
 * @returns Respuesta con los datos parseados como objeto JSON
 * @throws Error si la respuesta no es un JSON válido
 *
 * @internal
 */
apiClient.interceptors.response.use(
  (response) => {
    // Parse JSON manually from text response
    if (typeof response.data === 'string') {
      try {
        // Remove any trailing whitespace
        const cleaned = response.data.trim();
        
        // Try to find the end of the JSON object/array
        // Look for the last closing brace or bracket that matches the structure
        let jsonString = cleaned;
        
        // If it starts with '{', find the matching '}'
        if (cleaned.startsWith('{')) {
          let lastBrace = cleaned.lastIndexOf('}');
          if (lastBrace > 0) {
            jsonString = cleaned.substring(0, lastBrace + 1);
          }
        } else if (cleaned.startsWith('[')) {
          let lastBracket = cleaned.lastIndexOf(']');
          if (lastBracket > 0) {
            jsonString = cleaned.substring(0, lastBracket + 1);
          }
        }
        
        response.data = JSON.parse(jsonString);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        console.error('Response data (first 200 chars):', response.data?.substring?.(0, 200) || response.data);
        throw new Error('Error al parsear la respuesta JSON de la API');
      }
    }
    return response;
  },
  /**
   * Maneja errores de la petición HTTP.
   *
   * @param error - Error de Axios que puede ser de diferentes tipos
   * @returns Rechaza la promesa con un mensaje de error descriptivo
   *
   * @internal
   */
  (error: AxiosError) => {
    // Handle JSON parsing errors specifically
    if (error.message && error.message.includes('JSON')) {
      console.error('JSON Parse Error:', error.message);
      return Promise.reject(
        new Error('Error al parsear la respuesta de la API. La respuesta no es JSON válido.')
      );
    }

    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
      
      // Try to extract error message from response
      let errorMessage = 'Error al obtener los datos';
      if (error.response.data) {
        if (typeof error.response.data === 'object' && 'message' in error.response.data) {
          errorMessage = (error.response.data as any).message;
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      }
      
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.request);
      return Promise.reject(new Error('Error de red: No se recibió respuesta del servidor'));
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

/**
 * API cliente para interactuar con el servicio de recetas de DummyJSON.
 * Proporciona métodos para obtener recetas de diferentes formas.
 *
 * @public
 */
export const recipesApi = {
  /**
   * Obtiene todas las recetas disponibles desde la API.
   *
   * @returns Una promesa que se resuelve con la respuesta de la API
   *          que incluye un array de recetas y metadatos de paginación
   * @throws Error si la petición falla o la respuesta es inválida
   *
   * @example
   * ```typescript
   * try {
   *   const response = await recipesApi.getAllRecipes();
   *   console.log(`Total de recetas: ${response.total}`);
   * } catch (error) {
   *   console.error('Error al obtener recetas:', error);
   * }
   * ```
   */
  getAllRecipes: async (): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>('/recipes');
      // Validate response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Respuesta inválida de la API');
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = 
          (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data)
            ? (error.response.data as any).message
            : error.message || 'Error al obtener las recetas';
        throw new Error(errorMessage);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido al obtener las recetas');
    }
  },

  /**
   * Obtiene una receta específica por su identificador.
   *
   * @param id - Identificador numérico único de la receta
   * @returns Una promesa que se resuelve con los datos de la receta
   * @throws Error si la petición falla, la receta no existe o la respuesta es inválida
   *
   * @example
   * ```typescript
   * try {
   *   const recipe = await recipesApi.getRecipeById(1);
   *   console.log(`Receta: ${recipe.name}`);
   * } catch (error) {
   *   console.error('Error al obtener la receta:', error);
   * }
   * ```
   */
  getRecipeById: async (id: number): Promise<Recipe> => {
    try {
      const response = await apiClient.get<Recipe>(`/recipes/${id}`);
      // Validate response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Respuesta inválida de la API');
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = 
          (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data)
            ? (error.response.data as any).message
            : error.message || 'Error al obtener la receta';
        throw new Error(errorMessage);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido al obtener la receta');
    }
  },

  /**
   * Obtiene recetas filtradas por nivel de dificultad.
   *
   * @remarks
   * Nota: La API de DummyJSON puede no soportar el filtrado por dificultad
   * en los parámetros de consulta. Este método se mantiene para uso futuro
   * o actualizaciones de la API.
   *
   * @param difficulty - Nivel de dificultad a filtrar ('Easy', 'Medium' o 'Hard')
   * @returns Una promesa que se resuelve con la respuesta de la API
   *          que incluye un array de recetas filtradas y metadatos de paginación
   * @throws Error si la petición falla o la respuesta es inválida
   *
   * @example
   * ```typescript
   * try {
   *   const response = await recipesApi.getRecipesByDifficulty('Easy');
   *   console.log(`Recetas fáciles: ${response.recipes.length}`);
   * } catch (error) {
   *   console.error('Error al obtener recetas:', error);
   * }
   * ```
   */
  getRecipesByDifficulty: async (
    difficulty: 'Easy' | 'Medium' | 'Hard'
  ): Promise<RecipesResponse> => {
    try {
      const response = await apiClient.get<RecipesResponse>(
        `/recipes?difficulty=${difficulty}`
      );
      // Validate response structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Respuesta inválida de la API');
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = 
          (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data)
            ? (error.response.data as any).message
            : error.message || `Error al obtener recetas de dificultad ${difficulty}`;
        throw new Error(errorMessage);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido al obtener las recetas');
    }
  },
};

