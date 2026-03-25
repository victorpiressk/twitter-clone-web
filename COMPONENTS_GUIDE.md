# Components Guide

Este documento descreve os componentes reutilizáveis disponíveis em `src/components/common/`. Todos seguem o padrão de estilização com Styled Components e suporte a temas.

---

## Avatar

Exibe o avatar do usuário com fallback para inicial do nome. Suporta popover de perfil ao hover.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `src` | `string \| null` | — | URL da imagem |
| `alt` | `string` | `'User'` | Texto alternativo e fonte da inicial |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho do avatar |
| `onClick` | `() => void` | — | Handler de clique |
| `showProfilePopover` | `boolean` | `false` | Ativa o popover de perfil ao hover |
| `userProfileData` | `UserCardWithStats` | — | Dados para o popover (obrigatório se `showProfilePopover`) |
| `onFollowToggle` | `() => void` | — | Handler de follow no popover |

### Variantes de tamanho

```tsx
<Avatar src={user.avatar} alt={user.username} size="small" />
<Avatar src={user.avatar} alt={user.username} size="medium" />
<Avatar src={user.avatar} alt={user.username} size="large" />
```

### Com ProfilePopover

```tsx
<Avatar
  src={post.author.avatar}
  alt={post.author.username}
  size="small"
  showProfilePopover
  userProfileData={post.author}
  onFollowToggle={handleFollowToggle}
  onClick={() => navigate(`/${post.author.username}`)}
/>
```

---

## Button

Botão multifuncional com suporte a variantes visuais, estado de loading e navegação via link.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `type` | `'button' \| 'submit' \| 'link'` | — | Tipo do botão |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'tab' \| 'danger'` | `'primary'` | Estilo visual |
| `onClick` | `(e: MouseEvent) => void` | — | Handler de clique |
| `to` | `string` | — | Rota de navegação (quando `type='link'`) |
| `active` | `boolean` | `false` | Estado ativo (usado em tabs) |
| `disabled` | `boolean` | `false` | Estado desabilitado |
| `loading` | `boolean` | `false` | Substitui conteúdo por Spinner |

### Variantes

```tsx
<Button type="button" variant="primary">Seguir</Button>
<Button type="button" variant="secondary">Postar</Button>
<Button type="button" variant="outline">Deixar de seguir</Button>
<Button type="button" variant="ghost">Cancelar</Button>
<Button type="button" variant="danger">Deletar</Button>
<Button type="button" variant="tab" active={activeTab === 'forYou'}>Para você</Button>
<Button type="link" to="/home" variant="ghost">Início</Button>
```

### Com loading

```tsx
<Button type="submit" variant="secondary" loading={isSubmitting}>
  Entrar
</Button>
```

---

## Tabs

Tabs genéricas com suporte a scroll horizontal e setas de navegação no desktop.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `tabs` | `TabItem[]` | — | Lista de tabs `{ key: string; label: string }` |
| `activeTab` | `string` | — | Chave da tab ativa |
| `onTabChange` | `(tab: string) => void` | — | Handler de mudança de tab |
| `scrollable` | `boolean` | `false` | Ativa scroll horizontal e setas de navegação |

### Exemplo de uso

```tsx
const PROFILE_TABS = [
  { key: 'posts', label: 'Posts' },
  { key: 'replies', label: 'Respostas' },
  { key: 'media', label: 'Mídia' },
  { key: 'likes', label: 'Curtidas' }
]

<Tabs
  tabs={PROFILE_TABS}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Com scroll (Explore)

```tsx
<Tabs
  tabs={EXPLORE_TABS}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  scrollable
/>
```

---

## PageHeader

