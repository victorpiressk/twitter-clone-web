import { useEffect, useMemo, useState } from 'react'
import InforBar from '../../components/Layout/InfoBar'
import { ContentWrapper } from '../../styles/globalStyles'
import PostForm from '../../components/common/PostForm'
import PostList from '../../components/common/PostList'
import HomeTabs from './components/HomeTabs'
import type { ActiveTab } from './components/HomeTabs/types'
import type { Post } from '../../components/common/PostCard/types'
import type { HomeProps } from './types'
import ScrollToTop from '../../hooks/useScrollToTop'
import * as S from './styles'
import PostListSkeleton from '../../components/common/Skeleton/components/PostSkeleton/PostListSkeleton'

// Mock data (depois vem da API)
const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'victor',
      displayName: 'Victor Pires',
      isFollowing: false
    },
    content: 'Olá mundo! Este é meu primeiro post no Twitter Clone 🚀',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1h atrás
    stats: {
      comments: 12,
      retweets: 5,
      likes: 42,
      views: 1234
    },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'maria',
      displayName: 'Maria Costa',
      isFollowing: true
    },
    content: 'React + TypeScript é uma combinação perfeita! 💙',
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2h atrás
    stats: {
      comments: 8,
      retweets: 3,
      likes: 25,
      views: 890
    },
    isLiked: true,
    isRetweeted: false
  },
  {
    id: '3',
    author: {
      id: '3',
      username: 'joao',
      displayName: 'João Silva',
      isFollowing: false
    },
    content: 'Styled Components tornam a estilização muito mais intuitiva! 🎨',
    createdAt: new Date(Date.now() - 10800000).toISOString(), // 3h atrás
    stats: {
      comments: 15,
      retweets: 7,
      likes: 58,
      views: 2100
    },
    isLiked: false,
    isRetweeted: true
  },
  {
    id: '4',
    author: {
      id: '4',
      username: 'ana',
      displayName: 'Ana Oliveira',
      isFollowing: true
    },
    content:
      'Acabei de finalizar meu projeto fullstack! Django REST + React funcionando perfeitamente 🔥',
    createdAt: new Date(Date.now() - 14400000).toISOString(), // 4h atrás
    stats: {
      comments: 23,
      retweets: 12,
      likes: 89,
      views: 3450
    },
    isLiked: true,
    isRetweeted: false
  },
  {
    id: '5',
    author: {
      id: '5',
      username: 'carlos',
      displayName: 'Carlos Mendes',
      isFollowing: true
    },
    content:
      'Docker facilita MUITO o desenvolvimento. Nunca mais "funciona na minha máquina" 😂',
    createdAt: new Date(Date.now() - 18000000).toISOString(), // 5h atrás
    stats: {
      comments: 31,
      retweets: 18,
      likes: 125,
      views: 5600
    },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '6',
    author: {
      id: '6',
      username: 'juliana',
      displayName: 'Juliana Santos',
      isFollowing: true
    },
    content:
      'Dica: useContext + useReducer = gerenciamento de estado simples e eficiente! ⚡',
    createdAt: new Date(Date.now() - 21600000).toISOString(), // 6h atrás
    stats: {
      comments: 19,
      retweets: 9,
      likes: 67,
      views: 2890
    },
    isLiked: true,
    isRetweeted: true
  },
  {
    id: '7',
    author: {
      id: '7',
      username: 'pedro',
      displayName: 'Pedro Alves',
      isFollowing: false
    },
    content:
      'GitHub Actions automatizou todo meu processo de deploy. CI/CD é essencial! 🚀',
    createdAt: new Date(Date.now() - 25200000).toISOString(), // 7h atrás
    stats: {
      comments: 14,
      retweets: 6,
      likes: 45,
      views: 1780
    },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '8',
    author: {
      id: '8',
      username: 'fernanda',
      displayName: 'Fernanda Lima',
      isFollowing: false
    },
    content:
      'PostgreSQL + Django ORM = queries poderosas com código Python limpo! 💪',
    createdAt: new Date(Date.now() - 28800000).toISOString(), // 8h atrás
    stats: {
      comments: 11,
      retweets: 4,
      likes: 38,
      views: 1450
    },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '9',
    author: {
      id: '9',
      username: 'lucas',
      displayName: 'Lucas Ferreira',
      isFollowing: false
    },
    content:
      'Acabei de descobrir o Vite e é ABSURDAMENTE rápido comparado ao Create React App! ⚡',
    createdAt: new Date(Date.now() - 32400000).toISOString(), // 9h atrás
    stats: {
      comments: 27,
      retweets: 15,
      likes: 102,
      views: 4200
    },
    isLiked: true,
    isRetweeted: false
  },
  {
    id: '10',
    author: {
      id: '10',
      username: 'beatriz',
      displayName: 'Beatriz Rocha',
      isFollowing: false
    },
    content:
      'Estudando clean code e percebendo o quanto meu código de 6 meses atrás era confuso 😅',
    createdAt: new Date(Date.now() - 36000000).toISOString(), // 10h atrás
    stats: {
      comments: 18,
      retweets: 8,
      likes: 71,
      views: 2650
    },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '11',
    author: {
      id: '11',
      username: 'rafael',
      displayName: 'Rafael Costa',
      isFollowing: true
    },
    content:
      'Deploy no Render foi super tranquilo! Recomendo para projetos pequenos e médios. 🌐',
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12h atrás
    stats: {
      comments: 9,
      retweets: 5,
      likes: 34,
      views: 1120
    },
    isLiked: false,
    isRetweeted: false
  },
  {
    id: '12',
    author: {
      id: '12',
      username: 'camila',
      displayName: 'Camila Dias',
      isFollowing: true
    },
    content:
      'Aprendendo sobre testes automatizados. Pytest está sendo uma ótima experiência! ✅',
    createdAt: new Date(Date.now() - 50400000).toISOString(), // 14h atrás
    stats: {
      comments: 13,
      retweets: 6,
      likes: 49,
      views: 1890
    },
    isLiked: true,
    isRetweeted: false
  },
  {
    id: '13',
    author: {
      id: '13',
      username: 'gustavo',
      displayName: 'Gustavo Martins',
      isFollowing: false
    },
    content:
      'Finalmente entendi closures em JavaScript! A documentação da MDN é ouro 💎',
    createdAt: new Date(Date.now() - 57600000).toISOString(), // 16h atrás
    stats: {
      comments: 21,
      retweets: 11,
      likes: 83,
      views: 3200
    },
    isLiked: false,
    isRetweeted: true
  },
  {
    id: '14',
    author: {
      id: '14',
      username: 'larissa',
      displayName: 'Larissa Souza',
      isFollowing: true
    },
    content:
      'Responsividade não é sobre breakpoints, é sobre criar interfaces que se adaptam! 📱',
    createdAt: new Date(Date.now() - 64800000).toISOString(), // 18h atrás
    stats: {
      comments: 16,
      retweets: 9,
      likes: 61,
      views: 2340
    },
    isLiked: true,
    isRetweeted: false
  },
  {
    id: '15',
    author: {
      id: '15',
      username: 'rodrigo',
      displayName: 'Rodrigo Barbosa',
      isFollowing: false
    },
    content:
      'Meu portfolio finalmente está no ar! Feedbacks são muito bem-vindos 🙏',
    createdAt: new Date(Date.now() - 72000000).toISOString(), // 20h atrás
    stats: {
      comments: 34,
      retweets: 7,
      likes: 156,
      views: 6700
    },
    isLiked: false,
    isRetweeted: false
  }
]

