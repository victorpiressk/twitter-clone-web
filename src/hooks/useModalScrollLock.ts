import { useEffect } from 'react'

// Contador global de modais abertas
let openModalsCount = 0

export const useModalScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Incrementa contador ao abrir
      openModalsCount++

      // Só aplica o lock no primeiro modal
      if (openModalsCount === 1) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth

        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    return () => {
      if (isOpen) {
        // Decrementa contador ao fechar
        openModalsCount--

        // Só remove o lock quando todas as modais fecharem
        if (openModalsCount === 0) {
          document.documentElement.style.overflow = ''
          document.body.style.overflow = 'unset'
          document.body.style.paddingRight = '0px'
        }
      }
    }
  }, [isOpen])
}
