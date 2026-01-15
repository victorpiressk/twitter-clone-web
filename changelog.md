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

### Changed

- Refatoração do App.tsx para remover Sidebar e Container (movidos para MainLayout).
- Atualização do sistema de rotas para suportar layouts aninhados usando Outlet.
- Reorganização da estrutura de rotas separando páginas públicas (Login, Registro) de páginas privadas (Home, Perfil, etc).

### Notes

- Esta etapa implementa a **autenticação visual** e **organização de layouts**, permitindo que páginas como Login apareçam sem Sidebar, enquanto páginas principais (Home, Perfil) mantêm o layout completo.
- O MainLayout usa React Router `<Outlet />` para renderizar rotas filhas, seguindo o padrão de nested routes.
- Validações incluem: formato de email, username alfanumérico, confirmação de senha e tamanhos mínimos.


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
