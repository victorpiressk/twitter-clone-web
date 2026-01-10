# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
