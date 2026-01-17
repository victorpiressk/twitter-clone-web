import Popover from '../../../Popover'
import type { SearchPopoverProps } from './types'
import * as S from './styles'

const SearchPopover = ({
  isOpen,
  onClose,
  triggerRef,
  state,
  searchHistory,
  onRemoveHistoryItem,
  onOpenClearModal
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
        // TODO: Implementar Estado 3
        return <div>Pesquisando (em breve)</div>

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
