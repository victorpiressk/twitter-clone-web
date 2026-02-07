import { useContext } from 'react'
import PostContext from '../contexts/PostContext'

export const usePost = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error('usePost deve ser usado dentro de PostProvider')
  }

  return context
}
