import { Search, User, X, MessageCircle } from 'lucide-react'
import { formatDate } from '../../../../../utils/formatDate'
import Avatar from '../../../Avatar'
import BasePopover from '../../../Popovers/BasePopover'
import * as S from './styles'
import type { SearchPopoverProps } from './types'

const SearchPopover = ({
  isOpen,
  onClose,
  triggerRef,
  state,
  searchHistory,
  onRemoveHistoryItem,
  onOpenClearModal,
  searchResults,
  onUserClick,
  onSuggestionClick,
  onPostClick,
  onHashtagClick,
  isLoading = false,
  variant
}: SearchPopoverProps) => {
  const renderContent = () => {
    switch (state) {
      case 'empty':
        return (
          <S.PopoverContainer
            $variant={variant === 'large' ? 'large' : 'small'}
          >
            <S.EmptyMessage>
              Tente buscar por pessoas, posts ou hashtags
            </S.EmptyMessage>
          </S.PopoverContainer>
        )

      case 'history':
        return (
          <S.PopoverContainer
            $variant={variant === 'large' ? 'large' : 'small'}
          >
            <S.HistoryHeader>
              <S.HistoryTitle>Recente</S.HistoryTitle>
              <S.ClearAllButton onClick={onOpenClearModal}>
                Limpar tudo
              </S.ClearAllButton>
            </S.HistoryHeader>

            <S.HistoryList>
              {searchHistory.map((item) => (
                <S.HistoryItem
                  key={item.id}
                  onClick={() => {
                    if (item.type === 'search' && onSuggestionClick) {
                      onSuggestionClick(item.text)
                    } else if (
                      item.type === 'user' &&
                      item.username &&
                      onUserClick
                    ) {
                      onUserClick(item.username, item.text)
                    }
                  }}
                >
                  <S.HistoryIcon>
                    {item.type === 'search' ? (
                      <Search size={18} strokeWidth={2} />
                    ) : (
                      <User size={18} strokeWidth={2} />
                    )}
                  </S.HistoryIcon>

                  <S.HistoryText>
                    <S.HistoryMainText>{item.text}</S.HistoryMainText>
                    {item.username && (
                      <S.HistorySubText>@{item.username}</S.HistorySubText>
                    )}
                  </S.HistoryText>

                  <S.RemoveButton
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveHistoryItem(item.id)
                    }}
                    aria-label="Remover"
                  >
                    <X size={16} strokeWidth={2} />
                  </S.RemoveButton>
                </S.HistoryItem>
              ))}
            </S.HistoryList>
          </S.PopoverContainer>
        )

      case 'searching': {
        const hasResults =
          (searchResults?.users?.length || 0) > 0 ||
          (searchResults?.posts?.length || 0) > 0 ||
          (searchResults?.hashtags?.length || 0) > 0

        return (
          <S.PopoverContainer
            $variant={variant === 'large' ? 'large' : 'small'}
          >
            <S.SearchingSection>
              {/* Loading state */}
              {isLoading && <S.EmptyMessage>Buscando...</S.EmptyMessage>}

              {/* Resultados */}
              {!isLoading && (
                <>
                  {/* USUÁRIOS */}
                  {searchResults?.users && searchResults.users.length > 0 && (
                    <>
                      <S.SectionTitle>Pessoas</S.SectionTitle>
                      {searchResults.users.map((user) => (
                        <S.UserResultItem
                          key={user.id}
                          onClick={() => {
                            if (onUserClick) {
                              const displayName =
                                `${user.firstName} ${user.lastName}`.trim()
                              onUserClick(user.username, displayName)
                            }
                          }}
                        >
                          <Avatar
                            src={user.avatar}
                            alt={user.firstName}
                            size="small"
                          />

                          <S.UserResultInfo>
                            <S.UserResultName>
                              {user.firstName} {user.lastName}
                            </S.UserResultName>
                            <S.UserResultUsername>
                              @{user.username}
                            </S.UserResultUsername>
                            {user.bio && (
                              <S.UserResultBio>{user.bio}</S.UserResultBio>
                            )}
                          </S.UserResultInfo>
                        </S.UserResultItem>
                      ))}
                    </>
                  )}

                  {/* POSTS */}
                  {searchResults?.posts && searchResults.posts.length > 0 && (
                    <>
                      {searchResults.users &&
                        searchResults.users.length > 0 && <S.Divider />}
                      <S.SectionTitle>Posts</S.SectionTitle>
                      {searchResults.posts.map((post) => (
                        <S.PostResultItem
                          key={post.id}
                          onClick={() => {
                            if (onPostClick) {
                              onPostClick(post.id, post.author.username)
                            }
                          }}
                        >
                          <S.PostHeader>
                            <Avatar
                              src={post.author.avatar}
                              alt={post.author.username}
                              size="small"
                            />
                            <S.PostAuthor>
                              <S.PostAuthorName>
                                {post.author.firstName} {post.author.lastName}
                              </S.PostAuthorName>
                              <S.PostMeta>
                                @{post.author.username} ·{' '}
                                {formatDate(post.createdAt, 'feed')}
                              </S.PostMeta>
                            </S.PostAuthor>
                          </S.PostHeader>

                          <S.PostContent>
                            {post.content.length > 150
                              ? `${post.content.slice(0, 150)}...`
                              : post.content}
                          </S.PostContent>

                          {post.stats && (
                            <S.PostStats>
                              <span>
                                <MessageCircle size={14} /> {post.stats.replies}
                              </span>
                            </S.PostStats>
                          )}
                        </S.PostResultItem>
                      ))}
                    </>
                  )}

                  {/* HASHTAGS */}
                  {searchResults?.hashtags &&
                    searchResults.hashtags.length > 0 && (
                      <>
                        {((searchResults.users &&
                          searchResults.users.length > 0) ||
                          (searchResults.posts &&
                            searchResults.posts.length > 0)) && <S.Divider />}
                        <S.SectionTitle>Hashtags</S.SectionTitle>
                        {searchResults.hashtags.map((hashtag, index) => (
                          <S.HashtagResultItem
                            key={hashtag.id}
                            onClick={() => {
                              if (onHashtagClick) {
                                onHashtagClick(hashtag.name)
                              }
                            }}
                          >
                            <S.HashtagInfo>
                              <S.HashtagRank>
                                {index + 1}{' '}
                                <S.HashtagSeparator>·</S.HashtagSeparator>{' '}
                                Assunto do Momento{' '}
                                <S.HashtagSeparator>·</S.HashtagSeparator>{' '}
                                <S.HashtagStats>
                                  {hashtag.postsCount.toLocaleString('pt-BR')}{' '}
                                  posts
                                </S.HashtagStats>
                              </S.HashtagRank>
                              <S.HashtagName>#{hashtag.name}</S.HashtagName>
                            </S.HashtagInfo>
                          </S.HashtagResultItem>
                        ))}
                      </>
                    )}

                  {/* Sem resultados */}
                  {!hasResults && (
                    <S.EmptyMessage>Nenhum resultado encontrado</S.EmptyMessage>
                  )}
                </>
              )}
            </S.SearchingSection>
          </S.PopoverContainer>
        )
      }

      default:
        return null
    }
  }

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      position="bottom"
      matchTriggerWidth={false}
      strategy="fixed"
    >
      {renderContent()}
    </BasePopover>
  )
}

export default SearchPopover
