import EmojiPicker, { Theme } from 'emoji-picker-react'
import { useTheme } from 'styled-components'
import BasePopover from '../../../../../Popovers/BasePopover'
import type { EmojiPickerProps } from './types'

const EmojiPickerComponent = ({
  isOpen,
  onClose,
  triggerRef,
  onEmojiSelect
}: EmojiPickerProps) => {
  const theme = useTheme()

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    onEmojiSelect(emojiData.emoji)
  }

  const emojiTheme = theme.name === 'light' ? Theme.LIGHT : Theme.DARK

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      position="bottom"
      triggerRef={triggerRef}
    >
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        theme={emojiTheme}
        searchPlaceholder="Buscar emoji..."
        previewConfig={{ showPreview: false }}
        width={320}
        height={400}
      />
    </BasePopover>
  )
}

export default EmojiPickerComponent
