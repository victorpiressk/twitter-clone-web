import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectSuggestions,
  selectSuggestionsLoading,
  setSuggestions,
  setSuggestionsLoading,
  selectFollowState
} from '../../store/slices/users/usersSlice'
import { selectCurrentUser } from '../../store/slices/auth/authSlice'
import { useGetUsersQuery } from '../../store/slices/api/users.api'
import ConnectTabs from './components/ConnectTabs'
import UserSuggestionCard from './components/UserSuggestionCard'
import { ContentWrapper } from '../../styles/globalStyles'
import InfoBar from '../../components/Layout/InfoBar'
import BackButton from '../../components/common/BackButton'
import UserCardListSkeleton from '../../components/common/Skeleton/components/UserCardSkeleton/UserCardListSkeleton'
import { ScrollToTop } from '../../hooks/useScrollToTop'
import type { ConnectTab } from './types'
import * as S from './styles'

const Connect = () => {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<ConnectTab>('suggestions')

  // ✅ Current user
  const currentUser = useAppSelector(selectCurrentUser)

  // ✅ RTK Query
  const { data: suggestionsData, isLoading: isFetchingSuggestions } =
    useGetUsersQuery(undefined, {
      skip: activeTab !== 'suggestions'
    })

  // ✅ Redux state
  const suggestions = useAppSelector(selectSuggestions)
  const isLoading = useAppSelector(selectSuggestionsLoading)
  const followState = useAppSelector(selectFollowState)

  // ✅ Sync loading state
  useEffect(() => {
    dispatch(setSuggestionsLoading(isFetchingSuggestions))
  }, [isFetchingSuggestions, dispatch])

  // ✅ Sync suggestions (filtrando usuário logado)
  useEffect(() => {
    if (suggestionsData && currentUser) {
      const users = Array.isArray(suggestionsData)
        ? suggestionsData
        : suggestionsData.results

      // ✅ Filtrar usuário logado
      const filteredUsers = users.filter((user) => user.id !== currentUser.id)

      dispatch(setSuggestions(filteredUsers))
    }
  }, [suggestionsData, currentUser, dispatch])

  // ✅ NOVO: Filtrar usuários que já está seguindo
  const filteredSuggestions = suggestions.filter(
    (user): user is NonNullable<typeof user> =>
      user !== null && !followState[user.id]
    //                ↑ Remove quem já está seguindo
  )

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.ConnectContainer>
          <S.ConnectHeader>
            <BackButton />
            <S.HeaderTitle>Seguir</S.HeaderTitle>
          </S.ConnectHeader>

          <ConnectTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'suggestions' && (
            <>
              <S.SectionTitle>Sugestões para você</S.SectionTitle>
              <S.UsersList>
                {isLoading ? (
                  <UserCardListSkeleton count={3} />
                ) : (
                  <>
                    {/* ✅ Usa filteredSuggestions em vez de suggestions */}
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
                          {/* ✅ Mensagem diferente se segue todos */}
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
