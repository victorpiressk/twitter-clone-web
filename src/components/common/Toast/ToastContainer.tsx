import styled from 'styled-components'
import Toast from './index'
import type { Toast as ToastType } from './types'

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`

type ToastContainerProps = {
  toasts: ToastType[]
  onClose: (id: string) => void
}

const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  return (
    <Container>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </Container>
  )
}

export default ToastContainer
