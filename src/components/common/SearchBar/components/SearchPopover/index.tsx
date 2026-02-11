import { Search, User, X } from 'lucide-react'
import BasePopover from '../../../Popovers/BasePopover'
import Avatar from '../../../Avatar'
import type { SearchPopoverProps } from './types'
import * as S from './styles'

const SearchPopover = ({
  isOpen,
  onClose,
  triggerRef,
  state,
  searchHistory,
  onRemoveHistoryItem,
  onOpenClearModal,
  searchSuggestions = [],
  searchResults = [],
  variant
}: SearchPopoverProps) => {
  const renderContent = () => {
    switch (state) {
      case 'empty':
        return (
          <S.PopoverContainer
            $variant={variant === 'large' ? 'large' : 'small'}
          >
            <S.EmptyMessage>
              Tente buscar por pessoas, listas ou palavras-chave
            </S.EmptyMessage>
          </S.PopoverContainer>
        )

      case 'history':
        return (
          <>
            <S.PopoverContainer
              $variant={variant === 'large' ? 'large' : 'small'}
            >
              <S.HistoryHeader>
                <S.HistoryTitle>Recente</S.HistoryTitle>
                <S.ClearAllButton onClick={onOpenClearModal}>
                  Limpar tudo
                </S.ClearAllButton>
              </S.HistoryHeader>

              <S.HistoryList>
                {searchHistory.map((item) => (
                  <S.HistoryItem
                    key={item.id}
                    onClick={() => console.log('Click item:', item)}
                  >
                    <S.HistoryIcon>
                      {item.type === 'search' ? (
                        <Search size={18} strokeWidth={2} />
                      ) : (
                        <User size={18} strokeWidth={2} />
                      )}
                    </S.HistoryIcon>

                    <S.HistoryText>
                      <S.HistoryMainText>{item.text}</S.HistoryMainText>
                      {item.username && (
                        <S.HistorySubText>@{item.username}</S.HistorySubText>
                      )}
                    </S.HistoryText>

                    <S.RemoveButton
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveHistoryItem(item.id)
                      }}
                      aria-label="Remover"
                    >
                      <X size={16} strokeWidth={2} />
                    </S.RemoveButton>
                  </S.HistoryItem>
                ))}
              </S.HistoryList>
            </S.PopoverContainer>
          </>
        )

      case 'searching':
        return (
          <S.PopoverContainer
            $variant={variant === 'large' ? 'large' : 'small'}
          >
            <S.SearchingSection>
              {/* Sugestões de busca */}
              {searchSuggestions.length > 0 && (
                <>
                  {searchSuggestions.map((suggestion) => (
                    <S.SuggestionItem
                      key={suggestion.id}
                      onClick={() => console.log('Buscar:', suggestion.text)}
                    >
                      <S.SuggestionIcon>
                        <Search size={18} strokeWidth={2} />
                      </S.SuggestionIcon>
                      <S.SuggestionText>{suggestion.text}</S.SuggestionText>
                    </S.SuggestionItem>
                  ))}

                  {searchResults.length > 0 && <S.Divider />}
                </>
              )}

              {/* Resultados de usuários */}
              {searchResults.map((user) => (
                <S.UserResultItem
                  key={user.id}
                  onClick={() => console.log('Ir para perfil:', user.username)}
                >
                  <Avatar src={user.avatar} alt={user.firstName} size="small" />

                  <S.UserResultInfo>
                    <S.UserResultName>{user.firstName}</S.UserResultName>
                    <S.UserResultUsername>
                      @{user.username}
                    </S.UserResultUsername>
                    {user.bio && <S.UserResultBio>{user.bio}</S.UserResultBio>}
                  </S.UserResultInfo>
                </S.UserResultItem>
              ))}

              {/* Se não houver resultados */}
              {searchSuggestions.length === 0 && searchResults.length === 0 && (
                <S.EmptyMessage>
                  Tente buscar por pessoas, listas ou palavras-chave
                </S.EmptyMessage>
              )}
            </S.SearchingSection>
          </S.PopoverContainer>
        )

      default:
        return null
    }
  }

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      position="bottom"
      matchTriggerWidth={false}
      strategy="fixed"
    >
      {renderContent()}
    </BasePopover>
  )
}

export default SearchPopover
