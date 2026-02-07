import { useCallback } from 'react'
import Modal from '../BaseModal'
import ContentForm from '../../Forms/BaseForm'
import PostFormActions from '../../Forms/FormActions'
import { useFormModal } from '../../../../hooks/useFormModal'
import type { FormModalProps } from './types'
import * as S from './styles'

const FormModal = ({
  isOpen,
  onClose,
  userName,
  userAvatar,
  placeholder = 'O que está acontecendo?',
  submitLabel = 'Postar',
  successMessage,
  errorMessage,
  extraContent,
  mode,
  onSubmit,
  maxLength = 280,
  modalSize = 'medium'
}: FormModalProps) => {
  // Hook centralizado com toda a lógica
  const formState = useFormModal({
    successMessage,
    errorMessage,
    onSubmit
  })

  // Handler de fechamento (limpa estado + fecha modal)
  const handleClose = useCallback(() => {
    formState.handleClose()
    onClose()
  }, [formState, onClose])

  // Handler de submit bem-sucedido (fecha modal)
  const handleSubmitSuccess = useCallback(async () => {
    await formState.handleSubmit()

    // Só fecha se o submit foi bem-sucedido
    // (formState.handleSubmit já gerencia erro internamente)
    if (!formState.isSubmitting) {
      onClose()
    }
  }, [formState, onClose])

  // Footer com actions
  const footer = (
    <S.FooterContainer>
      <PostFormActions
        content={formState.content}
        images={formState.images}
        isDisabled={formState.isDisabled}
        maxLength={maxLength}
        onImageUpload={formState.handleImageUpload}
        onSubmit={handleSubmitSuccess}
        loading={formState.isSubmitting}
        submitLabel={submitLabel}
      />
    </S.FooterContainer>
  )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={modalSize}
      showOverlay
      showCloseButton
      header={<div />}
      footer={footer}
    >
      <S.ModalContent>
        <S.FormContainer>
          <ContentForm
            userName={userName}
            userAvatar={userAvatar}
            content={formState.content}
            images={formState.images}
            onContentChange={formState.handleContentChange}
            onImagesChange={formState.handleImagesChange}
            onRemoveImage={formState.handleRemoveImage}
            placeholder={placeholder}
            maxLength={maxLength}
            extraContent={extraContent}
            isModal
            disabled={formState.isSubmitting}
            mode={mode}
          />
        </S.FormContainer>
      </S.ModalContent>
    </Modal>
  )
}

export default FormModal
