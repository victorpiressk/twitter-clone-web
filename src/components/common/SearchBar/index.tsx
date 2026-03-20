import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useGlobalSearchQuery } from '../../../store/slices/api/search.api'
import SearchPopover from './components/SearchPopover'
import ClearSearchModal from './components/ClearSearchModal'
import type {
  SearchPopoverState,
  SearchHistoryItem
} from './components/SearchPopover/types'
import type { SearchBarProps } from './types'
import * as S from './styles'

const SearchBar = ({
  variant = 'large',
  onFocus,
  value: externalValue = '',
  onSearch,
  sticky = false
}: SearchBarProps) => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)
  const searchFormRef = useRef<HTMLFormElement>(null)

  // ✅ NOVO: Debounce (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchValue.trim())
    }, 500)

    return () => clearTimeout(timer)
  }, [searchValue])

  useEffect(() => {
    setSearchValue(externalValue)
  }, [externalValue])

  // busca com múltiplas palavras:
  const queries = debouncedQuery.trim().split(/\s+/) // Split por espaços
  const mainQuery = queries[0] // Primeira palavra

  const { data: searchData, isLoading } = useGlobalSearchQuery(
    { q: mainQuery, limit: 10 }, // ← Busca só primeira palavra, mais resultados
    { skip: !mainQuery || mainQuery.length < 2 }
  )

  // ✅ FILTRAR no frontend (se tiver múltiplas palavras):
  const filteredResults = useMemo(() => {
    if (!searchData || queries.length === 1) return searchData

    const searchTerms = queries.map((q) => q.toLowerCase())

    return {
      users: searchData.users.filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
        const username = user.username.toLowerCase()

        // Todas as palavras devem estar no nome OU username
        return searchTerms.every(
          (term) => fullName.includes(term) || username.includes(term)
        )
      }),
      posts: searchData.posts.filter((post) => {
        const content = post.content.toLowerCase()
        return searchTerms.every((term) => content.includes(term))
      }),
      hashtags: searchData.hashtags // Hashtags não precisam filtrar
    }
  }, [searchData, queries])

  // ✅ NOVO: Histórico no localStorage
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(
    () => {
      const saved = localStorage.getItem('searchHistory')
      return saved ? JSON.parse(saved) : []
    }
  )

  // ✅ Salvar no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }, [searchHistory])

  const getPopoverState = (): SearchPopoverState => {
    if (searchValue.trim()) {
      return 'searching'
    }
    if (searchHistory.length > 0) {
      return 'history'
    }
    return 'empty'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = searchValue.trim()

    if (query) {
      // Adicionar ao histórico
      addToHistory({ type: 'search', text: query })

      // Navegar para página de resultados ou callback
      if (onSearch) {
        onSearch(query)
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`)
      }

      setIsPopoverOpen(false)
    }
  }

  const handleFocus = () => {
    if (!isClearModalOpen) {
      setIsPopoverOpen(true)
      onFocus?.()
    }
  }

  const addToHistory = (item: {
    type: 'search' | 'user'
    text: string
    username?: string
  }) => {
    setSearchHistory((prev) => {
      // Remove duplicados
      const filtered = prev.filter(
        (h) => h.type === item.type && h.text !== item.text
      )

      // Adiciona no topo, máximo 10 itens
      return [{ id: Date.now().toString(), ...item }, ...filtered].slice(0, 10)
    })
  }

  const handleRemoveHistoryItem = (id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearHistory = () => {
    setSearchHistory([])
  }

  const handleOpenClearModal = () => {
    setIsPopoverOpen(false)
    setIsClearModalOpen(true)
  }

  const handleUserClick = (username: string, displayName: string) => {
    // Adicionar ao histórico
    addToHistory({
      type: 'user',
      text: displayName,
      username
    })

    // Navegar para perfil
    navigate(`/${username}`)
    setIsPopoverOpen(false)
    setSearchValue('')
  }

  const handleSuggestionClick = (text: string) => {
    setSearchValue(text)
    setDebouncedQuery(text)
    addToHistory({ type: 'search', text })
  }

  const handlePostClick = (postId: number, username: string) => {
    navigate(`/${username}/status/${postId}`)
    setIsPopoverOpen(false)
    setSearchValue('')
  }

  // ✅ NOVO: Handler para hashtags
  const handleHashtagClick = (hashtagName: string) => {
    // Navega para Explore com query
    navigate(`/explore?q=${encodeURIComponent(hashtagName)}&tab=trending`)
    setIsPopoverOpen(false)
    setSearchValue('')
  }

  return (
    <>
      <S.SearchBarContainer $sticky={sticky}>
        <S.SearchForm
          ref={searchFormRef}
          onSubmit={handleSearch}
          $variant={variant}
        >
          <S.SearchIcon>
            <Search size={16} strokeWidth={2} />
          </S.SearchIcon>

          <S.SearchInput
            type="text"
            placeholder="Buscar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={handleFocus}
          />

          {searchValue && (
            <S.ClearButton
              type="button"
              onClick={() => {
                setSearchValue('')
                setDebouncedQuery('')
              }}
              aria-label="Limpar busca"
            >
              <X size={12} strokeWidth={2} />
            </S.ClearButton>
          )}
        </S.SearchForm>
      </S.SearchBarContainer>

      <SearchPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        triggerRef={searchFormRef}
        state={getPopoverState()}
        searchHistory={searchHistory}
        onRemoveHistoryItem={handleRemoveHistoryItem}
        onClearHistory={handleClearHistory}
        onOpenClearModal={handleOpenClearModal}
        searchResults={{
          users: filteredResults?.users || [],
          posts: filteredResults?.posts || [],
          hashtags: filteredResults?.hashtags || []
        }}
        onUserClick={handleUserClick}
        onSuggestionClick={handleSuggestionClick}
        onPostClick={handlePostClick}
        onHashtagClick={handleHashtagClick}
        isLoading={isLoading}
        variant={variant}
      />

      <ClearSearchModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={() => {
          handleClearHistory()
          setIsClearModalOpen(false)
        }}
      />
    </>
  )
}

export default SearchBar
