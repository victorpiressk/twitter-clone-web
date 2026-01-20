# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - 2026-01-20

### Added

- Integração da biblioteca lucide-react para ícones consistentes.
- Fonte Chirp (regular, medium, bold, heavy) para maior fidelidade ao design original.
- Sistema de sombras (primary, secondary) nos temas light e dark.
- Efeito de blur no scroll do feed (igual ao site original).
- Novo sistema de layouts principais para comportamento responsivo.
- Implementação de filtragem de posts por tabs na Home (Para você / Seguindo).
- Adição de propriedade `isFollowing` no tipo Author para controle de seguimento.
- Criação do componente HomeTabs separado com tipagem própria.
- Sistema de blur adaptativo nos themes (background.blur para light e dark).
- Modal de edição de perfil completa com upload de banner e avatar.
- Campos de edição: nome, bio, localização, website e data de nascimento.
- Modal secundária para edição de data de nascimento com limite de 3 alterações.
- Hook `useModalScrollLock` para gerenciar scroll em modais aninhadas.
- Campo de visualização da data de nascimento no perfil do usuário.
- Componente `HomeTabs` separado com tipagem encapsulada.
- Sistema de filtragem de posts: "Para você" (todos) e "Seguindo" (filtrados por isFollowing).
- Textarea com expansão automática baseada em `scrollHeight`.
- Separador visual entre textarea e contador de caracteres no PostForm.
- Botão de voltar (BackButton) que aparece ao focar na SearchBar.
- Sistema de scroll horizontal nos tabs com setas de navegação (esquerda/direita).
- Setas aparecem apenas no hover e quando há overflow.
- Sistema de variants (small/large) para SearchBar e SearchPopover.
- Cor de background `reverseBlur` para botões de navegação dos tabs.
- Sistema de blur adaptativo em headers de páginas (Explore, Notificações, Seguir, Perfil).

### Changed

- Refatoração visual completa: todos os componentes ajustados para maior fidelidade ao Twitter/X.
- Substituição de SVGs inline por ícones do lucide-react em todos os componentes.
- Ajustes de dimensionamento, espaçamento e padding globais.
- Atualização de hovers com sistema de sombras primary/secondary.
- Tamanhos de fontes ajustados para aproximar do original.
- Tamanhos de avatares atualizados para padrão do site original.
- Padding dos botões ajustado para visual mais próximo do original.
- SearchBar: padding, fonte e ícone atualizados.
- Tabs do HomeLayout com estilo atualizado e blur effect.
- InfoBar: hovers atualizados com novo sistema de sombras.
- Sidebar: ícones lucide-react e dimensionamentos ajustados.
- MainLayout agora usa propriedades dos novos layouts globais.
- Todas as páginas adaptadas ao novo sistema de layouts.
- Componentes globais (BackButton, CloseButton, ModalHeader, PostCard) atualizados com novos hovers.
- Refatoração completa da estrutura da Home: código do HomeLayout movido para pages/Home/index.tsx.
- PostForm movido de components/layout para pages/Home/components (componente específico da Home).
- HomeTabs extraído para componente separado com encapsulamento correto de tipagem.
- Tab "Para você" exibe todos os posts; tab "Seguindo" filtra apenas posts de usuários seguidos.
- HeaderContainer dos tabs agora usa background.blur do tema ao invés de cor fixa.
- Blur effect nos tabs se adapta automaticamente ao tema ativo (light: 85% opacidade, dark: 65% opacidade).
- Substituição de todos os ícones SVG restantes por lucide-react.
- PostCard: ícones de ações atualizados (MessageCircle, Repeat2, Heart, BarChart2).
- SearchBar: ícones de busca (Search) e limpar (X) atualizados.
- NotificationItem: ícones de notificação atualizados (Heart, Repeat2, UserPlus, AtSign, MessageCircle).
- Messages (placeholder): ícone atualizado (Mail).
- Login/Register: ícone do Twitter (X) adicionado.
- Fonte Chirp integrada (regular, medium, bold, heavy) em todo o projeto.
- Todos os ícones SVG substituídos por lucide-react (exceto setas de navegação).
- Sistema de sombras (primary, secondary) padronizado nos temas light e dark.
- Blur effect adaptativo nos tabs e headers (background.blur).
- Layouts globais atualizados para comportamento responsivo.
- Home: código do HomeLayout movido para `pages/Home/index.tsx`.
- PostForm movido de `components/layout` para `pages/Home/components`.
- HomeTabs extraído para componente separado com encapsulamento de tipagem.
- Input: suporte a `multiline`, `rows`, `maxLength`, `type="date"` e `type="url"`.
- Modal: suporte a modais aninhadas sem conflito de scroll lock.
- SearchBar: prop `onFocus` para integração com BackButton.
- Textarea (PostForm): expansão automática e separador visual.
- InfoBar: hover do botão "Show more" com border-radius correto (0 0 16px 16px).
- InfoBar: removida margin do Separator na variant minimal.
- PostForm: altura ajustada para aproximar do layout original.
- Connect (Seguir): tabs redimensionados para 53px, margin-bottom de 8px.
- Profile: avatar realinhado, botão "Editar" reposicionado fora do banner.
- Explore: tab "Tendências" renomeada para "Assuntos do Momento".
- Páginas Explore, Notificações, Seguir e Perfil agora com blur effect.
- Comportamento consistente com Home (já implementado anteriormente).

