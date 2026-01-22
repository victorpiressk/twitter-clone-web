# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.0.6] - 2026-01-21

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
