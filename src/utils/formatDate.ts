type DateVariant = 'feed' | 'detail' | 'joined' | 'full'

export const formatDate = (
  dateString?: string,
  variant: DateVariant = 'feed'
): string => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()

  // Sempre usar safeDate para evitar problemas de timezone
  // Para datas no formato YYYY-MM-DD, cria Date em UTC e converte para local
  const safeDate = dateString.includes('T')
    ? date
    : new Date(dateString + 'T00:00:00') // Força UTC, não local

  switch (variant) {
    case 'feed': {
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 1) return 'agora'
      if (diffMins < 60) return `${diffMins}min`
      if (diffHours < 24) return `${diffHours}h`
      if (diffDays < 7) return `${diffDays}d`

      return date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short'
      })
    }

    case 'detail': {
      const time = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
      const fullDate = date.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
      return `${time} · ${fullDate}`
    }

    case 'joined': {
      const month = safeDate.toLocaleDateString('pt-BR', {
        month: 'long',
        timeZone: 'UTC'
      })
      const year = safeDate.getUTCFullYear()
      return `${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`
    }

    case 'full': {
      return safeDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      })
    }

    default:
      return date.toLocaleDateString('pt-BR')
  }
}
