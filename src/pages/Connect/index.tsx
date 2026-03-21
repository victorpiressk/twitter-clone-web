import { useEffect, useState } from 'react'
import UserCardListSkeleton from '../../components/common/Skeleton/components/UserCardSkeleton/UserCardListSkeleton'
import InfoBar from '../../components/Layout/InfoBar'
import PageHeader from '../../components/Layout/PageHeader'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useGetUsersQuery } from '../../store/slices/api/users.api'
import { selectCurrentUser } from '../../store/slices/auth/authSlice'
import {
  selectSuggestions,
  selectSuggestionsLoading,
  setSuggestions,
  setSuggestionsLoading,
  selectFollowState
} from '../../store/slices/users/usersSlice'
import { ContentWrapper } from '../../styles/globalStyles'
import UserSuggestionCard from './components/UserSuggestionCard'
import * as S from './styles'

const CONNECT_TABS = [
  { key: 'suggestions', label: 'Quem seguir' },
  { key: 'creators', label: 'Criadores para você' }
]

const Connect = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState('suggestions')

  const currentUser = useAppSelector(selectCurrentUser)

  const { data: suggestionsData, isLoading: isFetchingSuggestions } =
    useGetUsersQuery(undefined, {
      skip: activeTab !== 'suggestions'
    })

  const suggestions = useAppSelector(selectSuggestions)
  const isLoading = useAppSelector(selectSuggestionsLoading)
  const followState = useAppSelector(selectFollowState)

  useEffect(() => {
    dispatch(setSuggestionsLoading(isFetchingSuggestions))
  }, [isFetchingSuggestions, dispatch])

  useEffect(() => {
    if (suggestionsData && currentUser) {
      const users = Array.isArray(suggestionsData)
        ? suggestionsData
        : suggestionsData.results

      const filteredUsers = users.filter((user) => user.id !== currentUser.id)
      dispatch(setSuggestions(filteredUsers))
    }
  }, [suggestionsData, currentUser, dispatch])

  const filteredSuggestions = suggestions.filter(
    (user): user is NonNullable<typeof user> =>
      user !== null && !followState[user.id]
  )

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.ConnectContainer>
          <PageHeader
            variant="connect"
            tabs={CONNECT_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'suggestions' && (
            <>
              <S.SectionTitle>Sugestões para você</S.SectionTitle>
              <S.UsersList>
                {isLoading ? (
                  <UserCardListSkeleton count={3} />
                ) : (
                  <>
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((user) => (
                        <UserSuggestionCard
                          key={user.id}
                          user={user}
                          showSubscribe={false}
                        />
                      ))
                    ) : (
                      <S.EmptyState>
                        <S.EmptyStateText>
                          {suggestions.length > 0
                            ? 'Você já segue todos! 🎉'
                            : 'Nenhuma sugestão disponível no momento.'}
                        </S.EmptyStateText>
                      </S.EmptyState>
                    )}
                  </>
                )}
              </S.UsersList>
            </>
          )}

          {activeTab === 'creators' && (
            <S.UsersList>
              <S.EmptyState>
                <S.EmptyStateTitle>Criadores em breve...</S.EmptyStateTitle>
                <S.EmptyStateText>Estamos trabalhando nisso!</S.EmptyStateText>
              </S.EmptyState>
            </S.UsersList>
          )}
        </S.ConnectContainer>
        <InfoBar />
      </ContentWrapper>
    </>
  )
}

export default Connect
