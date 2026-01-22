import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeStore';

/**
 * Store de Redux configurado para la aplicación.
 * Contiene todos los reducers de la aplicación.
 *
 * @public
 */
export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

