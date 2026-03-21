import { useMemo, Fragment, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../styles/globalStyles'

// ============================================
// TYPES
// ============================================

type UseRenderHashtagsProps = {
  content: string
}

// ============================================
// STYLED COMPONENT
// ============================================

const HashtagLink = styled.span`
  color: ${colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

// ============================================
// HOOK
// ============================================

export const useRenderHashtags = ({ content }: UseRenderHashtagsProps) => {
  const navigate = useNavigate()

  return useMemo(() => {
    const hashtagRegex = /#[\w\u00C0-\u017F]+/g
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0
    let match

    // Encontra todas as hashtags e constrói as partes
    while ((match = hashtagRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index))
      }

      const hashtag = match[0]
      const hashtagName = hashtag.slice(1) // Remove o #

      parts.push(
        <HashtagLink
          key={`${match.index}-${hashtag}`}
          onClick={(e) => {
            e.stopPropagation()
            navigate(
              `/explore?q=${encodeURIComponent(hashtagName)}&tab=trending`
            )
          }}
        >
          {hashtag}
        </HashtagLink>
      )

      lastIndex = match.index + hashtag.length
    }

    // Adiciona texto restante após a última hashtag
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    // Sem hashtags — retorna o texto original
    if (parts.length === 0) return content

    return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)
  }, [content, navigate])
}
