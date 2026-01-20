export type EditProfileFormData = {
  displayName: string
  bio: string
  location: string
  website: string
  birthDate: string
  profileImage?: File | null
  bannerImage?: File | null
}

export type EditProfileModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (data: EditProfileFormData) => void
  currentData: {
    displayName: string
    bio: string
    location: string
    website: string
    birthDate: string
    avatar?: string
    banner?: string
  }
}