const HomeLayout = ({ userAvatar, userName }: HomeProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('forYou')
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula fetch de posts
    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 2000)
  }, [])

  const filteredPosts = useMemo(() => {
    if (activeTab === 'following') {
      return posts.filter((post) => post.author.isFollowing === true)
    }
    return posts // "Para você" mostra todos
  }, [posts, activeTab])

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        id: '1',
        username: 'victor',
        displayName: 'Victor Pires',
        isFollowing: false
      },
      content,
      createdAt: new Date().toISOString(),
      stats: {
        comments: 0,
        retweets: 0,
        likes: 0,
        views: 0
      },
      isLiked: false,
      isRetweeted: false
    }

    setPosts([newPost, ...posts])
  }

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              stats: {
                ...post.stats,
                likes: post.isLiked
                  ? post.stats.likes - 1
                  : post.stats.likes + 1
              }
            }
          : post
      )
    )
  }

  const handleRetweet = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isRetweeted: !post.isRetweeted,
              stats: {
                ...post.stats,
                retweets: post.isRetweeted
                  ? post.stats.retweets - 1
                  : post.stats.retweets + 1
              }
            }
          : post
      )
    )
  }

  const handleComment = (postId: string) => {
    console.log('Comentar no post:', postId)
    // TODO: Abrir modal de comentário
  }

  return (
    <>
      <ScrollToTop />
      <ContentWrapper>
        <S.HomeContainer>
          <HomeTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <PostForm
            userName={userName}
            userAvatar={userAvatar}
            onSubmit={handleCreatePost}
          />

          {isLoading ? (
            <PostListSkeleton count={5} />
          ) : (
            <PostList
              posts={filteredPosts}
              onLike={handleLike}
              onRetweet={handleRetweet}
              onComment={handleComment}
            />
          )}
        </S.HomeContainer>
        <InforBar variant="default" />
      </ContentWrapper>
    </>
  )
}

export default HomeLayout
