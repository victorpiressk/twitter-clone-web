import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  useFloating,
  autoUpdate,
  offset as floatingOffset,
  flip,
  shift,
  size,
  type Placement
} from '@floating-ui/react'
import type { ExtendedPopoverProps } from './types'
import * as S from './styles'

const BasePopover = ({
  isOpen,
  onClose,
  children,
  triggerRef,
  position = 'top-right',
  offset = 8,
  variant,
  matchTriggerWidth = false,
  strategy = 'absolute'
}: ExtendedPopoverProps) => {
  const getPlacement = (pos: string): Placement => {
    const map: Record<string, Placement> = {
      top: 'top',
      'top-right': 'top-start',
      'top-left': 'top-end',
      bottom: 'bottom',
      'bottom-left': 'bottom-end',
      'bottom-right': 'bottom-start'
    }
    return map[pos] || 'top-start'
  }

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) onClose()
    },
    placement: getPlacement(position),
    strategy: strategy,
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(offset),
      flip({
        fallbackPlacements: ['top', 'bottom', 'left', 'right']
      }),
      shift({ padding: 8 }),
      matchTriggerWidth &&
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`
            })
          }
        })
    ].filter(Boolean)
  })

  // Desestruture setFloating FORA do JSX
  const { setFloating } = refs

  // Sync triggerRef com refs.setReference
  useEffect(() => {
    if (triggerRef.current) {
      refs.setReference(triggerRef.current)
    }
  }, [triggerRef, refs])

  // Fecha ao clicar fora
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const floating = refs.floating.current
      const reference = triggerRef.current

      if (
        floating &&
        !floating.contains(e.target as Node) &&
        reference &&
        !reference.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, triggerRef, refs])

  // Fecha com ESC
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <S.PopoverContainer
      ref={setFloating} // Variável desestruturada
      style={floatingStyles}
      $variant={variant}
    >
      <S.PopoverContent>{children}</S.PopoverContent>
    </S.PopoverContainer>,
    document.body
  )
}

export default BasePopover
