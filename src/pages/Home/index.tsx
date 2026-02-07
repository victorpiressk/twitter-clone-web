import { useEffect, useMemo, useState } from 'react'
import InforBar from '../../components/Layout/InfoBar'
import PostForm from './components/PostForm'
import PostList from '../../components/common/Posts/PostList'
import HomeTabs from './components/HomeTabs'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'
import ScrollToTop from '../../hooks/useScrollToTop'
import { usePost } from '../../hooks/usePost'
import type { ActiveTab } from './components/HomeTabs/types'
import type { HomeProps } from './types'
import { ContentWrapper } from '../../styles/globalStyles'
import * as S from './styles'

const HomeLayout = ({ userAvatar, userName }: HomeProps) => {
  const { posts, createPost, likePost, retweetPost, quoteTweet, commentPost } =
    usePost()

  const [activeTab, setActiveTab] = useState<ActiveTab>('forYou')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula fetch de posts
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  const filteredPosts = useMemo(() => {
    if (activeTab === 'following') {
      return posts.filter((post) => post.author.isFollowing === true)
    }
    return posts // "Para você" mostra todos
  }, [posts, activeTab])

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.HomeContainer>
          <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <PostForm
            userName={userName}
            userAvatar={userAvatar}
            onSubmit={createPost}
          />

          {isLoading ? (
            <PostListSkeleton count={5} />
          ) : (
            <PostList
              posts={filteredPosts}
              onLike={likePost}
              onRetweet={retweetPost}
              onQuoteTweet={quoteTweet}
              onComment={commentPost}
              variant="default"
            />
          )}
        </S.HomeContainer>
        <InforBar variant="default" />
      </ContentWrapper>
    </>
  )
}

export default HomeLayout
