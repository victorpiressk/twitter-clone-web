# State Management Guide

Este documento descreve como o estado global é organizado e consumido na aplicação, incluindo os três slices do Redux, os selectors disponíveis e os padrões de uso recomendados.

---

## Visão Geral

O estado global é gerenciado com **Redux Toolkit**, organizado em três slices independentes:

| Slice | Responsabilidade |
|---|---|
| `authSlice` | Autenticação, token, usuário logado |
| `postsSlice` | Cache de posts, feeds, paginação, post detail |
| `usersSlice` | Cache de usuários, follow state, sugestões, perfil visualizado |

O **RTK Query** gerencia o estado assíncrono (loading, cache, invalidação). Os slices gerenciam o estado derivado e sincronizado.

---

## Store

Configurado em `src/store/index.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './slices/api/base.api'
import authReducer from './slices/auth/authSlice'
import postsReducer from './slices/posts/postsSlice'
import usersReducer from './slices/users/usersSlice'
import { authMiddleware } from './middleware/authMiddleware'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApi.middleware)
      .concat(authMiddleware)
})
```

### Hooks tipados

Sempre use os hooks tipados em vez dos hooks genéricos do React-Redux:

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks'

// ✅ Correto — type-safe
const dispatch = useAppDispatch()
const user = useAppSelector(selectCurrentUser)

// ❌ Evitar — sem tipagem
const dispatch = useDispatch()
const user = useSelector((state) => state.auth.user)
```

---

## authSlice

Gerencia o estado de autenticação com persistência automática em `localStorage`.

### Estado

```typescript
type AuthState = {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}
```

### Actions

```typescript
// Salvar credenciais após login/registro
dispatch(setCredentials({ user, token }))

// Logout — limpa Redux e localStorage
dispatch(logout())

// Atualizar dados do usuário
dispatch(setUser(updatedUser))
```

### Selectors

```typescript
import {
  selectCurrentUser,
  selectAccessToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError
} from '../store/slices/auth/authSlice'

const user = useAppSelector(selectCurrentUser)
const isAuthenticated = useAppSelector(selectIsAuthenticated)
```

### Persistência

O token é salvo em `localStorage` ao chamar `setCredentials` e carregado no estado inicial ao inicializar a aplicação. Não é necessário nenhuma configuração adicional.

### Auto-logout

O `authMiddleware` intercepta todas as respostas RTK Query e dispara `logout()` automaticamente ao receber erro 401 (token expirado ou inválido).

---

## postsSlice

Cache normalizado de posts com suporte a múltiplos feeds simultâneos.

### Estado

```typescript
type PostsState = {
  // Cache normalizado
  byId: Record<number, PostWithInteractions>
  allIds: number[]

  // Feed principal (forYou / following / replies / profile)
  feed: {
    ids: number[]
    cursor: string | null
    hasMore: boolean
    loading: boolean
  }

  // Feed de hashtags (separado para evitar conflitos)
  hashtagFeed: {
    ids: number[]
    cursor: string | null
    hasMore: boolean
    loading: boolean
  }

  // Post detail
  detail: {
    postId: number | null
    threadIds: number[]
    commentIds: number[]
    loading: boolean
  }

  creating: boolean
  error: string | null
}
```

### Actions principais

```typescript
// Adiciona ou atualiza um post no cache (e no topo do feed)
dispatch(upsertPost(post))

// Define os posts do feed (limpa e substitui)
dispatch(setFeedPosts({ posts, cursor, hasMore }))

// Adiciona posts ao feed sem limpar (paginação)
dispatch(appendFeedPosts({ posts, cursor, hasMore }))

// Limpa o feed (ao trocar de tipo ou contexto)
dispatch(clearFeed())

// Optimistic updates
dispatch(toggleLike(postId))
dispatch(setLikeId({ postId, likeId }))
dispatch(setRetweeted({ postId, value: true }))
dispatch(adjustRetweets({ postId, delta: 1 }))
dispatch(toggleBookmark(postId))
dispatch(incrementComments(postId))

// Remove post do cache e do feed
dispatch(removePost(postId))

// Define post detail (PostDetail page)
dispatch(setPostDetail({ post, threadIds, commentIds }))

// Feed de hashtags
dispatch(setHashtagFeedPosts({ posts, cursor, hasMore }))
dispatch(clearHashtagFeed())
```

### Selectors

```typescript
import {
  selectPostById,
  selectFeedPosts,          // Feed principal sem replies (forYou)
  selectFollowingFeedPosts, // Feed following (sem filtro de inReplyTo)
  selectRawFeedPosts,       // Feed bruto (replies e profile)
  selectHashtagFeedPosts,   // Feed de hashtags
  selectFeedHasMore,
  selectFeedCursor,
  selectFeedLoading,
  selectPostDetail
} from '../store/slices/posts/postsSlice'

// Post individual
const post = useAppSelector((state) => selectPostById(state, postId))

// Feed
const posts = useAppSelector(selectFeedPosts)
const hasMore = useAppSelector(selectFeedHasMore)

// Post detail com thread e comentários
const detail = useAppSelector(selectPostDetail)
// detail = { post, thread: Post[], comments: Post[] }
```

### Padrão de consumo recomendado

O feed nunca é consumido diretamente nos componentes — use sempre o hook `usePosts`:

```typescript
// ✅ Correto — hook gerencia sincronização, paginação e loading
const { posts, isLoading, hasMore, loadMore, refresh } = usePosts({
  type: 'forYou'
})

