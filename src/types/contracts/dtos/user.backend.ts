export type BackendUser = {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  profile_image: string | null
  banner: string | null
  bio: string
  location: string
  website: string
  birth_date: string | null
  created_at: string
  stats: {
    posts: number
    following: number
    followers: number
  }
}

export type BackendUserWithFollowState = BackendUser & {
  is_following: boolean
}

export type BackendUserPreview = Pick<
  BackendUser,
  'id' | 'username' | 'first_name' | 'last_name' | 'profile_image'
>

export type BackendUserCard = Pick<
  BackendUser,
  'id' | 'username' | 'first_name' | 'last_name' | 'profile_image' | 'bio'
> & {
  is_following: boolean
}

export type BackendUserCardWithStats = BackendUserCard & {
  stats: {
    following: number
    followers: number
  }
}

export type BackendFollow = {
  id: number
  follower: number
  following: number
  follower_username: string
  following_username: string
  created_at: string
}
