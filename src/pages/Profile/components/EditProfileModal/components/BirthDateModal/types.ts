export type BirthDateModalProps = {
  isOpen: boolean
  onClose: () => void
  currentBirthDate: string // ISO format: "1995-05-20"
  onSave: (newDate: string) => void
  editCount: number // Quantas vezes já editou
}
