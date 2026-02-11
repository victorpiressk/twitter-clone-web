import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import SearchPopover from './components/SearchPopover'
import ClearSearchModal from './components/ClearSearchModal'
import type { UserCard } from '../../../models'
import type {
  SearchPopoverState,
  SearchHistoryItem,
  SearchSuggestion
} from './components/SearchPopover/types'
import type { SearchBarProps } from './types'
import * as S from './styles'

const SearchBar = ({
  variant = 'large',
  onFocus,
  value: externalValue = '',
  onSearch
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isClearModalOpen, setIsClearModalOpen] = useState(false)
  const searchFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setSearchValue(externalValue)
  }, [externalValue])

  // ✅ Mock histórico
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
    { id: '1', type: 'search', text: 'react hooks' },
    { id: '2', type: 'search', text: 'typescript' },
    { id: '3', type: 'user', text: 'Victor Pires', username: 'victor' }
  ])

  // ✅ Mock sugestões de busca
  const allSuggestions: SearchSuggestion[] = [
    { id: '1', text: 'react' },
    { id: '2', text: 'react hooks' },
    { id: '3', text: 'react native' },
    { id: '4', text: 'typescript' },
    { id: '5', text: 'javascript' }
  ]

  // ✅ CORREÇÃO: Tipo correto UserCard
  const allUsers: UserCard[] = [
    {
      id: 1,
      username: 'reactbrasil',
      firstName: 'React',
      lastName: 'Brasil',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Comunidade brasileira de React',
      isFollowing: false
    },
    {
      id: 2,
      username: 'reactjs',
      firstName: 'React',
      lastName: 'Community',
      avatar: 'https://i.pravatar.cc/150?img=2',
      bio: 'Official React community',
      isFollowing: false
    },
    {
      id: 3,
      username: 'typescript',
      firstName: 'TypeScript',
      lastName: '',
      avatar: 'https://i.pravatar.cc/150?img=3',
      bio: 'TypeScript is a superset of JavaScript',
      isFollowing: true
    },
    {
      id: 4,
      username: 'victor',
      firstName: 'Victor',
      lastName: 'Pires',
      avatar: 'https://i.pravatar.cc/150?img=4',
      bio: 'Desenvolvedor Full Stack',
      isFollowing: false
    }
  ]

  const getFilteredSuggestions = (): SearchSuggestion[] => {
    if (!searchValue.trim()) return []
    return allSuggestions
      .filter((s) => s.text.toLowerCase().includes(searchValue.toLowerCase()))
      .slice(0, 3)
  }

  // ✅ CORREÇÃO: Retorna UserCard[]
  const getFilteredUsers = (): UserCard[] => {
    if (!searchValue.trim()) return []
    return allUsers
      .filter((u) => {
        const fullName = `${u.firstName} ${u.lastName}`.toLowerCase()
        const query = searchValue.toLowerCase()
        return (
          fullName.includes(query) || u.username.toLowerCase().includes(query)
        )
      })
      .slice(0, 3)
  }

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
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue.trim())
    }
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
              onClick={() => setSearchValue('')}
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
        searchSuggestions={getFilteredSuggestions()}
        searchResults={getFilteredUsers()}
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
