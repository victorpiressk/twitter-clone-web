# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