// ❌ Evitar — consumo direto do selector sem sincronização com RTK Query
const posts = useAppSelector(selectFeedPosts)
```

Posts individuais podem ser consumidos diretamente pelo `postId`:

```typescript
// ✅ Acesso direto para componentes que já têm o ID
const post = useAppSelector((state) => selectPostById(state, postId))
```

---

## usersSlice

Cache normalizado de usuários com follow state separado para otimização de performance.

### Estado

```typescript
type UsersState = {
  // Cache normalizado
  byId: Record<number, User>
  byUsername: Record<string, number>  // username → id

  // Follow state separado (evita re-render de todo o cache ao seguir alguém)
  followState: Record<number, boolean>
  followIds: Record<number, number>   // userId → followId (para unfollow)

  // Sugestões (Who to Follow)
  suggestions: {
    ids: number[]
    loading: boolean
  }

  // Perfil sendo visualizado
  viewing: {
    userId: number | null
    loading: boolean
  }

  error: string | null
}
```

### Actions principais

```typescript
// Adiciona ou atualiza um usuário no cache
dispatch(upsertUser(user))
dispatch(upsertUsers(users))

// Follow state
dispatch(toggleFollow(userId))                    // Optimistic update
dispatch(setFollowId({ userId, followId }))       // Salva ID do follow
dispatch(removeFollowId(userId))                  // Remove após unfollow
dispatch(clearFollows())                          // Limpa ao fazer logout

// Sugestões
dispatch(setSuggestions(users))
dispatch(setSuggestionsLoading(true))

// Perfil sendo visualizado
dispatch(setViewingUser(user))
dispatch(clearViewing())                          // Limpa ao desmontar

// Reset completo (logout)
dispatch(resetUsersState())
```

### Selectors

```typescript
import {
  selectUserById,
  selectUserByUsername,
  selectIsFollowing,
  selectFollowId,
  selectFollowState,
  selectUserWithFollowState,  // User + isFollowing (memoizado)
  selectSuggestions,          // Sugestões com dados completos (memoizado)
  selectViewingUser,          // Usuário visualizado + isFollowing (memoizado)
  selectViewingLoading
} from '../store/slices/users/usersSlice'

// Usuário por ID
const user = useAppSelector((state) => selectUserById(state, userId))

// Usuário por username
const user = useAppSelector((state) => selectUserByUsername(state, username))

// Follow state
const isFollowing = useAppSelector((state) => selectIsFollowing(state, userId))

// Usuário sendo visualizado (Profile / FollowPage)
const viewingUser = useAppSelector(selectViewingUser)
```

### Padrão de consumo recomendado

Ações de follow/unfollow nunca são disparadas diretamente dos componentes — use o hook `useUserActions`:

```typescript
// ✅ Correto — hook gerencia optimistic updates, rollback e toasts
const { followUser, unfollowUser, isFollowing, isLoading } = useUserActions(userId)

// ❌ Evitar — dispatch direto sem tratamento de erro
dispatch(toggleFollow(userId))
await followMutation({ following: userId })
```

O perfil sendo visualizado é gerenciado pelo hook `useViewingUser`:

```typescript
// ✅ Correto — hook gerencia busca, sincronização e redirect 404
const { viewingUser, isLoading } = useViewingUser(username)
```

---

## Padrões de Uso

### Quando usar hooks vs selectors diretos

| Situação | Recomendação |
|---|---|
| Consumir o feed de posts | `usePosts` |
| Ações em posts (like, retweet) | `usePostActions` |
| Criar/editar posts | `useCreatePost` |
| Formulários de post | `useFormModal` |
| Follow/unfollow | `useUserActions` |
| Perfil de usuário | `useViewingUser` |
| Posts de hashtag | `useHashtagPosts` |
| Dados de um post específico | `selectPostById` diretamente |
| Dados do usuário logado | `selectCurrentUser` diretamente |
| Estado de autenticação | `selectIsAuthenticated` diretamente |

### Reset de estado no logout

Ao fazer logout, todos os slices são resetados automaticamente:

- `authSlice` — limpa via action `logout`
- `usersSlice` — limpa via `extraReducers` que escuta a action `logout`
- `postsSlice` — o RTK Query invalida o cache via `tagTypes`

Não é necessário disparar actions de limpeza manualmente ao fazer logout.

### Optimistic Updates

O padrão de optimistic update usado no projeto:

```typescript
// 1. Atualiza o Redux imediatamente
dispatch(toggleLike(postId))

try {
  // 2. Persiste na API
  const result = await likePost({ post: postId }).unwrap()

  // 3. Salva dados retornados pela API (ex: likeId)
  dispatch(setLikeId({ postId, likeId: result.id }))
} catch {
  // 4. Reverte em caso de erro
  dispatch(toggleLike(postId))
  showToast('error', 'Erro ao curtir')
}
```

### Selectors memoizados

Os selectors que combinam múltiplas partes do estado são memoizados com `createSelector` para evitar re-renders desnecessários:

```typescript
// selectFeedPosts, selectFollowingFeedPosts, selectRawFeedPosts
// selectHashtagFeedPosts, selectPostDetail
// selectUserWithFollowState, selectSuggestions, selectViewingUser
```

Esses selectors só recalculam quando as partes do estado das quais dependem mudam. Use-os em preferência a selectors inline quando o dado precisar ser derivado ou combinado.
