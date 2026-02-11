# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
## [0.1.0] - 2026-02-11

### Added

#### Refatoração Completa de Modelos e Integração de Dados

**Modelos Centralizados**
- Criação de modelos centralizados em `src/models/` baseados na estrutura real do backend
- Modelo `User` com todos os campos retornados pela API
- Modelo `Post` com suporte a mídia, enquetes, localização e agendamento
- Modelo `PostWithInteractions` para estados de interação do usuário
- Modelo `Poll` com sistema de votação
- Modelo `Notification` com suporte a agrupamento
- Modelo `Location` para geolocalização de posts
- Modelo `Trend` para trending topics
- Tipos auxiliares: `UserPreview`, `UserCard`, `UserCardWithStats`, `UserWithFollowState`

**Refatoração de 28 Arquivos de Types**
- **Grupo 1 (Models):** 7 arquivos centralizados criados
- **Grupo 2 (Avatar):** 2 arquivos refatorados para usar `UserCardWithStats`
- **Grupo 3 (Widgets):** 3 arquivos refatorados (WhoToFollow, Trends, Search)
- **Grupo 4 (User Cards):** 4 arquivos refatorados (Connect, FollowPage)
- **Grupo 5 (Profile):** 3 arquivos refatorados com lógica de `isOwnProfile`
- **Grupo 6 (Posts Core):** 4 arquivos refatorados (PostCard, PostList, Embeds)
- **Grupo 7 (Forms/Modals):** 8 arquivos refatorados (PollCreator, FormActions, Modals)
- **Grupo 8 (Context):** 1 arquivo refatorado (PostContext com Quote Tweet corrigido)
- **Grupo 9 (Pages):** 3 arquivos refatorados (Home, PostDetail, Notifications)

**Decisões Arquiteturais**
- `Post.author` usa `UserCardWithStats` (não `UserPreview`) para suportar AvatarProfilePopover
- Quote Tweet usa `Post.content` + `Post.retweetOf` (backend não retorna campo separado)
- `isOwnProfile` calculado no frontend (não vem do backend)
- Remoção de modelos duplicados e inconsistentes espalhados pelo projeto
- LocationPicker com mock temporário alinhado ao modelo centralizado

### Changed

#### PostContext Refatorado
- Correção de typos: `is_liked` → `isLiked`, `is_retweeted` → `isRetweeted`
- Lógica de `alreadyRetweeted` corrigida (valida `content` vazio)
- Lógica de desfazer retweet corrigida (atualiza post original)
- Extração de `MOCK_CURRENT_USER` para evitar duplicação (DRY)
- Quote Tweet alinhado com estrutura do backend (usa `content` + `retweetOf`)
- Campo `publishedAt` adicionado em `commentPost`

#### PostCard Refatorado
- Substituição de `post.retweetComment` por `post.content.trim()`
- Identificação correta de Retweet Simples vs Quote Tweet
- AvatarProfilePopover temporariamente desabilitado (aguarda integração com API)
- PollPreview corrigido (objeto `votes` construído corretamente)
- Validação de `poll.question` (fallback para string vazia)

#### Profile Page
- Cálculo de `isOwnProfile` implementado (compara usuário logado com perfil visualizado)
- Mock de dados alinhado ao modelo `UserWithFollowState`
- Correção de `handleSaveProfile` (firstName/lastName)
- Handler `onQuoteTweet` implementado

#### OriginalPostEmbed
- Busca de post original via `post.retweetOf`
- Renderização de dados do post original corrigida

#### LocationPicker
- Mock de localizações movido para `src/mocks/locations.ts`
- Estrutura alinhada ao modelo `Location` centralizado
- Busca e filtro de localizações funcionando

### Removed

#### Modelos Duplicados Removidos
- Remoção de types locais em componentes que duplicavam modelos
- Remoção de `retweetComment` do modelo `Post` (campo não existe no backend)
- Remoção de `mockLocations` antigo (estrutura inconsistente)
- Eliminação de ~15 arquivos de types redundantes

### Fixed

#### Correções de Bugs
- PostContext: Estado de retweet não persistia corretamente
- PostCard: AvatarProfilePopover acessava campos inexistentes em `UserPreview`
- PollPreview: Prop `votes` recebia tipo incorreto
- Quote Tweet: Lógica quebrada por uso de campo inexistente (`retweetComment`)
- LocationPicker: Mock incompatível com modelo centralizado

### Metrics

#### Arquivos Refatorados
- 28 arquivos de types atualizados
- 7 modelos centralizados criados
- ~15 arquivos de types duplicados removidos
- ~200 linhas de código duplicado eliminadas

#### Cobertura da Refatoração
- 100% dos componentes usando modelos centralizados
- 100% dos types alinhados com estrutura do backend
- 0 modelos duplicados remanescentes

### Highlights

#### Demonstração de Competências
- Refatoração em larga escala (28 arquivos)
- Alinhamento frontend-backend (análise de APIs reais)
- Quebra intencional para mapeamento de dependências
- Decisões arquiteturais documentadas (isOwnProfile, Quote Tweet, etc)
- Eliminação de technical debt (duplicação, inconsistências)

#### Metodologia Aplicada
- Refatoração incremental (grupos de 2-4 arquivos)
- Validação de cada etapa antes de avançar
- Análise crítica de código (PostContext review)
- Documentação de decisões técnicas

#### Padrões de Design
- **Single Source of Truth**: Modelos centralizados
- **DRY**: Eliminação de duplicação (MOCK_CURRENT_USER, types)
- **Separation of Concerns**: Lógica de UI vs dados do backend
- **Type Safety**: TypeScript rigoroso em todos os componentes

## [0.0.9] - 2026-02-10

### Added

#### Recursos Adicionais de Postagem

