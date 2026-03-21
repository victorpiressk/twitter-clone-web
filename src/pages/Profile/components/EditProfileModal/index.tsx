import { useState, useRef, useMemo } from 'react'
import { Camera, ChevronRight, Trash2 } from 'lucide-react'
import Button from '../../../../components/common/Button'
import Input from '../../../../components/common/Input'
import Modal from '../../../../components/common/Modals/BaseModal'
import { useToast } from '../../../../hooks/useToast'
import { formatDate } from '../../../../utils/formatDate'
import BirthDateModal from './components/BirthDateModal'
import * as S from './styles'
import type { EditProfileModalProps } from './types'
import type { User } from '../../../../types/domain/models'

// Garante que a URL tenha protocolo
const ensureProtocol = (url: string): string => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

// Divide nome completo em firstName e lastName
const splitFullName = (
  fullName: string
): { firstName: string; lastName: string } => {
  const trimmed = fullName.trim()
  if (!trimmed) {
    return { firstName: '', lastName: '' }
  }

  const parts = trimmed.split(' ')

  if (parts.length === 1) {
    // Só tem um nome
    return { firstName: parts[0], lastName: '' }
  }

  // Primeiro nome + resto vira lastName
  const firstName = parts[0]
  const lastName = parts.slice(1).join(' ')

  return { firstName, lastName }
}

// Combina firstName e lastName em nome completo
const getFullName = (firstName: string, lastName: string): string => {
  return [firstName, lastName].filter(Boolean).join(' ')
}

const EditProfileModal = ({
  isOpen,
  onClose,
  onSave,
  currentData
}: EditProfileModalProps) => {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState<User>(currentData)

  const [displayName, setDisplayName] = useState(
    getFullName(currentData.firstName, currentData.lastName)
  )

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null)
  const [removeBanner, setRemoveBanner] = useState(false)

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    currentData.avatar
  )
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(
    currentData.banner
  )

  const [isBirthDateModalOpen, setIsBirthDateModalOpen] = useState(false)
  const [birthDateEditCount, setBirthDateEditCount] = useState(0)

  const profileImageInputRef = useRef<HTMLInputElement>(null)
  const bannerImageInputRef = useRef<HTMLInputElement>(null)

  // Atualiza formData quando displayName muda
  const handleDisplayNameChange = (value: string) => {
    setDisplayName(value)

    const { firstName, lastName } = splitFullName(value)
    setFormData((prev) => ({
      ...prev,
      firstName,
      lastName
    }))
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImageFile(file)
      setProfileImagePreview(URL.createObjectURL(file))
    }
  }

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerImageFile(file)
      setRemoveBanner(false)
      setBannerImagePreview(URL.createObjectURL(file))
    }
  }

  const handleRemoveBanner = () => {
    setBannerImageFile(null)
    setRemoveBanner(true)
    setBannerImagePreview(null)
  }

  const handleSaveBirthDate = (newDate: string) => {
    setFormData((prev) => ({ ...prev, birthDate: newDate }))
    setBirthDateEditCount((prev) => prev + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSave({
        ...formData,
        website: formData.website ? ensureProtocol(formData.website) : '',
        avatar: profileImageFile || formData.avatar,
        banner: removeBanner ? null : bannerImageFile || formData.banner
      })

      showToast('success', 'Perfil atualizado com sucesso!')
      onClose()
    } catch {
      showToast('error', 'Erro ao atualizar perfil. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Verifica mudanças com displayName
  const hasChanges = useMemo(() => {
    const currentFullName = getFullName(
      currentData.firstName,
      currentData.lastName
    )

    return (
      displayName !== currentFullName ||
      formData.bio !== currentData.bio ||
      formData.location !== currentData.location ||
      formData.website !== currentData.website ||
      formData.birthDate !== currentData.birthDate ||
      formData.avatar !== null ||
      formData.banner !== null
    )
  }, [displayName, formData, currentData])

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
        header={<div />}
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
            {/* displayName com split automático */}
            <Input
              name="displayName"
              label="Nome"
              value={displayName}
              onChange={handleDisplayNameChange}
              maxLength={50}
              placeholder="Nome Sobrenome"
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
              placeholder="exemplo.com"
            />

            {/* Campo Data de Nascimento */}
            <S.BirthDateField onClick={() => setIsBirthDateModalOpen(true)}>
              <S.BirthDateInfo>
                <S.BirthDateLabel>Data de nascimento</S.BirthDateLabel>
                <S.BirthDateValue>
                  {formatDate(formData.birthDate, 'full')}
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
