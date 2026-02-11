type DateVariant = 'feed' | 'detail' | 'joined' | 'full'

export const formatDate = (
  dateString: string | null,
  variant: DateVariant = 'feed'
): string => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()

  // Tratamento para evitar quebra de fuso horário em datas "puras" (YYYY-MM-DD)
  // Usado na variante 'joined' e 'full' para manter a consistência local
  const safeDate = dateString.includes('T')
    ? date
    : new Date(dateString.replace(/-/g, '/'))

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
      const month = safeDate.toLocaleDateString('pt-BR', { month: 'long' })
      const year = safeDate.getFullYear()
      // Capitaliza a primeira letra do mês (ex: "janeiro" -> "Janeiro")
      return `${month.charAt(0).toUpperCase() + month.slice(1)} de ${year}`
    }

    case 'full': {
      return safeDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }

    default:
      return date.toLocaleDateString('pt-BR')
  }
}
