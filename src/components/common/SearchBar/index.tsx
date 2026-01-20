import { useState, useRef } from 'react'
import { Search, X } from 'lucide-react'
import SearchPopover from './components/SearchPopover'
import ClearSearchModal from './components/ClearSearchModal'
import type {
  SearchPopoverState,
  SearchHistoryItem,
  SearchSuggestion,
  SearchUserResult
} from './components/SearchPopover/types'
import type { SearchBarProps } from './types'
import * as S from './styles'

const SearchBar = ({ variant = 'large', onFocus }: SearchBarProps) => {
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
      .slice(0, 3)
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
      .slice(0, 3)
  }

  // Determina o estado do Popover
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
    console.log('Buscar:', searchValue)
    // TODO: Implementar busca + adicionar ao histórico
  }

  const handleFocus = () => {
    if (!isClearModalOpen) {
      setIsPopoverOpen(true)
      onFocus?.()
    }
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

  return (
    <>
      <S.SearchBarContainer>
        <S.SearchForm
          ref={searchFormRef}
          onSubmit={handleSearch}
          variant={variant}
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
              onClick={() => setSearchValue('')}
              aria-label="Limpar busca"
            >
              <X size={12} strokeWidth={2} />
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
        variant={variant}
      />

      {/* Modal de Limpar tudo */}
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