**EmojiPicker - Seletor de Emojis**
- Integração com emoji-picker-react
- Tema automático (light/dark) sincronizado
- Busca de emojis por palavra-chave
- Categorias de emojis
- Inserção direta no textarea
- BasePopover para posicionamento

**GifPicker - Seletor de GIFs**
- Integração com Giphy API (@giphy/react-components)
- Busca de GIFs por termo
- Grid responsivo (2 colunas)
- Trending GIFs por padrão
- Scroll infinito de resultados
- Preview ao hover
- Seleção e inserção no post

**LocationPicker - Seletor de Localização**
- 10 localizações mockadas (principais cidades brasileiras)
- Busca por nome da cidade
- Filtro em tempo real
- Coordenadas geográficas armazenadas
- Seleção de localização para posts

**PollCreator - Criador de Enquetes**
- Mínimo 2 opções, máximo 4 opções
- Adição/remoção dinâmica de opções
- Validação de campos obrigatórios
- Seleção de duração (1, 3 ou 7 dias)
- Limite de caracteres por opção (50)
- Limite de caracteres na pergunta (100)

**PostScheduler - Agendador de Posts**
- Integração com react-datepicker
- Locale pt-BR configurado
- Seleção de data e hora
- Intervalo de 15 minutos para hora
- Data mínima: agora + 5 minutos
- Data máxima: agora + 1 ano
- Validação de datas passadas (desabilitadas)

**Componentes de Preview**
- **MediaPreview**: Preview unificado para imagens, GIFs e vídeos
- **LocationPreview**: Exibição de localização (variant: editable/display)
- **PollPreview**: Visualização de enquetes (antes e após votação)
- **SchedulePreview**: Exibição de agendamento (formatação inteligente)

#### Sistema de Regras de Compatibilidade

**Regras Implementadas:**
- Poll OU Mídia (GIF/Imagens)
- Emoji compatível com tudo
- Location compatível com tudo
- Schedule compatível com tudo

**Comportamento:**
- Botões desabilitam dinamicamente baseado no conteúdo
- Mídia é limpa automaticamente ao selecionar tipo incompatível
- Feedback visual (botão desabilitado com opacidade)

#### Melhorias de Arquitetura

**Reorganização de Componentes:**
- ImagePreview movido de Posts/ para Forms/
- MediaPreview unificado (substitui previews separados)
- Todos os previews centralizados em Forms/

**FormActions Expandido:**
- Sistema de refs específicas por botão
- Estado `openPicker` para gerenciar pickers ativos
- Handlers internos para callbacks
- Lógica de desabilitação centralizada
- Renderização condicional de pickers

**useFormModal Expandido:**
- Estado para: gif, location, poll, scheduledFor
- Handlers para todos os recursos
- Cleanup completo ao fechar
- Validação integrada
- Lógica de exclusão mútua

### Changed

#### PostForm (Home)
- Adicionados estados: gif, location, poll, scheduledFor
- Handlers para todos os recursos
- Previews renderizados condicionalmente
- Cleanup expandido no handleSubmit

#### FormModal
- Props expandidas do useFormModal
- Todos os handlers passados para FormActions
- ContentForm recebe todos os estados

#### BaseForm (ContentForm)
- Props expandidas para novos recursos
- Renderização de todos os previews
- Types atualizados

#### PostCard
- Renderização de location (variant: display)
- Renderização de poll (com lógica de votação mockada)
- Renderização de scheduledFor
- Type Post expandido

### Dependencies

#### Added
- `emoji-picker-react`: ^1.x.x (seletor de emojis)
- `@giphy/react-components`: ^9.x.x (componentes Giphy)
- `@giphy/js-fetch-api`: ^5.x.x (API Giphy)
- `react-datepicker`: ^4.x.x (seletor de data/hora)
- `@types/react-datepicker`: ^4.x.x (types do datepicker)
- `date-fns`: ^3.x.x (manipulação de datas)

#### Separation of Concerns
- **Pickers**: Componentes de seleção (UI + lógica de busca)
- **Previews**: Componentes de visualização (editable/display)
- **FormActions**: Orquestração e gerenciamento de estado
- **useFormModal**: Estado centralizado e lógica de negócio

### Metrics

#### Componentes Criados
- 5 Media Actions (Emoji, GIF, Location, Poll, Schedule)
- 4 Preview Components
- 1 MediaPreview unificado
- Total: 10 novos componentes

#### Funcionalidades
- 5 recursos adicionais de postagem
- 3 regras de compatibilidade
- 2 variantes de preview (editable/display)

#### Code Quality
- Types completos para todos os componentes
- Styled-components com theme
- Cleanup de memória (URLs, estados)
- Validações em tempo real
- Feedback visual consistente

### Highlights

#### Demonstração de Competências
- Integração de bibliotecas externas (Giphy, DatePicker, EmojiPicker)
- Gerenciamento de estado complexo (múltiplos recursos)
- Regras de negócio (compatibilidade entre features)
- Componentização avançada (variants, conditional rendering)
- Performance (cleanup, memoization)

#### Decisões Técnicas Documentadas
- Uso de bibliotecas vs implementação manual
- MediaPreview unificado (DRY principle)
- Variants pattern (editable/display)
- Estado centralizado (useFormModal)
- Refs específicas para posicionamento

#### Padrões de Design Aplicados
- **Single Responsibility**: Cada picker tem uma responsabilidade
- **DRY**: MediaPreview unificado, BasePopover reutilizado
- **Open/Closed**: Variants permitem extensão sem modificação
- **Composition**: Pickers compostos em FormActions


## [0.0.8] - 2026-02-07

### Added