Header unificado para todas as páginas. Gerencia back button, avatar, título, subtítulo e tabs.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `PageHeaderVariant` | — | Variante da página |
| `title` | `string` | — | Título (páginas de detalhe) |
| `subtitle` | `string` | — | Subtítulo (ex: contagem de posts) |
| `onAvatarClick` | `() => void` | — | Handler do avatar (páginas principais) |
| `onBack` | `() => void` | — | Handler do back button |
| `tabs` | `TabItem[]` | — | Tabs a exibir abaixo do header |
| `activeTab` | `string` | — | Tab ativa |
| `onTabChange` | `(tab: string) => void` | — | Handler de mudança de tab |
| `isSearchFocused` | `boolean` | — | Foco na SearchBar (variant `explore`) |
| `searchQuery` | `string` | — | Query de busca (variant `explore`) |
| `onSearchFocus` | `() => void` | — | Handler de foco na SearchBar |
| `onSearch` | `(query: string) => void` | — | Handler de busca |
| `backButtonMobileOnly` | `boolean` | `false` | Exibe back button apenas em mobile/tablet |

### Variantes disponíveis

```typescript
type PageHeaderVariant =
  | 'home' | 'explore' | 'notifications' | 'messages'  // Avatar no header
  | 'connect' | 'profile' | 'post-detail'               // Back button
  | 'follow-page' | 'settings'
```

### Exemplos de uso

```tsx
// Página principal com tabs
<PageHeader
  variant="home"
  tabs={HOME_TABS}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onAvatarClick={openDrawer}
/>

// Página de detalhe com back button
<PageHeader
  variant="profile"
  title={`${viewingUser.firstName} ${viewingUser.lastName}`}
  subtitle={`${viewingUser.stats.posts} posts`}
  onBack={() => navigate(-1)}
/>

// Settings com back button apenas em mobile/tablet
<PageHeader
  variant="settings"
  title={activeTabData.label}
  onBack={() => setActiveTab(null)}
  backButtonMobileOnly
/>
```

---

## SearchBar

Barra de busca global com popover de resultados, histórico em localStorage e debounce de 500ms.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `variant` | `'small' \| 'large'` | `'large'` | Tamanho da barra |
| `onFocus` | `() => void` | — | Handler de foco |
| `value` | `string` | `''` | Valor controlado externamente |
| `onSearch` | `(query: string) => void` | — | Handler de busca |
| `sticky` | `boolean` | `false` | Aplica `position: sticky` no container |

### Variantes

```tsx
// InfoBar (sidebar direita) — com sticky
<SearchBar variant="small" sticky />

// Explore — controlada pelo PageHeader
<SearchBar
  variant="large"
  value={searchQuery}
  onFocus={onSearchFocus}
  onSearch={handleSearch}
/>
```

---

## PostCard

Card de post com suporte a variantes, retweets, quote tweets, likes, comentários e menu de ações.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `postId` | `number` | — | ID do post no Redux |
| `variant` | `'default' \| 'detailed'` | `'default'` | Modo de exibição |

### Variantes

```tsx
// Feed — clicável, navega para post detail
<PostCard postId={post.id} variant="default" />

// Post detail — expandido, não clicável
<PostCard postId={post.id} variant="detailed" />
```

> O `PostCard` busca os dados do post diretamente no Redux via `postId`. Não recebe o objeto post como prop — isso garante que atualizações no Redux refletem automaticamente sem re-render forçado.

---

## Modais

### BaseModal

Modal base com overlay, botão de fechar, suporte a header e footer customizáveis e bloqueio de scroll.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `isOpen` | `boolean` | — | Controla visibilidade |
| `onClose` | `() => void` | — | Handler de fechamento |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho da modal |
| `showOverlay` | `boolean` | `false` | Exibe overlay escuro |
| `showCloseButton` | `boolean` | `false` | Exibe botão X |
| `title` | `ReactNode` | — | Conteúdo do header |
| `header` | `ReactNode` | — | Header customizado |
| `footer` | `ReactNode` | — | Footer customizado |
| `children` | `ReactNode` | — | Conteúdo principal |

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  size="medium"
  showOverlay
  showCloseButton
  title={<Twitter size={30} />}
  footer={<Button onClick={handleSubmit}>Confirmar</Button>}