### Fixed

- SearchBar Popover: bug de posicionamento na primeira abertura (resolvido com variants fixas).
- Modais aninhadas: scroll não era bloqueado corretamente (resolvido com useModalScrollLock).
- Data de nascimento: salvava com um dia a menos devido a timezone (resolvido com construtor local de datas).
- Data de ingresso (joinedAt): quebrava com formato ISO completo (resolvido com split('T')[0]).
- Explore Tabs: setas de navegação apareciam/sumiam incorretamente (tolerância de 5px no scroll).

### Technical

- Sistema de @font-face para fonte Chirp com múltiplos pesos (400, 500, 700, 800).
- Mapa de pesos de fontes atualizado no globalStyles.
- Sistema de sombras nos temas para uso consistente (shadow.primary, shadow.secondary).
- Novo sistema de layouts globais (Container, MainContainer) no globalStyles.
- Blur effect implementado com backdrop-filter no scroll do feed.
- Padronização de nomenclatura: background → background.primary/secondary.
- Todos os ícones SVG substituídos por componentes lucide-react (tree-shakeable).
- Filtro de posts implementado com useMemo para otimização de performance.
- Tipagem ActiveTab encapsulada em HomeTabs/types.ts (fonte de verdade).
- Home importa ActiveTab do HomeTabs, mantendo encapsulamento correto.
- PostList continua global em components/common (reutilizável em múltiplas páginas).
- Sistema de blur usa props do theme (background.blur) para adaptação automática.
- Todos os ícones agora usam lucide-react com controle via props (size, strokeWidth).
- Ícones usam stroke ao invés de fill (exceto Heart preenchido quando curtido).
- Tamanho padrão de ícones: 18px (ações), 24px (notificações), 16px (busca).
- strokeWidth padrão: 2 (ícones menores), 1.5 (ícones grandes).
- Hook `useModalScrollLock` com contador global para modais aninhadas.
- Tipagem `ActiveTab` encapsulada em `HomeTabs/types.ts` (fonte de verdade).
- Sistema de variants para SearchBar e SearchPopover (small/large).
- Função `formatBirthDate` com split de string para evitar conversão de timezone.
- Função `formatDate` com suporte a formato ISO completo e data simples.
- Todos os ícones migrados para lucide-react (tree-shakeable).
- Tamanhos padronizados: 16px (busca), 18px (ações), 20px (navegação), 24px (notificações).
- strokeWidth padrão: 2 (ícones menores), 1.5 (ícones grandes).
- Exceções mantidas em SVG nativo: setas de navegação (BackButton, ScrollButtons).
- Background blur nos temas: light (85% opacidade), dark (65% opacidade).
- ReverseBlur para botões sobre backgrounds claros/escuros.

### Removed

- Remoção completa de components/layout/HomeLayout (código transferido para pages/Home).

## [0.0.4] - 2026-01-18

### Added