#### Sistema de Retweet Completo
- **RetweetPopover**: Menu com opções "Retweet", "Desfazer Retweet" e "Comentar"
- **RetweetModal**: Modal para Quote Tweet (Retweet com comentário)
- **OriginalPostEmbed**: Componente para renderizar post original embutido em Quotes
- **OriginalPostPreview**: Componente para preview compacto de posts (usado em CommentModal)
- **Indicador "X retweetou"**: Feedback visual para retweets simples
- **Quote Tweet**: Funcionalidade completa de retweet com comentário e imagens
- Suporte a Quote de Quote (quotes aninhados)
- Renderização de posts citados no feed e PostDetail

#### Sistema de Modais Genéricos
- **FormModal**: Modal genérico reutilizável para formulários (posts, comentários, quotes)
- **BaseForm**: Formulário genérico com suporte a texto, imagens e conteúdo extra
- **useFormModal**: Hook centralizado para lógica de formulários (estado, validação, submit, cleanup)
- **FormActions**: Componente genérico de ações de formulário (upload, contador, submit)
- **CharCounter**: Contador de caracteres reutilizável

#### Sistema de Popovers com Floating UI
- Migração completa para **@floating-ui/react**
- **BasePopover**: Popover base com scroll tracking automático
- **PopoverContext**: Context API para estratégias de posicionamento dinâmico
- **usePopoverStrategy**: Hook para gerenciar strategy (absolute/fixed) baseado em contexto
- Suporte a estratégias de posicionamento (absolute para scroll tracking, fixed para elementos estáticos)
- Collision detection automático (flip + shift)
- Resize handling automático

#### Gerenciamento de Estado Global
- **PostContext**: Context API para estado global de posts
- **usePost**: Hook para consumir PostContext
- Métodos: `createPost`, `likePost`, `retweetPost`, `quoteTweet`, `commentPost`
- Single Source of Truth para posts em toda aplicação

#### Funcionalidades de Post
- Renderização de imagens em posts (grid adaptativo 1-4 imagens)
- Upload de múltiplas imagens (até 4) em posts, comentários e quotes
- Preview de imagens com remoção individual
- Cleanup de memória (URL.revokeObjectURL)

### Changed

#### Refatoração de Modais
- **CreatePostModal**: Refatorado para usar FormModal (~150 → 25 linhas, -83%)
- **CommentModal**: Refatorado para usar FormModal (~150 → 30 linhas, -80%)
- Linha conectora visual em CommentModal (conecta post original ao comentário)
- Texto "Respondendo a @username" em comentários

#### Refatoração de Popovers
- **BasePopover**: Migrado de implementação manual para Floating UI
- Removido cálculo manual de posicionamento (~80 linhas)
- Removidos listeners de scroll manuais
- Strategy prop adicionada para controle de posicionamento
- Mapeamento de positions customizados para Placement (Floating UI)

#### Estrutura de Componentes
- **PostCard**: 
  - Adicionado suporte a `quotedPost` (renderiza OriginalPostEmbed)
  - Adicionado suporte a `retweetedBy` (renderiza indicador)
  - Callbacks unificados via PostContext
  - Renderização de imagens em grid
- **PostList**: Callbacks propagados do Context
- **PostDetail**: Corrigido para usar post único em vez de array
- **InfoBar**: Envolvida com PopoverProvider para strategy dinâmica

#### Types
- **Post**: Campos adicionados:
  - `images?: string[]`
  - `quotedPost?: OriginalPostProps`
  - `retweetedBy?: { name: string; username: string }`
- **ImageFile**: Tipo criado para gerenciar uploads
- **ExtendedPopoverProps**: Tipo estendido com `strategy` prop

### Removed

#### Componentes Obsoletos
- **CommentForm**: Substituído por BaseForm genérico
- **PostForm** (de common): Movido para pages/Home/components (específico)
- Lógica manual de posicionamento de popovers (~80 linhas)
- Código duplicado em modais (~300 linhas eliminadas)

### Fixed

#### Bugs de Popover
- Popovers não acompanhavam scroll da página
- Tremor em popovers com posicionamento fixo (InfoBar minimal)
- Collision detection inconsistente
- Performance ruim com múltiplos listeners de scroll

#### Bugs de Modal
- Cleanup de memória em imagens não executado corretamente
- Estado de formulários não limpo ao fechar modal
- Validação de caracteres inconsistente

#### Bugs de PostDetail
- Erro ao passar array em vez de objeto para PostCard
- Post não encontrado causava tela branca (agora redireciona)
- Comentários mostravam todos os posts (agora filtrados)

### Dependencies

#### Added
- `@floating-ui/react`: ^0.26.0 (gerenciamento profissional de popovers)

### Architecture

#### Princípios SOLID Aplicados
- **Single Responsibility**: 
  - useFormModal (lógica), BaseForm (UI), FormModal (orquestração)
  - PostContext (estado), usePost (consumo)
- **Open/Closed**: FormModal extensível via props/config
- **Dependency Inversion**: Dependências de abstrações (Floating UI API)

#### Design Patterns
- **Context Pattern**: PostContext (estado global), PopoverContext (strategy)
- **Strategy Pattern**: Posicionamento absolute/fixed de popovers
- **Adapter Pattern**: Mapeamento de positions para Placement
- **Composition**: BaseForm + FormActions + CharCounter = FormModal

#### Separation of Concerns
```
components/
├── Modals/           # Todas as modais
├── Forms/            # Componentes de formulário
├── Posts/            # Componentes relacionados a posts
├── Popovers/         # Todos os popovers
└── common/           # Componentes atômicos reutilizáveis

contexts/             # Estado global (PostContext, PopoverContext)
hooks/                # Custom hooks (usePost, useFormModal, usePopoverStrategy)
```

### Metrics

#### Code Quality
- **Duplicação eliminada**: ~300 linhas
- **Redução de modais**: -83% CreatePostModal, -80% CommentModal
- **Componentes reutilizáveis**: 8 novos (BaseForm, FormModal, etc)
- **Contexts criados**: 2 (PostContext, PopoverContext)
- **Custom hooks**: 3 (usePost, useFormModal, usePopoverStrategy)

