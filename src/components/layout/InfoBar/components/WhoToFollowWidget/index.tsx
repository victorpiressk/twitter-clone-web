import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserActions } from '../../../../../hooks/useUserActions'
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks'
import { useGetUsersQuery } from '../../../../../store/slices/api/users.api'
import { selectCurrentUser } from '../../../../../store/slices/auth/authSlice'
import {
  selectSuggestions,
  setSuggestions,
  setSuggestionsLoading
} from '../../../../../store/slices/users/usersSlice'
import { selectFollowState } from '../../../../../store/slices/users/usersSlice'
import Avatar from '../../../../common/Avatar'
import Button from '../../../../common/Button'
import * as S from './styles'

const WhoToFollowWidget = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentUser = useAppSelector(selectCurrentUser)
  const allSuggestions = useAppSelector(selectSuggestions)
  const followState = useAppSelector(selectFollowState)

  const { data: usersData, isLoading } = useGetUsersQuery()

  // Sincroniza com Redux quando recebe dados
  useEffect(() => {
    dispatch(setSuggestionsLoading(isLoading))
  }, [isLoading, dispatch])

  useEffect(() => {
    if (usersData && currentUser) {
      const users = Array.isArray(usersData) ? usersData : usersData.results

      // Filtra usuário logado
      const filteredUsers = users.filter((user) => user.id !== currentUser.id)

      dispatch(setSuggestions(filteredUsers))
    }
  }, [usersData, currentUser, dispatch])

  // Remover usuário logado + quem já está seguindo
  const suggestions = allSuggestions
    .filter((user) => user !== null && user.id !== currentUser?.id)
    .filter(
      (user): user is NonNullable<typeof user> =>
        user !== null && !followState[user.id]
    )
    .slice(0, 3) // Mostrar apenas 3 sugestões

  if (suggestions.length === 0) {
    return null
  }

  const handleUserClick = (username: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    navigate(`/${username}`)
  }

  return (
    <S.Widget>
      <S.WidgetHeader>
        <S.WidgetTitle>Quem seguir</S.WidgetTitle>
      </S.WidgetHeader>

      <S.SuggestionsList>
        {suggestions.map((user) => (
          <SuggestionItem
            key={user.id}
            user={user}
            onUserClick={handleUserClick}
          />
        ))}
      </S.SuggestionsList>

      <S.ShowMore>
        <Button type="link" to="/connect" variant="ghost">
          Mostrar mais
        </Button>
      </S.ShowMore>
    </S.Widget>
  )
}

// ============================================
// SUB-COMPONENTE: SuggestionItem
// ============================================

type SuggestionItemProps = {
  user: NonNullable<ReturnType<typeof selectSuggestions>[number]>
  onUserClick: (username: string, e: React.MouseEvent) => void
}

const SuggestionItem = ({ user, onUserClick }: SuggestionItemProps) => {
  const { isFollowing, isLoading, followUser, unfollowUser } = useUserActions(
    user.id
  )

  const handleFollowClick = (e?: React.MouseEvent) => {
    e?.stopPropagation()

    if (isFollowing) {
      unfollowUser()
    } else {
      followUser()
    }
  }

  return (
    <S.SuggestionItem onClick={(e) => onUserClick(user.username, e)}>
      <Avatar
        src={user.avatar}
        alt={user.firstName}
        size="small"
        showProfilePopover={true}
        userProfileData={user}
        onFollowToggle={handleFollowClick}
      />

      <S.UserInfo>
        <S.DisplayName>
          {user.firstName} {user.lastName}
        </S.DisplayName>
        <S.Username>@{user.username}</S.Username>
      </S.UserInfo>

      <Button
        type="button"
        variant={isFollowing ? 'outline' : 'secondary'}
        onClick={handleFollowClick}
        loading={isLoading}
      >
        {isFollowing ? 'Seguindo' : 'Seguir'}
      </Button>
    </S.SuggestionItem>
  )
}

export default WhoToFollowWidget
