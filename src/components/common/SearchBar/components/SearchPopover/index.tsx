import Popover from '../../../Popover'
import type { SearchPopoverProps } from './types'
import * as S from './styles'
import Avatar from '../../../Avatar'

const SearchPopover = ({
  isOpen,
  onClose,
  triggerRef,
  state,
  searchHistory,
  onRemoveHistoryItem,
  onOpenClearModal,
  searchSuggestions = [],
  searchResults = []
}: SearchPopoverProps) => {
  const renderContent = () => {
    switch (state) {
      case 'empty':
        return (
          <S.PopoverContainer>
            <S.EmptyMessage>
              Tente buscar por pessoas, listas ou palavras-chave
            </S.EmptyMessage>
          </S.PopoverContainer>
        )

      case 'history':
        return (
          <>
            <S.PopoverContainer>
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
                      {item.type === 'search' ? '🔍' : '👤'}
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
                      <svg viewBox="0 0 24 24">
                        <g>
                          <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                        </g>
                      </svg>
                    </S.RemoveButton>
                  </S.HistoryItem>
                ))}
              </S.HistoryList>
            </S.PopoverContainer>
          </>
        )

      case 'searching':
        return (
          <S.PopoverContainer>
            <S.SearchingSection>
              {/* Sugestões de busca */}
              {searchSuggestions.length > 0 && (
                <>
                  {searchSuggestions.map((suggestion) => (
                    <S.SuggestionItem
                      key={suggestion.id}
                      onClick={() => console.log('Buscar:', suggestion.text)}
                    >
                      <S.SuggestionIcon>🔍</S.SuggestionIcon>
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
                  <Avatar
                    src={user.avatar}
                    alt={user.displayName}
                    size="medium"
                  />

                  <S.UserResultInfo>
                    <S.UserResultName>{user.displayName}</S.UserResultName>
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
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      position="bottom-left"
      matchTriggerWidth={true}
    >
      {renderContent()}
    </Popover>
  )
}

export default SearchPopover
