import { useState, useRef } from 'react'
import SearchPopover from './components/SearchPopover'
import ClearSearchModal from './components/ClearSearchModal'
import type {
  SearchPopoverState,
  SearchHistoryItem,
  SearchSuggestion,
  SearchUserResult
} from './components/SearchPopover/types'
import * as S from './styles'

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)
  const searchFormRef = useRef<HTMLFormElement>(null)

  // Mock histórico (depois vem do localStorage/API)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
    { id: '1', type: 'search', text: 'react hooks' },
    { id: '2', type: 'search', text: 'typescript' },
    { id: '3', type: 'user', text: 'Victor Pires', username: 'victor' }
  ])

  // Mock dados para busca (depois vem da API)
  const allSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'react' },
    { id: '2', text: 'react hooks' },
    { id: '3', text: 'react native' },
    { id: '4', text: 'typescript' },
    { id: '5', text: 'javascript' }
  ]

  const allUsers: SearchUserResult[] = [
    {
      id: '1',
      displayName: 'React Brasil',
      username: 'reactbrasil',
      bio: 'Comunidade brasileira de React'
    },
    {
      id: '2',
      displayName: 'React Community',
      username: 'reactjs',
      bio: 'Official React community'
    },
    {
      id: '3',
      displayName: 'TypeScript',
      username: 'typescript',
      bio: 'TypeScript is a superset of JavaScript'
    },
    {
      id: '4',
      displayName: 'Victor Pires',
      username: 'victor',
      bio: 'Desenvolvedor Full Stack'
    }
  ]

  // Filtra sugestões baseado no searchValue
  const getFilteredSuggestions = (): SearchSuggestion[] => {
    if (!searchValue.trim()) return []
    return allSuggestions
      .filter((s) => s.text.toLowerCase().includes(searchValue.toLowerCase()))
      .slice(0, 3) // Máximo 3 sugestões
  }

  // Filtra usuários baseado no searchValue
  const getFilteredUsers = (): SearchUserResult[] => {
    if (!searchValue.trim()) return []
    return allUsers
      .filter(
        (u) =>
          u.displayName.toLowerCase().includes(searchValue.toLowerCase()) ||
          u.username.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(0, 3) // Máximo 3 usuários
  }

  // Determina o estado do Popover
  const getPopoverState = (): SearchPopoverState => {
    if (searchValue.trim()) {
      return 'searching' // Estado 3
    }
    if (searchHistory.length > 0) {
      return 'history' // Estado 2
    }
    return 'empty' // Estado 1
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Buscar:', searchValue)
    // TODO: Implementar busca + adicionar ao histórico
  }

  const handleFocus = () => {
    if (!isClearModalOpen) {
      setIsPopoverOpen(true)
    }
  }

  const handleRemoveHistoryItem = (id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearHistory = () => {
    setSearchHistory([])
  }

  const handleOpenClearModal = () => {
    setIsPopoverOpen(false) // Fecha o Popover
    setIsClearModalOpen(true) // Abre a Modal
  }

  return (
    <>
      <S.SearchBarContainer>
        <S.SearchForm ref={searchFormRef} onSubmit={handleSearch}>
          <S.SearchIcon>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
              </g>
            </svg>
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
              onClick={() => setSearchValue('')}
              aria-label="Limpar busca"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                </g>
              </svg>
            </S.ClearButton>
          )}
        </S.SearchForm>
      </S.SearchBarContainer>

      {/* Popover de busca */}
      <SearchPopover
        isOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
        triggerRef={searchFormRef}
        state={getPopoverState()}
        searchHistory={searchHistory}
        onRemoveHistoryItem={handleRemoveHistoryItem}
        onClearHistory={handleClearHistory}
        onOpenClearModal={handleOpenClearModal}
        searchSuggestions={getFilteredSuggestions()}
        searchResults={getFilteredUsers()}
      />
      {/* Modal de Limpar tudo */}
      <ClearSearchModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={() => {
          handleClearHistory()
          setIsClearModalOpen(false) // Garante que fecha após confirmar
        }}
      />
    </>
  )
}

export default SearchBar
