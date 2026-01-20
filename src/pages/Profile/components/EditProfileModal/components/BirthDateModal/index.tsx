import { useState } from 'react'
import Modal from '../../../../../../components/common/Modal'
import Button from '../../../../../../components/common/Button'
import Input from '../../../../../../components/common/Input'
import type { BirthDateModalProps } from './types'
import * as S from './styles'

const BirthDateModal = ({
  isOpen,
  onClose,
  currentBirthDate,
  onSave,
  editCount
}: BirthDateModalProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [birthDate, setBirthDate] = useState(currentBirthDate)

  const MAX_EDITS = 3 // Twitter permite 3 edições

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onSave(birthDate)
    setIsEditing(false)
    onClose()
  }

  const handleCancel = () => {
    setBirthDate(currentBirthDate) // Reseta
    setIsEditing(false)
    onClose()
  }

  const remainingEdits = MAX_EDITS - editCount

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="small" showOverlay>
      <S.ModalContent>
        {!isEditing ? (
          <>
            <S.Title>Editar a data de nascimento?</S.Title>
            <S.Description>
              Isso só pode ser alterado algumas vezes. Informe a idade da pessoa
              que usa a conta.
            </S.Description>

            {remainingEdits > 0 && (
              <S.Warning>
                {remainingEdits === 1
                  ? 'Esta é sua última alteração disponível'
                  : `Você pode alterar ${remainingEdits} vezes`}
              </S.Warning>
            )}

            <S.Actions>
              <Button
                type="button"
                variant="secondary"
                onClick={handleEdit}
                disabled={remainingEdits === 0}
              >
                Editar
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </S.Actions>
          </>
        ) : (
          <>
            <S.Title>Editar data de nascimento</S.Title>

            <S.DateInputContainer>
              <Input
                name="birthDate"
                label="Data de nascimento"
                type="date"
                value={birthDate}
                onChange={(value) => setBirthDate(value)}
              />
            </S.DateInputContainer>

            <S.Actions>
              <Button type="button" variant="secondary" onClick={handleSave}>
                Salvar
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </S.Actions>
          </>
        )}
      </S.ModalContent>
    </Modal>
  )
}

export default BirthDateModal