- Criação do componente Input reutilizável com suporte a validação e estados de erro.
- Implementação da página de Login com formulário de autenticação.
- Implementação da página de Registro com formulário de cadastro e validações completas.
- Criação do componente MainLayout para gerenciar layout com Sidebar.
- Configuração de rotas com layouts condicionais (com e sem Sidebar).
- Criação da página de Perfil com banner, avatar e informações do usuário.
- Implementação do ProfileHeader com metadata (localização, website, data de entrada).
- Criação do ProfileStats exibindo seguindo e seguidores.
- Implementação do ProfileTabs para navegação entre Posts, Respostas, Mídia e Curtidas.
- Adição de botão Seguir/Seguindo e Editar perfil no ProfileHeader.
- Criação da página Post Individual (PostDetail) com post expandido.
- Implementação do PostDetailCard com estatísticas detalhadas e data completa.
- Criação do CommentForm para adicionar comentários em posts.
- Adição de navegação ao clicar em posts (redirecionamento para página individual).
- Criação da página Explorar com SearchBar central e tabs de navegação.
- Implementação do componente ExploreTabs com 5 categorias (Para você, Tendências, Notícias, Esportes, Entretenimento).
- Adição de prop `showAll` no TrendsWidget para exibir todos os trends.
- Criação da página de Notificações com lista de interações do usuário.
- Implementação do NotificationItem com ícones coloridos por tipo (like, retweet, follow, mention, reply).
- Criação do NotificationTabs com filtros "Tudo" e "Menções".
- Adição de sistema de notificações lidas/não lidas com indicador visual (cor de fundo diferente).
- Implementação de navegação ao clicar em notificações (redireciona para perfil ou post).
- Persistência local de estado de notificações usando localStorage (simula comportamento da API).
- Criação da página Conectar (Seguir) com sugestões de usuários e criadores.
- Implementação do componente BackButton global reutilizável.
- Criação do ConnectTabs com filtros "Quem seguir" e "Criadores para você".
- Implementação do UserSuggestionCard com navegação para perfil.
- Adição de botões "Seguir/Seguindo" para usuários e "Inscrever-se/Inscrito" para criadores.
- Criação da página Mensagens como placeholder para funcionalidade futura.
- Criação do componente Modal Base reutilizável para modals centralizadas.
- Criação do componente Popover para menus dropdown posicionados.
- Implementação do menu "Mais" na Sidebar com 4 opções (Configurações, Sobre, GitHub, API Docs).
- Adição de compensação de scrollbar em modals para evitar distorção de layout.
- Configuração de scrollbar sempre visível globalmente para evitar "pulo" entre páginas.
- Criação do menu Popover do botão de perfil com opções "Adicionar conta existente" e "Sair".
- Adição de variantes de estilização para Popover (botão Mais vs botão Perfil).
- Implementação de shadows diferenciadas para temas light e dark nos Popovers.
- Criação do SearchPopover com Estado 1 (vazio) exibindo mensagem informativa.
- Adição da prop `matchTriggerWidth` no Popover para controlar largura baseada no trigger.
- Implementação da posição `bottom-left` no Popover.
- Criação do SearchBar Popover Estado 2 (histórico de buscas).
- Implementação da ClearSearchModal para confirmação de limpeza de histórico.
- Adição de botão "Limpar tudo" no histórico de buscas.
- Criação de botões X individuais para remover itens do histórico.
- Adição da variante "danger" (vermelha) no globalStyles e chamado no componente Button.
- Implementação de tipos diferenciados no histórico (🔍 busca, 👤 usuário).
- Criação do SearchBar Popover Estado 3 (pesquisando).
- Implementação de sugestões de busca filtradas em tempo real.
- Adição de resultados de usuários com avatar, nome, username e bio.
- Scroll customizado no SearchPopover com altura máxima de 480px.
- Divisor visual entre sugestões e resultados de usuários.
- Filtragem por nome de usuário e @username.
- Limite de 3 sugestões e 3 usuários nos resultados.
- Mensagem vazia quando não há resultados de busca.

### Changed

