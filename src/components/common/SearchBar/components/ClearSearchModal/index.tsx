import Modal from '../../../Modal'
import Button from '../../../Button'
import * as S from './styles'

type ClearSearchModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ClearSearchModal = ({
  isOpen,
  onClose,
  onConfirm
}: ClearSearchModalProps) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small" showOverlay={true}>
      <S.ModalContent>
        <S.Title>Apagar todas as buscas recentes?</S.Title>
        <S.Description>
          Não será possível desfazer essa ação, e você removerá todas as suas
          buscas recentes.
        </S.Description>

        <S.Actions>
          <Button type="button" variant="danger" onClick={handleConfirm}>
            Limpar
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </S.Actions>
      </S.ModalContent>
    </Modal>
  )
}

export default ClearSearchModal
