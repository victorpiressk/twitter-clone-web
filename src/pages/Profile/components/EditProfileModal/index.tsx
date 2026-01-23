import { useState, useRef } from 'react'
import { Camera, ChevronRight, Trash2 } from 'lucide-react'
import Modal from '../../../../components/common/Modal'
import Button from '../../../../components/common/Button'
import Input from '../../../../components/common/Input'
import BirthDateModal from './components/BirthDateModal'
import { useToast } from '../../../../hooks/useToast'
import type { EditProfileModalProps, EditProfileFormData } from './types'
import * as S from './styles'

const EditProfileModal = ({
  isOpen,
  onClose,
  onSave,
  currentData
}: EditProfileModalProps) => {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<EditProfileFormData>({
    displayName: currentData.displayName,
    bio: currentData.bio,
    location: currentData.location,
    website: currentData.website,
    birthDate: currentData.birthDate,
    profileImage: null,
    bannerImage: null
  })

  const [profileImagePreview, setProfileImagePreview] = useState<
    string | undefined
  >(currentData.avatar)
  const [bannerImagePreview, setBannerImagePreview] = useState<
    string | undefined
  >(currentData.banner)

  const [isBirthDateModalOpen, setIsBirthDateModalOpen] = useState(false)
  const [birthDateEditCount, setBirthDateEditCount] = useState(0)

  const profileImageInputRef = useRef<HTMLInputElement>(null)
  const bannerImageInputRef = useRef<HTMLInputElement>(null)

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }))
      setProfileImagePreview(URL.createObjectURL(file))
    }
  }

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, bannerImage: file }))
      setBannerImagePreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveBanner = () => {
    setFormData((prev) => ({ ...prev, bannerImage: null }))
    setBannerImagePreview(undefined)
  }

  const handleSaveBirthDate = (newDate: string) => {
    setFormData((prev) => ({ ...prev, birthDate: newDate }))
    setBirthDateEditCount((prev) => prev + 1) // Incrementa contador
  }

  const formatBirthDate = (dateString?: string): string => {
    if (!dateString) return 'Não informado'

    // Separa a string sem conversão de timezone
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day) // Cria data local

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSave(formData)
      showToast('success', 'Perfil atualizado com sucesso!')
      onClose()
    } catch {
      showToast('error', 'Erro ao atualizar perfil. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasChanges =
    formData.displayName !== currentData.displayName ||
    formData.bio !== currentData.bio ||
    formData.location !== currentData.location ||
    formData.website !== currentData.website ||
    formData.birthDate !== currentData.birthDate ||
    formData.profileImage !== null ||
    formData.bannerImage !== null

  // Footer com botão Salvar
  const footer = (
    <S.FooterContent>
      <Button
        type="button"
        variant="primary"
        onClick={handleSubmit}
        disabled={!hasChanges}
        loading={isSubmitting}
      >
        Salvar
      </Button>
    </S.FooterContent>
  )

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="medium"
        showOverlay
        showCloseButton
        title="Editar perfil"
        header={<div />} // ← Usa ModalHeader padrão com title
        footer={footer}
      >
        <S.FormContainer onSubmit={handleSubmit}>
          {/* Banner */}
          <S.BannerSection>
            {bannerImagePreview && (
              <S.BannerImage src={bannerImagePreview} alt="Banner" />
            )}
            <S.BannerOverlay>
              <S.ImageButton
                type="button"
                onClick={() => bannerImageInputRef.current?.click()}
              >
                <Camera size={20} />
              </S.ImageButton>
              {bannerImagePreview && (
                <S.ImageButton type="button" onClick={handleRemoveBanner}>
                  <Trash2 size={20} />
                </S.ImageButton>
              )}
            </S.BannerOverlay>
          </S.BannerSection>

          {/* Profile Image */}
          <S.ProfileImageSection>
            <S.ProfileImageWrapper>
              {profileImagePreview && (
                <S.ProfileImage src={profileImagePreview} alt="Profile" />
              )}
              <S.ProfileImageOverlay
                onClick={() => profileImageInputRef.current?.click()}
              >
                <Camera size={20} color="white" />
              </S.ProfileImageOverlay>
            </S.ProfileImageWrapper>
          </S.ProfileImageSection>

          {/* Form Fields */}
          <S.FormFields>
            <Input
              name="displayName"
              label="Nome"
              value={formData.displayName}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, displayName: value }))
              }
              maxLength={50}
            />

            <Input
              name="bio"
              label="Bio"
              value={formData.bio}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, bio: value }))
              }
              maxLength={160}
              multiline
              rows={3}
            />

            <Input
              name="location"
              label="Localização"
              value={formData.location}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, location: value }))
              }
              maxLength={30}
            />

            <Input
              name="website"
              label="Website"
              type="url"
              value={formData.website}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, website: value }))
              }
              maxLength={100}
            />

            {/* Campo Data de Nascimento */}
            <S.BirthDateField onClick={() => setIsBirthDateModalOpen(true)}>
              <S.BirthDateInfo>
                <S.BirthDateLabel>Data de nascimento</S.BirthDateLabel>
                <S.BirthDateValue>
                  {formatBirthDate(formData.birthDate)}
                </S.BirthDateValue>
              </S.BirthDateInfo>
              <S.ChevronIcon>
                <ChevronRight size={20} strokeWidth={2} />
              </S.ChevronIcon>
            </S.BirthDateField>
          </S.FormFields>

          {/* Hidden File Inputs */}
          <S.HiddenInput
            ref={profileImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          <S.HiddenInput
            ref={bannerImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleBannerImageChange}
          />
        </S.FormContainer>
      </Modal>

      {/* Modal de Data de Nascimento */}
      <BirthDateModal
        isOpen={isBirthDateModalOpen}
        onClose={() => setIsBirthDateModalOpen(false)}
        currentBirthDate={formData.birthDate || ''}
        onSave={handleSaveBirthDate}
        editCount={birthDateEditCount}
      />
    </>
  )
}

export default EditProfileModal
