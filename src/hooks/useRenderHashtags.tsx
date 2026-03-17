import { useMemo, Fragment, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../styles/globalStyles'

type UseRenderHashtagsProps = {
  content: string
}

export const useRenderHashtags = ({ content }: UseRenderHashtagsProps) => {
  const navigate = useNavigate()

  return useMemo(() => {
    const hashtagRegex = /#[\w\u00C0-\u017F]+/g
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0
    let match

    // Encontrar todas as hashtags
    while ((match = hashtagRegex.exec(content)) !== null) {
      // Adicionar texto antes da hashtag
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index))
      }

      // Adicionar hashtag como link
      const hashtag = match[0]
      const hashtagName = hashtag.slice(1) // Remove #

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

    // Adicionar texto restante
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    // Se não tem hashtags, retorna texto original
    if (parts.length === 0) {
      return content
    }

    // Retorna array de elementos
    return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>)
  }, [content, navigate])
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
