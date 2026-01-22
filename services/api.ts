import axios, { AxiosError } from 'axios';
import { Recipe, RecipesResponse } from '@/types/recipe';

const API_BASE_URL = 'https://dummyjson.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  responseType: 'text', // Get raw text first, then parse manually
  headers: {
    'Accept': 'application/json',
  },
});

// Request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
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

export const recipesApi = {
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

  // Note: DummyJSON API may not support filtering by difficulty in query params
  // This method is kept for potential future use or API updates
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

