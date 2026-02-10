import type {
  MediaType,
  MediaFile
} from '../components/common/Forms/MediaPreview/types'

// Mapeia extensão → tipo de mídia
export const getMediaType = (file: File): MediaType | null => {
  const extension = file.name.toLowerCase().split('.').pop()

  const typeMap: Record<string, MediaType> = {
    // Imagens
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    webp: 'image',

    // GIFs
    gif: 'gif',

    // Vídeos (futuro)
    mp4: 'video',
    webm: 'video',
    mov: 'video'
  }

  return extension ? typeMap[extension] || null : null
}

// Configuração de limites
export const MEDIA_CONFIG = {
  maxFiles: 4,
  maxSizePerFile: 50 * 1024 * 1024, // 50MB
  maxTotalSize: 200 * 1024 * 1024, // 200MB

  allowedTypes: {
    image: ['.jpg', '.jpeg', '.png', '.webp'],
    gif: ['.gif'],
    video: ['.mp4', '.webm', '.mov']
  }
} as const

// Validação unificada
export const validateMedia = (
  file: File,
  currentMedias: MediaFile[]
): { valid: boolean; error?: string } => {
  // 1. Verifica tipo permitido
  const type = getMediaType(file)
  if (!type) {
    return { valid: false, error: 'Tipo de arquivo não suportado' }
  }

  // 2. Verifica limite de quantidade
  if (currentMedias.length >= MEDIA_CONFIG.maxFiles) {
    return { valid: false, error: `Máximo de ${MEDIA_CONFIG.maxFiles} mídias` }
  }

  // 3. Verifica tamanho individual
  if (file.size > MEDIA_CONFIG.maxSizePerFile) {
    return { valid: false, error: 'Arquivo muito grande (máx 5MB)' }
  }

  // 4. Verifica tamanho total
  const totalSize = currentMedias.reduce((sum, m) => sum + m.file.size, 0)
  if (totalSize + file.size > MEDIA_CONFIG.maxTotalSize) {
    return { valid: false, error: 'Tamanho total excede 20MB' }
  }

  return { valid: true }
}

// Helper para criar MediaFile
export const createMediaFile = (file: File): MediaFile | null => {
  const type = getMediaType(file)
  if (!type) return null

  return {
    file,
    preview: URL.createObjectURL(file),
    id: `${Date.now()}-${Math.random()}`,
    type
  }
}