>
  {/* conteúdo */}
</Modal>
```

### CommentModal

Modal para criar reply a um post.

```tsx
<CommentModal
  isOpen={isCommentModalOpen}
  onClose={() => setIsCommentModalOpen(false)}
  originalPost={post}
  userAvatar={currentUser.avatar}
  userName={currentUser.username}
/>
```

### RetweetModal

Modal para quote retweet (retweet com comentário).

```tsx
<RetweetModal
  isOpen={isRetweetModalOpen}
  onClose={() => setIsRetweetModalOpen(false)}
  originalPost={post}
  userName={currentUser.username}
  userAvatar={currentUser.avatar}
/>
```

---

## Popovers

### BasePopover

Popover base com posicionamento automático via `@floating-ui/react`. Detecta colisão com bordas da tela e ajusta posição automaticamente.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `isOpen` | `boolean` | — | Controla visibilidade |
| `onClose` | `() => void` | — | Handler de fechamento |
| `triggerRef` | `RefObject<HTMLElement>` | — | Referência ao elemento que abre o popover |
| `children` | `ReactNode` | — | Conteúdo do popover |

### RetweetPopover

Popover com opções de retweet simples, quote retweet e desfazer retweet.

```tsx
<RetweetPopover
  isOpen={isRetweetPopoverOpen}
  onClose={() => setIsRetweetPopoverOpen(false)}
  onRetweet={handleRetweetSimple}
  onQuote={() => setIsRetweetModalOpen(true)}
  isRetweeted={userMadeSimpleRetweet}
  isQuoteRetweet={userMadeQuoteRetweet}
  triggerRef={retweetButtonRef}
/>
```

---

## Skeleton

Componentes de loading state para cada contexto. Todos aceitam `count` para renderizar múltiplos itens.

### Disponíveis

```tsx
<PostListSkeleton count={5} />
<PostDetailSkeleton />
<ProfileHeaderSkeleton />
<UserCardListSkeleton count={3} />
<NotificationListSkeleton count={7} />
```

---

## Toast

Sistema de notificações visuais. Consumido via hook `useToast`.

```tsx
const { showToast } = useToast()

showToast('success', 'Post criado com sucesso!')
showToast('error', 'Erro ao curtir post')
showToast('info', 'Funcionalidade em breve')
```

### Variantes

| Variante | Uso |
|---|---|
| `success` | Ação concluída com sucesso |
| `error` | Erro em ação do usuário ou da API |
| `info` | Informação neutra |

---

## Spinner

Indicador de loading inline. Usado internamente pelo `Button` quando `loading={true}`.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamanho do spinner |

```tsx
<Spinner size="small" />
```

---

## BackButton

Botão de voltar com ícone de seta. Navega para a página anterior por padrão.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `onClick` | `() => void` | — | Handler customizado (opcional) |

```tsx
// Navegação padrão (navigate(-1))
<BackButton />

// Handler customizado
<BackButton onClick={() => setActiveTab(null)} />
```

---

## ImageUpload

Input de upload de imagens oculto, acionado via `ref` por um botão externo.

### Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| `onImagesChange` | `(files: File[]) => void` | — | Handler com os arquivos selecionados |
| `maxImages` | `number` | `4` | Limite de imagens |
| `currentImageCount` | `number` | — | Quantidade atual de imagens |
| `inputRef` | `RefObject<HTMLInputElement>` | — | Ref para acionar o input externamente |

```tsx
const inputRef = useRef<HTMLInputElement>(null)

<ImageUpload
  onImagesChange={handleMediaUpload}
  maxImages={4}
  currentImageCount={medias.length}
  inputRef={inputRef}
/>

// Acionar via botão externo
<button onClick={() => inputRef.current?.click()}>
  Adicionar mídia
</button>
```
