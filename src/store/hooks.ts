// src/store/hooks.ts
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook
} from 'react-redux'
import type { RootState } from './index'
import type { AppDispatch } from './index'

// ============================================
// TYPED HOOKS
// ============================================

/**
 * Hook tipado para useDispatch
 * Uso: const dispatch = useAppDispatch()
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

/**
 * Hook tipado para useSelector
 * Uso: const user = useAppSelector((state) => state.auth.user)
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