#### Performance
- **Scroll tracking**: 0ms overhead (gerenciado por Floating UI)
- **Re-renders**: Otimizados (useCallback, useMemo)
- **Memory leaks**: Resolvidos (cleanup de URLs)

### Highlights

#### Demonstração de Competências
- Identificação de code smells (duplicação de código)
- Aplicação de design patterns (Context, Strategy, Adapter)
- Refatoração incremental sem breaking changes
- Integração de bibliotecas profissionais (@floating-ui/react)
- Arquitetura escalável (separation of concerns)

#### Decisões Técnicas Documentadas
- Escolha de Floating UI vs implementação manual
- Context API para estado global vs prop drilling
- Strategy pattern para comportamento dinâmico
- Composition over inheritance em componentes


## [0.0.7] - 2026-01-29

### Added

**Página de Login (Home Pública):**
- Página de login redesenhada como tela inicial (rota `/`).
- Layout com 3 containers: Logo (esquerda), Formulário (direita), Footer (rodapé).
- Título "Acontecendo agora" (64px, heavy) e subtítulo "Inscreva-se no X" (32px, heavy).
- Botões de inscrição: Google, Apple e "Criar conta".
- Seção "Já tem uma conta?" com botão "Entrar".
- Footer genérico com links do site.

**RegisterModal (Modal de Registro):**
- Modal de registro com 2 etapas (informações básicas e completar cadastro).
- Etapa 1: Nome, Celular/E-mail (toggle), Data de nascimento.
- Etapa 2: Nome de usuário, Senha, Confirmar senha.
- Inputs com labels flutuantes (igual SearchBar).
- Focus azul nos inputs ativos.
- Botão "Avançar" desabilitado até preencher todos os campos.
- Botão do footer muda de "Avançar" para "Criar conta".
- Validação por etapa (nome, email/celular, data, username, senha).
- Toast de sucesso ao criar conta.
- Redireciona para `/home` após registro.

**LoginModal (Modal de Login):**
- Modal de login com 3 etapas (identificador, senha, signup).
- Etapa 1: Identificador (telefone, e-mail ou username) + botões sociais (Google, Apple).
- Etapa 2: Senha (input de identificador desabilitado e opaco).
- Etapa 3: Signup (mesma tela da página de Login com opção "Criar conta").
- Inputs com labels flutuantes.
- Botão "Não tem uma conta? Inscreva-se" na etapa 1.
- Botão "Criar conta" abre RegisterModal.
- Toast de sucesso ao fazer login.
- Redireciona para `/home` após login.

**Sistema de Autenticação:**
- AuthContext para gerenciamento de sessão.
- AuthProvider com login, register, logout.
- Persistência de sessão com localStorage.
- ProtectedRoute para proteger rotas privadas.
- Redireciona para `/` se não autenticado.
- useAuth hook para acessar contexto de autenticação.

**Toasts de Autenticação:**
- Login bem-sucedido: "Bem-vindo de volta!"
- Registro bem-sucedido: "Conta criada com sucesso!"
- Logout: "Você saiu da sua conta"
- Erro de login: "E-mail ou senha incorretos"
- Erro de registro: "Erro ao criar conta. Tente novamente."

**Navegação em NotificationCard:**
- Avatar clicável navegando para perfil do usuário.
- Username clicável navegando para perfil do usuário.

**CommentModal:**
- Modal de comentário ao clicar no ícone 💬 no feed.
- Exibe post original (compacto, read-only) com avatar, nome, username e timestamp.
- Campo de texto para comentário com auto-expansão (igual PostForm).
- PostCharCounter e PostFormActions integrados.
- Suporte a upload de imagens no comentário.
- Botão "Responder" no footer com loading state.
- Toast de sucesso ao enviar comentário.
- Fecha modal automaticamente após enviar.
- Texto "Respondendo a @username" entre post original e campo de comentário.

**CommentForm (Global):**
- Componente CommentForm movido para common (reutilizável).
- Mesma funcionalidade do PostForm (imagens, contador, actions).
- Auto-expansão de textarea baseada em scrollHeight.
- Renderização condicional de actions (inline ou no footer da modal).

**PostCharCounter (Global):**
- Componente PostCharCounter movido para common (reutilizável).
- Usado em PostForm, CommentForm e modals.

**PostFormActions (Global):**
- Componente PostFormActions movido para common (reutilizável).
- Usado em PostForm, CommentForm e modals.

### Changed

**Rotas:**
- Rota `/` agora renderiza página de Login (antes era redirect).
- Rotas `/login` e `/register` removidas.
- Todas as rotas exceto `/` são protegidas com ProtectedRoute.
- Navegação direta via URL para rotas protegidas redireciona para `/` se não autenticado.

**App.tsx:**
- BrowserRouter substituiu RouterProvider (necessário para AuthContext).
- AuthProvider envolvendo toda a aplicação.
- Ordem de Providers: ThemeProvider → ToastProvider → BrowserRouter → AuthProvider.

**Sidebar:**
- Botão "Sair" no menu do perfil agora executa logout real.
- Toast de confirmação ao fazer logout.

**NotificationCard:**
- NotificationCard agora possui navegação completa para perfis.

**PostCard:**
- Click no ícone 💬 abre CommentModal.
- Estado `isCommentModalOpen` para controlar abertura da modal.

**PostDetail:**
- Click no ícone 💬 abre CommentModal (igual PostCard).
- Toast de sucesso ao comentar via PostDetail.
- Loading no botão "Responder" do CommentForm inline.

**Arquitetura:**
- PostCharCounter, PostFormActions e CommentForm agora são componentes globais.
- Componentes reutilizáveis entre PostForm, CommentForm, CreatePostModal e CommentModal.
- Padrão consistente: actions no footer quando em modal, inline quando em página.

