import { Repeat, Edit3 } from 'lucide-react'
import BasePopover from '../BasePopover'
import * as S from './styles'
import type { RetweetPopoverProps } from './types'

const RetweetPopover = ({
  isOpen,
  onClose,
  triggerRef,
  isRetweeted,
  onRetweet,
  onQuote
}: RetweetPopoverProps) => {
  const handleRetweet = () => {
    onRetweet()
    onClose()
  }

  const handleQuote = () => {
    onQuote()
    onClose()
  }

  const isSimpleRetweet = isRetweeted

  return (
    <>
      <BasePopover
        isOpen={isOpen}
        onClose={onClose}
        position="bottom-left"
        triggerRef={triggerRef}
      >
        <S.PopoverItem onClick={handleRetweet}>
          <Repeat size={18} />
          {isSimpleRetweet ? 'Desfazer Retweet' : 'Retweet'}
        </S.PopoverItem>

        <S.PopoverItem onClick={handleQuote}>
          <Edit3 size={18} />
          Comentar
        </S.PopoverItem>
      </BasePopover>
    </>
  )
}

export default RetweetPopover
