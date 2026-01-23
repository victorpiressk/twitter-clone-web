export type ToastType = 'success' | 'error' | 'info' | 'warning'

export type Toast = {
  id: string
  type: ToastType
  message: string
  duration?: number // ms (default: 3000)
}

export type ToastProps = {
  toast: Toast
  onClose: (id: string) => void
}

export type ToastContextType = {
  showToast: (type: ToastType, message: string, duration?: number) => void
}