### Removed

- Página `/register` removida (agora é modal).
- Página `/login` removida (rota `/` é o login).
- Rota duplicada `/login` removida.

### Fixed

- Fast Refresh warning no AuthContext (adicionado eslint-disable).
- Validação de formulários com tipagens corretas (RegisterData type).
- Labels flutuantes funcionando corretamente em todos os inputs.

### Technical

**AuthContext:**
- User type: id, name, username, email, avatar.
- RegisterData type: name, contact, birthDate, username, password.
- Estado de usuário persistido em localStorage.
- isAuthenticated derivado do user (não é estado separado).
- login e register são callbacks memoizados.

**ProtectedRoute:**
- Usa `<Outlet />` para renderizar rotas filhas.
- Redireciona para `/` com `<Navigate to="/" replace />`.
- Integrado com useAuth para verificar autenticação.

**Modals:**
- RegisterModal com 2 etapas (basic, complete).
- LoginModal com 3 etapas (identifier, password, signup).
- Inputs flutuantes com estados $hasValue, $isFocused, $hasError.
- Footer dinâmico baseado na etapa atual.
- Reset completo ao fechar modal.

**Persistência:**
- localStorage.setItem('user', JSON.stringify(user)) ao login/register.
- localStorage.removeItem('user') ao logout.
- Inicialização do AuthProvider lê do localStorage.

**Navegação:**
- useNavigate aplicado em NotificationCard.
- onClick no avatar e username redirecionando para `/:username`.

**CommentModal:**
- Portal rendering via Modal component.
- Post original exibido com linha vertical conectando ao campo de comentário.
- Textarea com min-height 100px, auto-expansão e placeholder "Poste sua resposta".
- Footer com botão "Responder" (disabled se vazio, loading durante submit).
- Estado local de `comment` e `isSubmitting`.

**CommentForm:**
- Props: onSubmit, currentUserAvatar, currentUserName, isModal, renderActions.
- isModal controla se renderiza actions inline ou via renderActions callback.
- Suporta imagens com ImageUpload e ImagePreview.
- MaxLength 280 caracteres.

**Componentes Globais:**
- src/components/common/PostCharCounter/
- src/components/common/PostFormActions/
- src/components/common/CommentForm/
- src/components/common/CommentModal/

### Known Issues (v0.1.0+)

- Contador de comentários não incrementa após enviar (precisa de state management global).
- Toast com erro ao enviar comentário via modal (precisa de models de entidade User/Post padronizados).
- Imagens enviadas no comentário não aparecem no post criado (precisa de API de upload).
- currentUserAvatar e currentUserName são props hardcoded (precisa integrar com AuthContext via models).


## [0.0.6] - 2026-01-23

### Added

**Ícones de Mídia no PostForm:**
- Ícones Image, Smile, BarChart2, MapPin, Calendar com tooltips para acessibilidade.
- Botões circulares (36x36px) com hover azul claro.
- Estrutura preparada para funcionalidades futuras (upload, emoji, enquete, localização, agendar).

**Upload de Imagens:**
- Componente `ImageUpload` global para seleção de até 4 imagens.
- Componente `ImagePreview` global com grid responsivo e botão remover.
- Validações: tipos permitidos (jpg, png, gif, webp), tamanho máximo 5MB por imagem.
- Layout grid adaptativo: 1 imagem (full), 2 (50/50), 3 (grande + 2 pequenas), 4 (grid 2x2).
- Preview de imagens antes de postar com URL.createObjectURL.
- Limpeza automática de memória com URL.revokeObjectURL.

**Modal de Criar Post:**
- Componente `CreatePostModal` reutilizando `PostForm`.
- Botão "Postar" na Sidebar abre modal para criar posts.
- PostFormActions renderizado no footer da modal (comportamento igual ao Twitter).
- Estado isolado entre Home e Modal através da prop `isModal`.

**PostForm Refatorado:**
- PostForm agora é componente global em `src/components/common/`.
- Prop `isModal` para isolar estado (cleanup ao desmontar modal).
- Prop `renderActions` para renderização customizada de actions.
- Props `userName` e `userAvatar` para exibir dados do usuário.
- PostFormActions extraído como componente independente.
- Suporte a `inputRef` em ImageUpload para múltiplas instâncias.

**PostFormActions:**
- Componente global independente com todas as ações (ícones + botão Postar).
- Integração com `PostCharCounter` para exibir contador de caracteres.
- Props: content, images, isDisabled, maxLength, onImageUpload, onSubmit.

**Home:**
- Adicionadas props `userName` e `userAvatar` no PostForm (mock de usuário).

**Página Seguindo/Seguidores:**
- Página FollowPage com tabs Seguindo e Seguidores.
- Componente FollowTabs para navegação entre tabs.
- Componente FollowUserCard com avatar, nome, @username, bio e botão Seguir/Seguindo.
- Rotas dinâmicas: `/:username/following` e `/:username/followers`.
- Header com blur effect, BackButton e informações do usuário.
- Estados vazios com mensagens informativas quando não há usuários.
- Navegação no ProfileStats: click em "Seguindo" ou "Seguidores" redireciona para página correspondente.

**Hook Global:**
- Hook `useScrollToTop` para resetar scroll ao topo em todas as navegações.
- Aplicado em 7 páginas: Connect, Explore, Home, Notifications, PostDetail, Profile, FollowPage.

**Navegação e Interações:**
- TrendsWidget: click em trend navega para Explore com tab "Assuntos do Momento" e SearchBar preenchida.
- WhoToFollowWidget: click em usuário navega para perfil correspondente.
- PostCard: avatar, displayName e username clicáveis navegando para perfil do autor.
- AvatarProfilePopover: hover no avatar exibe popover com informações do usuário.
  - Exibe avatar, nome, username, bio, seguindo/seguidores.
  - Botão Seguir/Seguindo integrado.
  - Largura máxima de 300px.
  - Posicionamento dinâmico (acima ou abaixo baseado no viewport).
  - Delay de 500ms para abrir, 300ms para fechar.
  - Mouse no popover cancela fechamento.