- Refatoração do App.tsx para remover Sidebar e Container (movidos para MainLayout).
- Atualização do sistema de rotas para suportar layouts aninhados usando Outlet.
- Reorganização da estrutura de rotas separando páginas públicas (Login, Registro) de páginas privadas (Home, Perfil, etc).
- Implementação de rota dinâmica `/:username` para perfis de usuários.
- Implementação de rota dinâmica `/:username/status/:postId` para posts individuais (padrão Twitter).
- Atualização do PostCard para navegar ao ser clicado.
- Refatoração do SearchBar movendo de InfoBar/components para common (componente reutilizável global).
- Atualização da InfoBar para aceitar types de variante, tornando-a configurável por rota.
- Implementação de lógica no MainLayout para configurar InfoBar baseado na rota atual.
- Adição de Separator na InfoBar quando SearchBar não é exibida.
- Implementação de rota `/notifications`.
- Notificações marcam como lidas automaticamente ao serem clicadas.
- Refatoração do BackButton de componentes locais (Profile, PostDetail) para componente global reutilizável.
- Atualização do tipo onClick no Button para aceitar evento como argumento opcional.
- Correção da rota do link "Seguir" na Sidebar para apontar para /connect.
- Refatoração da Sidebar para usar array de navegação com map() (código mais limpo).
- Atualização do Modal para usar useLayoutEffect no cálculo de posições (evita warnings React).
- Atualização do Popover para calcular e aplicar largura do trigger quando `matchTriggerWidth=true`.
- SearchBar agora abre Popover ao focar no input.
- Modal agora esconde scrollbar do html e body ao abrir (não apenas body).
- ClearSearchModal posicionada fora do Popover para evitar problemas de renderização.
- SearchBar gerencia estados do Popover e Modal de forma independente.
- SearchPopover agora suporta scroll vertical quando conteúdo excede 480px.
- Padding ajustado para permitir scroll sem cortar conteúdo.

### Technical

- Esta etapa implementa a **autenticação visual**, **organização de layouts** e **páginas principais de conteúdo**, permitindo que páginas como Login e Registro apareçam sem Sidebar, enquanto páginas principais (Home, Perfil, Explorar, Post Individual) mantêm o layout completo.
- O MainLayout usa React Router `<Outlet />` para renderizar rotas filhas, seguindo o padrão de nested routes.
- As rotas seguem o padrão do Twitter: `/:username` para perfis e `/:username/status/:postId` para posts individuais.
- O SearchBar agora é um componente global reutilizável.
- A InfoBar se adapta automaticamente à rota: exibe todos os componentes na Home, esconde SearchBar e Trends na página Explorar, e esconde apenas Trends em páginas de posts.
- Validações de formulários incluem: formato de email, username alfanumérico, confirmação de senha e tamanhos mínimos.
- As notificações usam localStorage para persistir o estado de lidas/não lidas entre navegações, simulando o comportamento que será implementado com a API.
- Tipos de notificação incluem: curtida (rosa), retweet (verde), seguir (azul), menção e resposta (azul).
- O BackButton é um componente global usado em múltiplas páginas (Profile, PostDetail, Connect) para manter consistência visual e de comportamento.
- A tipagem do Button foi atualizada para suportar stopPropagation em casos específicos, mantendo flexibilidade de uso.
- A página Mensagens foi implementada como placeholder, sinalizando que a funcionalidade será desenvolvida em versões futuras. A API de mensagens não foi implementada no backend, pois não faz parte dos requisitos obrigatórios do projeto.
- Modal Base usa Portal (renderiza no body), overlay escuro opcional, header/footer customizáveis.
- Popover usa useLayoutEffect para cálculos de posição DOM antes do paint.
- Ambos componentes fecham com ESC e click fora, seguindo padrões de acessibilidade.
- Popover agora suporta variantes de estilo via props (diferentes comportamentos visuais).
- PopoverItem agora aceita variante para adequar estilização conforme contexto.
- Shadows temáticas aplicadas dinamicamente nos Popovers.
- Popover agora aceita `matchTriggerWidth` (boolean) para adaptar largura ao trigger.
- SearchPopover gerencia 3 estados futuros: empty, history, searching (apenas empty implementado).
- SearchHistory armazenado em estado local (futuro: localStorage ou API).
- Modal renderizada no nível da SearchBar, não dentro do Popover.
- Histórico vazio automaticamente retorna ao Estado 1.
- Filtragem de sugestões e usuários acontece na SearchBar (não no Popover).
- SearchPopover recebe apenas resultados já filtrados via props.
- Scrollbar customizada seguindo padrão visual da aplicação.
- Mock de dados de sugestões e usuários (futuro: API).


