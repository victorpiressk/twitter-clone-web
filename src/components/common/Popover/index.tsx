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
  offset = 8,
  variant,
  matchTriggerWidth = false
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current?.getBoundingClientRect()

      let top = 0
      let left = 0
      const width = matchTriggerWidth ? triggerRect.width : 0

      // Dentro do seu useLayoutEffect...
      if (popoverRect) {
        switch (position) {
          case 'top-right':
            // 1. Abre para cima escondendo o botão (alinhado à esquerda do trigger)
            top = triggerRect.bottom - popoverRect.height
            left = triggerRect.left
            break

          case 'top':
            // 2. Abre para cima, centralizado, sem esconder o botão
            top = triggerRect.top - popoverRect.height - offset
            left =
              triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
            break

          case 'bottom':
            // 3. Abre para baixo, centralizado com o botão
            top = triggerRect.bottom + offset
            left =
              triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2
            break

          case 'bottom-left':
            // Mantendo o seu cálculo original para este se desejar
            top = triggerRect.bottom + offset
            left = triggerRect.left - popoverRect.width + triggerRect.width
            break

          default:
            // Fallback para o comportamento que você mais usa
            top = triggerRect.bottom - popoverRect.height
            left = triggerRect.left
        }

        // Seus ajustes de colisão (Mantidos exatamente iguais)
        if (top < 0) top = triggerRect.bottom + offset
        if (left < 0) left = 0
        if (left + popoverRect.width > window.innerWidth) {
          left = window.innerWidth - popoverRect.width - offset
        }

        setCoords((prev) => {
          if (prev.top === top && prev.left === left && prev.width) return prev
          return { top, left, width }
        })
      }
    }
  }, [isOpen, triggerRef, position, offset, matchTriggerWidth])

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
    <S.PopoverContainer
      $variant={variant}
      ref={popoverRef}
      $top={coords.top}
      $left={coords.left}
      $width={coords.width}
    >
      <S.PopoverContent>{children}</S.PopoverContent>
    </S.PopoverContainer>,
    document.body
  )
}

export default Popover
