import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import type { ToastProps } from './types'
import * as S from './styles'

const Toast = ({ toast, onClose }: ToastProps) => {
  const [isClosing, setIsClosing] = useState(false)

  // Memoriza o handleClose com useCallback
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      onClose(toast.id)
    }, 300)
  }, [toast.id, onClose])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, toast.duration || 3000)

    return () => clearTimeout(timer)
  }, [toast.duration, handleClose])

  return (
    <S.ToastItem
      $type={toast.type}
      $isClosing={isClosing}
      onClick={handleClose}
    >
      <S.ToastMessage>{toast.message}</S.ToastMessage>
      <S.CloseButton onClick={handleClose} aria-label="Fechar">
        <X size={18} strokeWidth={2} />
      </S.CloseButton>
    </S.ToastItem>
  )
}

export default Toast
