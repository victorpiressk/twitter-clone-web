import type { UserWithFollowState } from '../models'

export const MOCK_CURRENT_USER: UserWithFollowState = {
  id: 1,
  username: 'victor',
  firstName: 'Victor',
  lastName: 'Pires',
  email: 'victor.pires@dev.com',
  avatar: 'https://i.pravatar.cc/150?img=1',
  banner: '',
  bio: 'Desenvolvedor Full Stack',
  location: 'Natal, RN',
  website: '',
  birthDate: '1995-01-06',
  createdAt: '2020-01-15T00:00:00Z',
  stats: {
    posts: 0,
    following: 0,
    followers: 0
  },
  isFollowing: false
} as const

export const MOCK_PROFILE_USER: UserWithFollowState = {
  id: 1,
  username: 'victor',
  firstName: 'Victor',
  lastName: 'Pires',
  email: 'victor.pires@dev.com',
  avatar: 'https://i.pravatar.cc/150?img=1',
  banner: '',
  bio: 'Desenvolvedor Full Stack',
  location: 'Natal, RN',
  website: '',
  birthDate: '1995-01-06',
  createdAt: '2020-01-15T00:00:00Z',
  stats: {
    posts: 0,
    following: 0,
    followers: 0
  },
  isFollowing: false
} as const
