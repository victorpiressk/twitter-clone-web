import type { BackendLocation } from '../../../types/contracts/dtos'
import type { Location } from '../../../types/domain/models'

export const transformLocation = (
  backendLocation: BackendLocation
): Location => ({
  id: backendLocation.id,
  name: backendLocation.name,
  latitude: backendLocation.latitude,
  longitude: backendLocation.longitude,
  postsCount: backendLocation.posts_count
})
