import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Hook tipado para usar dispatch de Redux.
 * Proporciona autocompletado y type safety para las acciones.
 *
 * @returns Función dispatch tipada
 *
 * @example
 * ```typescript
 * const dispatch = useAppDispatch();
 * dispatch(fetchRecipes());
 * ```
 *
 * @public
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook tipado para usar selector de Redux.
 * Proporciona autocompletado y type safety para el estado.
 *
 * @returns Función selector tipada
 *
 * @example
 * ```typescript
 * const recipes = useAppSelector((state) => state.recipes.recipes);
 * ```
 *
 * @public
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