**SearchBar:**
- Prop `value` para controle externo do valor.
- Prop `onSearch` para callback de busca.
- Sincronização com prop externa via useEffect.

**Explore:**
- Detecção de query params da URL (`q` e `tab`).
- Estado derivado da URL (sem useState/useEffect).
- SearchBar preenchida automaticamente ao navegar de TrendsWidget.
- Tab "Assuntos do Momento" ativada ao clicar em trend.

**Sistema de Toasts:**
- Componente Toast com 4 tipos (success, error, info, warning).
- ToastContext e hook useToast para gerenciamento global.
- ToastContainer renderizado via Portal (document.body).
- Auto-dismiss configurável (padrão 3s).
- Animações slide in/out suaves.
- Click para fechar manualmente.

**Spinner Component:**
- Spinner reutilizável com 3 tamanhos (small, medium, large).
- Animação CSS de rotação (0.6s linear infinite).
- Suporte a cores customizáveis (usa currentColor por padrão).

**Button com Loading State:**
- Prop `loading` adicionada ao Button.
- Spinner exibido automaticamente quando loading=true.
- Botão desabilitado durante loading (cursor: wait).
- Gap de 8px entre spinner e texto.

**Skeleton Loaders:**
- Skeleton base com 3 variantes (text, circle, rect).
- Animação shimmer gradient (1.5s).
- PostSkeleton e PostListSkeleton para feed de posts.
- PostDetailSkeleton para página de post individual.
- UserCardSkeleton e UserCardListSkeleton para listas de usuários.
- NotificationSkeleton e NotificationListSkeleton para notificações.

**Toasts Implementados:**
- Criar post (PostForm e CreatePostModal).
- Seguir/Deixar de seguir (ProfileHeader, FollowUserCard, AvatarProfilePopover, UserSuggestionCard, WhoToFollowWidget).
- Editar perfil (EditProfileModal - sucesso ao salvar).
- Editar data de nascimento (BirthDateModal - sucesso + edições restantes).

**Loading States Implementados:**
- Botão Seguir/Seguindo (5 componentes).
- Botão Postar (PostForm e CreatePostModal).
- Botão Salvar (EditProfileModal e BirthDateModal).

**Skeletons Implementados:**
- Home (PostListSkeleton - feed principal).
- Profile (PostListSkeleton - posts do usuário).
- Explore (PostListSkeleton - posts da busca).
- PostDetail (PostDetailSkeleton - post individual + PostListSkeleton - comentários).
- FollowPage (UserCardListSkeleton - seguindo/seguidores).
- Connect (UserCardListSkeleton - sugestões de usuários).
- Notifications (NotificationListSkeleton - lista de notificações).


### Changed

**PostForm:**
- Botão "Postar" ativa com conteúdo textual OU imagens.
- Estado de imagens gerenciado localmente (array de ImageFile).
- Botão "Adicionar imagem" desabilitado ao atingir 4 imagens.

**ImageUpload:**
- Suporte a `inputRef` via props (ao invés de forwardRef).
- Permite múltiplas instâncias sem conflito de querySelector.

**Modal (ModalHeader e ModalFooter):**
- Padding ajustado de `16px` para `8px 16px` (altura mais confortável).

**Textarea:**
- Prop `isModal` removida (não utilizada, mantido visual com 1 row).

**FollowPage:**
- Estado activeTab derivado diretamente da URL (sem useState/useEffect).
- getCurrentTab() detecta tab atual pelo location.pathname.

**Navegação:**
- Click no card do usuário redireciona para perfil (/:username).
- ProfileStats agora navegável (click em estatísticas).

**Avatar:**
- Props adicionadas: `showProfilePopover`, `userProfileData`, `onFollowToggle`.
- Sistema de hover com timers para abrir/fechar popover.
- Suporte a múltiplos contextos (PostCard, WhoToFollowWidget, etc).

**Explore:**
- Estado `activeTab` e `searchQuery` derivados de `searchParams` (URL como fonte única de verdade).
- handleTabChange mantém query ao trocar de tab.
- handleSearch atualiza URL com query e tab.

**TrendsWidget:**
- Click em trend navega para `/explore?q=<trend>&tab=trending`.
- Botão "Mostrar mais" navega para `/explore?tab=trending`.
- Remoção de `#` do nome da trend antes de encodar URL.

**WhoToFollowWidget:**
- Click em usuário navega para `/:username`.

**PostCard:**
- Avatar, displayName e username com `onClick` navegando para perfil.
- Integração com AvatarProfilePopover no avatar.

**Button Component:**
- Adicionada prop `loading?: boolean`.
- Cursor muda para `wait` quando loading.
- Renderiza Spinner antes do children quando loading=true.
- Desabilita onClick automaticamente durante loading.

**Componentes com Loading:**
- Estado `isLoading` ou `isSubmitting` adicionado em 9 componentes.
- Handlers agora são async e simulam delay.
- WhoToFollowWidget usa Set<string> para loading individual por usuário.


### Fixed

- Loop infinito no useEffect do PostForm (images nas dependências causava reset).
- ImageUpload não funcionava na modal (querySelector global pegava input errado).


### Technical