## [0.0.3] - 2026-01-14

### Added

- Criação dos temas light e dark.
- Importação da fonte Roboto no index.html e aplicação via GlobalStyle.
- Criação da pasta common para componentes reutilizáveis.
- Implementação do componente Button com múltiplas variações e suporte a estado ativo.
- Criação dos componentes Avatar, Textarea, PostCard e PostList.
- Implementação do layout principal da Home (HomeLayout).
- Criação do componente PostForm com botões "Para você" e "Seguindo".
- Implementação da SideBar com navegação lateral baseada em rotas.
- Criação da InfoBar com SearchBar, TrendsWidget, WhoToFollowWidget e Footer.
- Integração do HomeLayout e InfoBar ao MainContainer da página Home.
- Atualização do App.tsx para envolver a aplicação com ThemeProvider e layout base.

### Changed

- Evolução da estrutura inicial para suportar múltiplos layouts.
- Remoção do Header global em favor de um header específico da Home.
- Padronização do uso do tema nos componentes comuns e de layout.
- Ajustes no comportamento de botões do tipo tab e links ativos.
- Reorganização da Home para permitir visualização completa da página inicial.

### Technical

- Esta etapa consolida a **estrutura visual e arquitetural da Home**, permitindo visualizar a página inicial completa antes da implementação do feed dinâmico, regras avançadas de scroll e carregamento incremental.


## [0.0.2] - 2026-01-10

### Added

- Criação da branch `feature/project-structure`
- Estruturação inicial do projeto com separação por responsabilidades (`components`, `pages`, `routes`, `services` e `styles`)
- Configuração do Styled Components como solução principal de estilização
- Definição do tema global da aplicação (paleta de cores e breakpoints)
- Criação e aplicação de estilos globais (`GlobalStyle`)
- Organização de exports centralizados para estilos
- Importação da fonte Roboto como tipografia base da aplicação
- Configuração do React Router para gerenciamento de rotas
- Definição da rota inicial da aplicação para a página Home
- Criação da estrutura base de navegação com `BrowserRouter`
- Implementação da página Home como ponto de entrada da aplicação
- Criação de um Header simples para estrutura inicial de layout
- Integração do Header, estilos globais, tema e rotas no `App.tsx`

### Changed

- Remoção de arquivos boilerplate gerados pelo Vite que não fazem parte da arquitetura do projeto
- Ajuste e padronização de imports após a reorganização da estrutura inicial
- Atualização do `App.tsx` para refletir a arquitetura base da aplicação
- Remoção do React.StrictMode do ponto de entrada da aplicação para garantir o funcionamento correto do createGlobalStyle do styled-components em ambiente de desenvolvimento.
- Decisão técnica tomada após identificar comportamento inconsistente do CSS global causado pelo ciclo de montagem dupla do StrictMode no React 18 com Vite, mantendo a estabilidade da estilização global do projeto.


## [0.0.1] - 2026-01-10

### Added

- Criação do repositório com README inicial
- Atualização do README com informações iniciais diretamente via GitHub
- Clonagem do repositório para o ambiente local
- Instalação do projeto base utilizando Vite com React e TypeScript  
  (`npm create vite@latest . -- --template react-ts`)
- Criação da branch inicial `feature/project-setup`
- Criação e configuração do arquivo `.editorconfig`
- Criação e configuração do arquivo `.prettierrc`
- Configuração do arquivo `eslint.config.js` utilizando o formato Flat Config para análise estática do projeto
- Criação da pasta `.vscode`
- Configuração do arquivo `.vscode/settings.json` para automatizar correções de código com ESLint ao salvar arquivos, desabilitando a formatação padrão do VS Code e garantindo padronização conforme as regras do projeto
- Ajuste do arquivo `.gitignore` para projetos Vite + React + TypeScript, removendo padrões desnecessários e mantendo apenas arquivos relevantes ao ambiente de desenvolvimento
- Versionamento proposital do arquivo `.vscode/settings.json` para garantir padronização de lint e formatação ao salvar arquivos
