# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.4] - 2026-01-15

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

### Notes

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

### Notes

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