- MediaIcons container com gap de 4px entre ícones.
- IconButton: 36x36px, cor primary, transição suave.
- Ícones lucide-react: size 20px, strokeWidth 2.
- ImageFile type: { file: File, preview: string, id: string }.
- Grid CSS dinâmico baseado na quantidade de imagens.
- Botão remover: backdrop-filter blur(4px), posicionamento absoluto.
- Componentes reutilizáveis em src/components/common/.
- PostForm movido para `src/components/common/PostForm/`.
- PostFormActions em `src/components/common/PostFormActions/`.
- ImageUpload com inputRef via props para instâncias isoladas.
- Estado de images gerenciado localmente em cada PostForm.
- Prop `isModal` controla isolamento de estado (não altura de textarea).
- Estado derivado da URL: fonte única de verdade, sem sincronização.
- useScrollToTop: hook reutilizável, executa window.scrollTo(0, 0) a cada mudança de pathname.
- FollowUserCard: click no card navega, click no botão stopPropagation (não navega).
- Mock data: mockFollowing e mockFollowers com isFollowing controlado localmente.
- Header sticky com blur adaptativo (background.blur do theme).
- AvatarProfilePopover renderizado via Portal (document.body).
- useLayoutEffect para cálculo de posição antes do paint.
- Detecção de espaço disponível (viewport) para decidir posição (top/bottom).
- Click fora do popover fecha automaticamente.
- Timers com refs para controle de abertura/fechamento (evita memory leaks).
- SearchBar sincroniza valor externo com estado interno via useEffect.
- Explore: URL params como fonte única de verdade (sem sincronização useState).
- encodeURIComponent usado em query params para segurança.

**Toast System:**
- Portal rendering (document.body) com z-index 9999.
- Context API para estado global de toasts.
- Array de toasts empilhados verticalmente (gap 12px).
- Auto-remove após duração customizável.
- Keyframes slideIn/slideOut para animações.

**Spinner:**
- Border-top transparente para efeito de rotação.
- Tamanhos: small (14px), medium (18px), large (24px).
- Border-width proporcional ao tamanho.

**Skeleton:**
- Shimmer: linear-gradient animado (background-position).
- Cores adaptativas do theme (border.primary → hover.primary).
- Variants calculados dinamicamente (circle = border-radius 50%).
- PostDetailSkeleton sem lista (sempre renderiza 1 só).
- WhoToFollowWidget com loading por usuário (loadingUserIds Set).

### Known Issues (v0.0.7+)
- Posts criados não incluem imagens (onSubmit só recebe texto).
- Posts criados na modal não aparecem na Home (falta state management global).

---

## [0.0.5] - 2026-01-20

### Added

**Refatoração Visual Completa:**
- Integração da biblioteca lucide-react para ícones consistentes em todo o projeto.
- Fonte Chirp (regular, medium, bold, heavy) para maior fidelidade ao design original.
- Sistema de sombras (primary, secondary) nos temas light e dark.
- Novo sistema de layouts principais (LayoutWrapper, HeaderSection, MainSection, ContentWrapper) para comportamento responsivo.
- Efeito de blur adaptativo nos tabs e headers (background.blur: light 85%, dark 65%).

**Home - Reestruturação:**
- Componente HomeTabs separado com tipagem encapsulada (ActiveTab).
- Sistema de filtragem de posts: "Para você" (todos) e "Seguindo" (filtrado por isFollowing).
- Propriedade isFollowing adicionada no tipo Author.
- Blur adaptativo nos tabs usando theme (background.blur).

**Editar Perfil:**
- Modal de edição completa com upload de banner e avatar.
- Campos: nome, bio, localização, website, data de nascimento.
- Modal secundária para editar data de nascimento (limite de 3 alterações).
- Hook useModalScrollLock para gerenciar scroll em modais aninhadas.
- Campo de visualização da data de nascimento no perfil.

**Explore:**
- Botão de voltar (BackButton) ao focar na SearchBar.
- Sistema de scroll horizontal nos tabs com setas de navegação.
- Setas aparecem apenas no hover e quando há overflow.
- Tab "Tendências" renomeada para "Assuntos do Momento".

**SearchBar:**
- Sistema de variants (small: 350px, large: 568px).
- SearchPopover com larguras fixas por variant.
- Prop onFocus para integração com BackButton.

**Componentes Globais:**
- Input: suporte a multiline, rows, maxLength, type="date", type="url".
- Textarea: expansão automática baseada em scrollHeight, separador visual com contador.
- Modal: suporte a modais aninhadas sem conflito de scroll lock.

### Changed

**Estrutura do Projeto:**
- HomeLayout removido: código movido para pages/Home/index.tsx.
- PostForm movido de components/layout para pages/Home/components.
- HomeTabs extraído como componente separado.

**Componentes Atualizados:**
- Todos os ícones SVG substituídos por lucide-react (exceto setas de navegação).
- PostCard: ícones MessageCircle, Repeat2, Heart, BarChart2.
- SearchBar: ícones Search e X.
- NotificationItem: ícones Heart, Repeat2, UserPlus, AtSign, MessageCircle.
- Messages: ícone Mail no placeholder.
- Login/Register: ícone Twitter (X).
- ProfileHeader: ícones MapPin, Link, Calendar.
- SearchPopover: ícones Search, User, X.
- BackButton: seta SVG nativa (lucide não tem equivalente exato).

**Ajustes de Layout:**
- InfoBar: hover "Show more" com border-radius (0 0 16px 16px), separator sem margin na variant minimal.
- PostForm: altura ajustada, textarea com auto-expansão.
- Connect: tabs 53px, margin-bottom 8px.
- Profile: avatar realinhado, botão "Editar" fora do banner.
- Headers: blur effect em Explore, Notificações, Seguir, Perfil.

### Fixed

**Bugs Corrigidos:**
- SearchBar Popover: posicionamento na primeira abertura (resolvido com variants fixas).
- Modais aninhadas: scroll não bloqueado (resolvido com useModalScrollLock).
- Data de nascimento: salvava -1 dia (timezone corrigido com construtor local).
- Data de ingresso: quebrava com ISO completo (split('T')[0] adicionado).
- Explore Tabs: setas apareciam incorretamente (tolerância 5px no scroll).

