import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { PopoverProps } from './types'
import * as S from './styles'

const Popover = ({
  isOpen,
  onClose,
  children,
  triggerRef,
  position = 'top-right',
  offset = 8
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ top: 0, left: 0 })

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current?.getBoundingClientRect()

      let top = 0
      let left = 0

      if (popoverRect) {
        switch (position) {
          case 'top-right':
            top = triggerRect.bottom - popoverRect.height
            left = triggerRect.left
            break
          case 'bottom-left':
            top = triggerRect.bottom + offset
            left = triggerRect.left - popoverRect.width + triggerRect.width
            break
          default:
            top = triggerRect.bottom - popoverRect.height
            left = triggerRect.left
        }

        if (top < 0) top = triggerRect.bottom + offset
        if (left < 0) left = 0
        if (left + popoverRect.width > window.innerWidth) {
          left = window.innerWidth - popoverRect.width - offset
        }

        // SOLUÇÃO: Só atualiza o estado se os valores realmente mudarem.
        // Isso interrompe a renderização em cascata (cascading renders).
        setCoords((prev) => {
          if (prev.top === top && prev.left === left) return prev
          return { top, left }
        })
      }
    }
  }, [isOpen, triggerRef, position, offset])

  // Fecha ao clicar fora (Mantido seu original)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, triggerRef])

  // Fecha com ESC (Restaurado)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <S.PopoverContainer ref={popoverRef} $top={coords.top} $left={coords.left}>
      <S.PopoverContent>{children}</S.PopoverContent>
    </S.PopoverContainer>,
    document.body
  )
}

export default Popover
