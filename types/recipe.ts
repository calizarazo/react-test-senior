/**
 * Representa una receta culinaria con toda su información detallada.
 *
 * @public
 */
export interface Recipe {
  /** Identificador único de la receta */
  id: number;
  /** Nombre de la receta */
  name: string;
  /** Lista de ingredientes necesarios para la receta */
  ingredients: string[];
  /** Lista de instrucciones paso a paso para preparar la receta */
  instructions: string[];
  /** Tiempo de preparación en minutos */
  prepTimeMinutes: number;
  /** Tiempo de cocción en minutos */
  cookTimeMinutes: number;
  /** Número de raciones que produce la receta */
  servings: number;
  /** Nivel de dificultad de la receta */
  difficulty: 'Easy' | 'Medium' | 'Hard';
  /** Tipo de cocina o región culinaria */
  cuisine: string;
  /** Calorías por ración */
  caloriesPerServing: number;
  /** Etiquetas o categorías asociadas a la receta */
  tags: string[];
  /** Identificador del usuario que creó la receta */
  userId: number;
  /** URL de la imagen de la receta */
  image: string;
  /** Calificación promedio de la receta (0-5) */
  rating: number;
  /** Número total de reseñas recibidas */
  reviewCount: number;
  /** Tipos de comida (desayuno, almuerzo, cena, etc.) */
  mealType: string[];
}

/**
 * Respuesta de la API que contiene una lista paginada de recetas.
 *
 * @public
 */
export interface RecipesResponse {
  /** Array de recetas devueltas por la API */
  recipes: Recipe[];
  /** Número total de recetas disponibles */
  total: number;
  /** Número de recetas omitidas (para paginación) */
  skip: number;
  /** Número máximo de recetas por página */
  limit: number;
}

