# API Guide

Este documento descreve como a integração com a API REST está estruturada no frontend, incluindo a configuração base, autenticação, tratamento de erros e os endpoints consumidos.

Para a documentação completa dos 49 endpoints da API, consulte o [API_ENDPOINTS.md](https://github.com/victorpiressk/twitter-clone-api/blob/main/API_ENDPOINTS.md) do repositório backend.

---

## Configuração Base

A integração é feita via **RTK Query**, configurado em `src/store/slices/api/base.api.ts`:

```typescript
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://sua-api.com',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = state.auth?.accessToken

      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }

      return headers
    }
  }),
  tagTypes: ['User', 'Post', 'Comment', 'Follow', 'Poll', 'Location', 'Hashtag', 'Notification', 'Search'],
  endpoints: () => ({})
})
```

O token de autenticação é injetado automaticamente em todas as requisições via `prepareHeaders`. Não é necessário configurar headers manualmente nos componentes.

---

## Autenticação

O token é armazenado no Redux (`authSlice`) e persistido em `localStorage`. O fluxo completo:

```
Login/Register → API retorna token → setCredentials(token) → localStorage + Redux → prepareHeaders injeta em todas as requisições
```

### Auto-logout em 401

Um middleware (`authMiddleware`) intercepta todas as respostas RTK Query e dispara logout automático ao receber erro 401:

```typescript
// store/middleware/authMiddleware.ts
if (isRejectedWithValue(action)) {
  const status = action.payload?.status
  if (status === 401) {
    dispatch(logout())
  }
}
```

---

## Tratamento de Erros

Erros da API são normalizados via `transformApiError` em `utils/transformers/error.ts`:

```typescript
const { message, fields } = transformApiError(err as FetchBaseQueryError | SerializedError)

// message — string amigável para exibir em toast
// fields  — Record<string, string> para erros de validação por campo
```

### Exemplo de uso em formulário

```typescript
try {
  await login(payload).unwrap()
} catch (err: unknown) {
  const { message, fields } = transformApiError(
    err as FetchBaseQueryError | SerializedError
  )
  showToast('error', message)
  if (Object.keys(fields).length > 0) {
    setErrors(fields)
  }
}
```

---

## Organização dos Endpoints

Os endpoints estão organizados por domínio em `src/store/slices/api/`:

```
api/
├── base.api.ts           # Configuração base (baseUrl, auth, tagTypes)
├── auth.api.ts           # Autenticação
├── users.api.ts          # Usuários e follows
├── notifications.api.ts  # Notificações
├── search.api.ts         # Busca global
├── hashtags.api.ts       # Hashtags
└── posts/
    ├── index.ts          # Posts CRUD e feed
    ├── replies.api.ts    # Replies
    ├── retweets.api.ts   # Retweets
    ├── likes.api.ts      # Curtidas
    ├── polls.api.ts      # Enquetes
    ├── locations.api.ts  # Geolocalização
    └── trending.api.ts   # Trending posts
```

---

## Endpoints por Domínio

### Autenticação — `auth.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useRegisterMutation` | POST | `/api/auth/register/` | Registro de novo usuário |
| `useLoginMutation` | POST | `/api/auth/login/` | Login com identifier + password |
| `useLogoutMutation` | POST | `/api/auth/logout/` | Logout e invalidação de token |
| `useGetCurrentUserQuery` | GET | `/api/users/me/` | Dados do usuário autenticado |

**Exemplo de uso:**
```typescript
const [login, { isLoading }] = useLoginMutation()

const result = await login({
  identifier: 'usuario@email.com', // username, email ou telefone
  password: 'senha123'
}).unwrap()

dispatch(setCredentials({ user: result.user, token: result.token }))
```

---

### Usuários — `users.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetUsersQuery` | GET | `/api/users/` | Listagem paginada de usuários |
| `useGetUserByIdQuery` | GET | `/api/users/{id}/` | Detalhes de usuário |
| `useUpdateUserMutation` | PATCH | `/api/users/{id}/` | Atualização de perfil (FormData) |
| `useUpdateAccountMutation` | PATCH | `/api/users/{id}/account/` | Edição de email, phone, username |
| `useChangePasswordMutation` | POST | `/api/users/{id}/change-password/` | Alteração de senha |
| `useGetUserFollowersQuery` | GET | `/api/users/{id}/followers/` | Lista de seguidores |
| `useGetUserFollowingQuery` | GET | `/api/users/{id}/following/` | Lista de seguindo |
| `useGetMyFollowsQuery` | GET | `/api/follows/` | Follows do usuário logado |
| `useFollowUserMutation` | POST | `/api/follows/` | Seguir usuário |
| `useUnfollowUserMutation` | DELETE | `/api/follows/{id}/` | Deixar de seguir |

**Consumo via hook (`useUserActions`):**

A maioria das ações de follow/unfollow é consumida via hook centralizado, não diretamente nos componentes:

```typescript
const { followUser, unfollowUser, isLoading, isFollowing } = useUserActions(userId)

// O hook gerencia optimistic updates, rollback e toasts internamente
```

**Consumo via hook (`useViewingUser`):**

Busca e sincronização do perfil sendo visualizado:

```typescript
const { viewingUser, isLoading } = useViewingUser(username)
// Internamente: getUsers → encontra por username → getUserById → sync Redux
```

---

### Posts — `posts/index.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetPostsQuery` | GET | `/api/posts/` | Posts com filtros dinâmicos |
| `useGetFeedQuery` | GET | `/api/posts/feed/` | Feed personalizado |
| `useGetPostByIdQuery` | GET | `/api/posts/{id}/` | Post individual |
| `useCreatePostMutation` | POST | `/api/posts/` | Criar post (FormData) |
| `useUpdatePostMutation` | PATCH | `/api/posts/{id}/` | Editar post |
| `useDeletePostMutation` | DELETE | `/api/posts/{id}/` | Deletar post |

**Filtros disponíveis em `useGetPostsQuery`:**

```typescript
useGetPostsQuery({
  author: userId,       // Posts de um autor específico
  has_reply: true,      // Apenas posts com resposta
  has_media: true,      // Apenas posts com mídia
  is_retweet: false,    // Excluir retweets
  liked_by: userId,     // Posts curtidos por um usuário
})
```

**Consumo via hook (`usePosts`):**

O feed é sempre consumido via `usePosts`, que gerencia paginação, infinite scroll e sincronização com Redux:

```typescript
const { posts, isLoading, hasMore, loadMore, refresh } = usePosts({
  type: 'forYou'       // 'forYou' | 'following' | 'replies' | 'profile'
  postId: 123,          // Obrigatório quando type='replies'
  params: { author: userId } // Filtros para type='profile'
})
```

---

### Replies — `posts/replies.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetPostRepliesQuery` | GET | `/api/posts/{id}/replies/` | Replies de um post |
| `useReplyToPostMutation` | POST | `/api/posts/{id}/reply/` | Criar reply |

---

### Retweets — `posts/retweets.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useRetweetPostMutation` | POST | `/api/posts/{id}/retweet/` | Retweet simples |
| `useUnretweetPostMutation` | DELETE | `/api/posts/{id}/unretweet/` | Desfazer retweet |
| `useQuoteRetweetMutation` | POST | `/api/posts/{id}/quote/` | Quote retweet |

---

### Curtidas — `posts/likes.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetLikesQuery` | GET | `/api/likes/` | Listagem de curtidas |
| `useLikePostMutation` | POST | `/api/likes/` | Curtir post |
| `useUnlikePostMutation` | DELETE | `/api/likes/{like_id}/` | Descurtir post |

> **Atenção:** o DELETE usa o `like_id` retornado ao curtir, não o ID do post. O `like_id` é armazenado no Redux via `setLikeId` após cada curtida.

**Consumo via hook (`usePostActions`):**

```typescript
const { likePost, isLiked } = usePostActions(postId)
// Optimistic update + rollback automático
```

---

### Hashtags — `hashtags.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetHashtagsQuery` | GET | `/api/hashtags/` | Listagem paginada |
| `useGetHashtagByIdQuery` | GET | `/api/hashtags/{id}/` | Hashtag por ID |
| `useSearchHashtagsQuery` | GET | `/api/hashtags/search/` | Busca por nome |
| `useGetHashtagPostsQuery` | GET | `/api/hashtags/{id}/posts/` | Posts de uma hashtag |
| `useGetTrendingHashtagsQuery` | GET | `/api/hashtags/trending/` | Top hashtags |

**Consumo via hook (`useHashtags`):**

```typescript
// Trending (sidebar e Explore)
const { hashtags, isLoading } = useHashtags({ mode: 'trending', params: { limit: 30 } })

// Busca por nome
const { hashtags } = useHashtags({ mode: 'search', query: 'react' })
```

**Consumo via hook (`useHashtagPosts`):**

Internamente resolve nome → ID → posts automaticamente:

```typescript
const { posts, isLoading } = useHashtagPosts({ hashtagName: 'react' })
```

---

### Notificações — `notifications.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetNotificationsQuery` | GET | `/api/notifications/` | Listagem de notificações |
| `useGetUnreadCountQuery` | GET | `/api/notifications/unread_count/` | Contagem não lidas |
| `useMarkNotificationReadMutation` | POST | `/api/notifications/{id}/read/` | Marcar como lida |

**Polling automático:**

A página de Notificações faz refetch automático a cada 30 segundos e ao focar na aba:

```typescript
useEffect(() => {
  const interval = setInterval(() => refetch(), 30000)
  return () => clearInterval(interval)
}, [refetch])
```

---

### Busca Global — `search.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGlobalSearchQuery` | GET | `/api/search/all/` | Busca em posts, usuários e hashtags |

**Exemplo de uso com debounce:**

```typescript
// SearchBar usa debounce de 500ms antes de disparar a query
const { data, isLoading } = useGlobalSearchQuery(
  { q: debouncedQuery, limit: 10 },
  { skip: !debouncedQuery || debouncedQuery.length < 2 }
)
```

---

### Trending — `posts/trending.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetTrendingPostsQuery` | GET | `/api/posts/trending/` | Posts em alta |
| `useIncrementViewsMutation` | POST | `/api/posts/{id}/increment-views/` | Incrementar visualizações |

---

### Enquetes — `posts/polls.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetPollsQuery` | GET | `/api/polls/` | Listagem de enquetes |
| `useGetPollByIdQuery` | GET | `/api/polls/{id}/` | Enquete por ID |
| `useVotePollMutation` | POST | `/api/polls/{id}/vote/` | Votar em enquete |
| `useUnvotePollMutation` | DELETE | `/api/polls/{id}/unvote/` | Remover voto |

---

### Localizações — `posts/locations.api.ts`

| Hook | Método | Endpoint | Descrição |
|---|---|---|---|
| `useGetLocationsQuery` | GET | `/api/locations/` | Listagem de localizações |
| `useGetLocationByIdQuery` | GET | `/api/locations/{id}/` | Localização por ID |
| `useGetLocationPostsQuery` | GET | `/api/locations/{id}/posts/` | Posts de uma localização |
| `useGetNearbyLocationsQuery` | GET | `/api/locations/nearby/` | Localizações próximas |

---

## Invalidação de Cache

O RTK Query invalida cache automaticamente via `tagTypes`. Ao mutar dados, as tags relevantes são invalidadas e as queries dependentes fazem refetch:

| Ação | Tags Invalidadas | Queries Refazem |
|---|---|---|
| Follow/Unfollow | `Follow`, `User` | Lista de follows, perfil do usuário |
| Criar/Deletar post | `Post` | Feed, listas de posts |
| Curtir/Descurtir | `Post` | Post individual, feed |
| Atualizar perfil | `User` | Dados do usuário |
| Marcar notificação | `Notification` | Lista e contagem de notificações |

---

## Paginação

A maioria dos endpoints retorna resposta paginada no formato:

```typescript
type PaginatedResponse<T> = {
  count: number
  next: string | null     // URL da próxima página
  previous: string | null
  results: T[]
}
```

O `usePosts` consome o campo `next` como cursor para carregar mais posts via `loadMore`:

```typescript
// loadMore faz fetch manual da URL `next` e faz append no Redux
const loadMore = useCallback(async () => {
  if (!hasMore || !cursor) return
  const response = await fetch(cursor)
  const data = await response.json()
  dispatch(appendFeedPosts({ posts: data.results, cursor: data.next, hasMore: !!data.next }))
}, [hasMore, cursor, dispatch])
```
