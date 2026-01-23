import { createContext, useState, useCallback } from 'react'
import ToastContainer from '../components/common/Toast/ToastContainer'
import type {
  Toast,
  ToastType,
  ToastContextType
} from '../components/common/Toast/types'

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random()}`
      const newToast: Toast = { id, type, message, duration }

      setToasts((prev) => [...prev, newToast])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}