### Technical

- Sistema @font-face para Chirp com pesos 400, 500, 700, 800.
- Sombras padronizadas: shadow.primary, shadow.secondary.
- Blur: backdrop-filter blur(12px) com background.blur do theme.
- useModalScrollLock: contador global para múltiplas modais.
- formatBirthDate: split de string para evitar timezone.
- formatDate: suporta ISO completo e data simples.
- Ícones lucide: size 16-24px, strokeWidth 1.5-2.
- Grid CSS dinâmico no ImagePreview baseado em count.

### Removed

- components/layout/HomeLayout completamente removido.

---

## [0.0.4] - 2026-01-18

### Added

**Autenticação Visual:**
- Componente Input reutilizável com validação e estados de erro.
- Página de Login com formulário de autenticação.
- Página de Registro com validações completas (email, username, senha).

**Layouts e Rotas:**
- MainLayout para gerenciar layout com Sidebar.
- Rotas condicionais: páginas públicas (Login, Registro) sem Sidebar, privadas (Home, Perfil) com Sidebar.
- Nested routes com React Router Outlet.

**Páginas de Conteúdo:**
- Página de Perfil: banner, avatar, ProfileHeader, ProfileStats, ProfileTabs.
- Página Post Individual (PostDetail): post expandido, CommentForm, navegação ao clicar.
- Página Explorar: SearchBar central, ExploreTabs (5 categorias), TrendsWidget com showAll.
- Página Notificações: NotificationItem, NotificationTabs, sistema de lidas/não lidas.
- Página Conectar: ConnectTabs, UserSuggestionCard, botões Seguir/Inscrever-se.
- Página Mensagens: placeholder para funcionalidade futura.

**Componentes Base:**
- Modal Base: Portal, overlay, header/footer customizáveis, fecha com ESC e click fora.
- Popover: posicionamento dinâmico, variantes de estilo, shadows temáticas.
- BackButton: componente global reutilizável.

**SearchBar Popover:**
- Estado 1 (vazio): mensagem informativa.
- Estado 2 (histórico): ClearSearchModal, botões de remoção individual, tipos diferenciados (busca/usuário).
- Estado 3 (pesquisando): sugestões filtradas, resultados de usuários, scroll customizado (max 480px).

**Sidebar e InfoBar:**
- Menu "Mais" com Popover (4 opções: Configurações, Sobre, GitHub, API Docs).
- Menu Popover do perfil (Adicionar conta, Sair).
- InfoBar com variantes por rota (SearchBar, Separator).

### Changed

**Estrutura de Rotas:**
- Rota dinâmica `/:username` para perfis.
- Rota dinâmica `/:username/status/:postId` para posts (padrão Twitter).
- SearchBar movido de InfoBar/components para common (global).
- InfoBar aceita variants, configura-se automaticamente por rota.

**Componentes:**
- PostCard navega ao ser clicado.
- Notificações marcam como lidas ao clicar.
- Button aceita onClick com evento opcional (stopPropagation).
- Sidebar usa array de navegação com map().
- Modal usa useLayoutEffect para cálculos de posição.

### Technical

- localStorage para persistir notificações lidas/não lidas.
- Popover: useLayoutEffect, matchTriggerWidth, position bottom-left.
- SearchPopover: 3 estados (empty, history, searching), filtragem na SearchBar.
- Compensação de scrollbar em modais.
- Scrollbar sempre visível globalmente.
- Validações: formato email, username alfanumérico, confirmação senha.

---

## [0.0.3] - 2026-01-14

### Added

**Temas e Estilos:**
- Temas light e dark.
- Fonte Roboto aplicada via GlobalStyle.

**Componentes Comuns:**
- Pasta common para reutilizáveis.
- Button: múltiplas variações, estado ativo.
- Avatar, Textarea, PostCard, PostList.

**Layout da Home:**
- HomeLayout: PostForm, botões "Para você" e "Seguindo".
- SideBar: navegação lateral baseada em rotas.
- InfoBar: SearchBar, TrendsWidget, WhoToFollowWidget, Footer.
- Integração ao MainContainer.

### Changed

- Evolução da estrutura para suportar múltiplos layouts.
- Remoção do Header global em favor de header específico da Home.
- Padronização do tema nos componentes.

### Technical

- Estrutura visual e arquitetural da Home consolidada antes do feed dinâmico.

---

## [0.0.2] - 2026-01-10

### Added

**Estruturação do Projeto:**
- Branch `feature/project-structure`.
- Separação por responsabilidades: components, pages, routes, services, styles.
- Styled Components como solução de estilização.
- Tema global: paleta de cores e breakpoints.
- GlobalStyle e exports centralizados.
- Fonte Roboto como tipografia base.

**Rotas e Navegação:**
- React Router configurado.
- Rota inicial para página Home.
- BrowserRouter como estrutura base de navegação.

**Página Home:**
- Estrutura base com Header simples.
- Integração de tema, estilos globais e rotas no App.tsx.

### Changed

- Remoção de arquivos boilerplate do Vite.
- Padronização de imports após reorganização.
- Remoção do React.StrictMode para garantir funcionamento correto do createGlobalStyle (ciclo de montagem dupla do StrictMode com Vite causava CSS global inconsistente).

---

## [0.0.1] - 2026-01-10

### Added

**Setup Inicial:**
- Repositório criado com README.
- Projeto base: Vite + React + TypeScript.
- Branch `feature/project-setup`.

**Configurações:**
- .editorconfig, .prettierrc.
- eslint.config.js (Flat Config).
- .vscode/settings.json: automatiza ESLint ao salvar, desabilita formatação padrão.
- .gitignore ajustado para Vite + React + TypeScript.

**Decisões Técnicas:**
- .vscode/settings.json versionado para padronização de lint e formatação.
