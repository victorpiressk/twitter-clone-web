import Popover from '../../../Popover'
import type { SearchPopoverProps } from './types'
import * as S from './styles'

const SearchPopover = ({
  isOpen,
  onClose,
  triggerRef,
  state
  //searchValue
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
        // TODO: Implementar Estado 2
        return <div>Histórico (em breve)</div>

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
      position="bottom"
      matchTriggerWidth={true}
    >
      {renderContent()}
    </Popover>
  )
}

export default SearchPopover
