import type { PostMedia } from '../models'

/**
 * Cria objeto de mídia a partir de arquivo
 * (sem validação - backend valida)
 */
export const createMediaFile = (file: File): PostMedia => {
  const id = Math.random().toString(36).substring(7)
  const preview = URL.createObjectURL(file)

  let type: 'image' | 'video' | 'gif' = 'image'
  if (file.type.startsWith('video/')) {
    type = 'video'
  } else if (file.type === 'image/gif') {
    type = 'gif'
  }

  return {
    id,
    type,
    url: preview, // Preview temporário (Data URL)
    order: 0,
    // @ts-expect-error - file será anexado no FormData depois
    _file: file // Guardar referência ao File original
  }
}

/**
 * Mock de validação (sempre válido - backend valida)
 * Mantém assinatura para compatibilidade com código existente
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
export const validateMedia = (
  _file: File,
  _currentMedias: PostMedia[]
): { valid: true } => {
  return { valid: true }
}
/**
 * Cleanup de previews
 */
export const revokeMediaPreviews = (medias: PostMedia[]): void => {
  medias.forEach((media) => {
    if (media.url.startsWith('blob:')) {
      URL.revokeObjectURL(media.url)
    }
  })
}

/**
 * Formata tamanho de arquivo (para UI)
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
