import type { Location } from './constants/mockLocations'

export type LocationPickerProps = {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  onLocationSelect: (location: Location) => void
}
