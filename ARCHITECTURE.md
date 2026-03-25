# Decisões Arquiteturais

Este documento registra as principais decisões técnicas tomadas durante o desenvolvimento do Twitter Clone Web, incluindo o contexto, as alternativas consideradas e as justificativas de cada escolha.

---

## 1. Redux Toolkit + RTK Query (em vez de Context API)

### Contexto
A aplicação começou com Context API para autenticação (`AuthContext`). Conforme o número de features cresceu — feeds, posts, likes, retweets, follows, notificações — ficou claro que o Context API geraria re-renders desnecessários e dificultaria o gerenciamento de cache e estado assíncrono.

### Decisão
Migração completa para **Redux Toolkit** com **RTK Query** para data fetching.

### Justificativa
- **RTK Query** elimina boilerplate de loading/error states e gerencia cache automaticamente via `tagTypes`
- **Redux DevTools** facilita debugging de estado complexo
- **Escalabilidade** — estado global cresce sem acoplamento entre componentes
- **Cache inteligente** — invalidação automática via tags evita refetch desnecessário
- **Typed hooks** (`useAppDispatch`, `useAppSelector`) garantem type-safety em todo o projeto

### Resultado
Autenticação, posts, usuários e follows centralizados em três slices independentes. Menos de 5% do código lida com loading/error manualmente — o RTK Query cuida do restante.

---

## 2. Normalized State Pattern

### Contexto
Posts e usuários aparecem em múltiplos contextos simultaneamente — feed, post detail, perfil, notificações. Armazenar arrays duplicados causaria inconsistências: curtir um post no feed não refletiria no post detail.

### Decisão
Estrutura normalizada com `byId` (mapa de ID → entidade) e `allIds` (array de IDs ordenados).

```typescript
type PostsState = {
  byId: Record<number, PostWithInteractions>
  allIds: number[]
  feed: { ids: number[]; cursor: string | null; hasMore: boolean }
  // ...
}
```

### Justificativa
- **Single Source of Truth** — cada post/usuário existe em um único lugar
- **Atualizações automáticas** — curtir um post em qualquer contexto atualiza em todos
- **Performance** — acesso O(1) por ID em vez de O(n) em arrays
- **Padrão recomendado** pela documentação oficial do Redux

### Resultado
`upsertPost` e `upsertUser` garantem que qualquer atualização se propague automaticamente por toda a aplicação, independente de onde o dado foi modificado.

---

## 3. Transformers Pattern

### Contexto
O backend Django retorna dados em `snake_case` com estrutura diferente do que o frontend espera. Mapear isso diretamente nos componentes criaria acoplamento entre frontend e backend.

### Decisão
Camada de transformers em `utils/transformers/` que converte os DTOs do backend para os modelos do frontend.

```typescript
// Backend (snake_case)
{ first_name: 'Victor', is_liked: true, stats: { posts_count: 10 } }

// Frontend (camelCase)
{ firstName: 'Victor', isLiked: true, stats: { posts: 10 } }
```

### Justificativa
- **Isolamento** — mudanças no backend não quebram componentes diretamente
- **Testabilidade** — transformers são funções puras, fáceis de testar isoladamente
- **Reutilização** — o mesmo transformer é usado em todos os endpoints que retornam o mesmo tipo
- **Type safety** — tipos `BackendUser` e `User` são distintos, o compilador garante que a transformação acontece

### Resultado
Todos os dados passam por transformers antes de entrar no Redux. Os componentes nunca lidam com `snake_case` ou estruturas do backend diretamente.

---

## 4. Optimistic Updates com Rollback

### Contexto
Ações de like, retweet e follow são frequentes e o usuário espera resposta imediata. Aguardar a API antes de atualizar a UI criaria uma experiência lenta e pouco responsiva.

### Decisão
Atualizar o Redux imediatamente ao disparar a ação, processar a API em background e reverter em caso de erro.

```typescript
// 1. Atualiza UI imediatamente
dispatch(toggleLike(postId))

try {
  // 2. API processa em background
  await likePost(postId).unwrap()
} catch {
  // 3. Reverte em caso de erro
  dispatch(toggleLike(postId))
  showToast('error', 'Erro ao curtir')
}
```

### Justificativa
- **UX responsiva** — sem delay perceptível em ações comuns
- **Rollback garantido** — estado sempre consistente com o backend após confirmação ou erro
- **Padrão estabelecido** — usado pelo Twitter, Instagram e outras redes sociais

### Resultado
Likes, retweets, follows e bookmarks respondem instantaneamente. Erros de rede revertem o estado silenciosamente com toast de feedback.

---

## 5. Feature Flags para Funcionalidades Incompletas

### Contexto
Posts agendados, enquetes e geolocalização foram implementados no frontend mas dependem de infraestrutura não disponível no plano gratuito do Render (Redis/Celery) ou de integrações externas complexas.

### Decisão
Manter o código completo mas desativado via flag `FEATURE_ENABLED = false` em cada componente.

```typescript
const FEATURE_ENABLED = false

if (!FEATURE_ENABLED) {
  return <DisabledMessage title="Em breve" />
}
// ... código completo da feature
```

### Justificativa
- **Código preservado** — nenhuma reescrita necessária para ativar
- **Layout mantido** — botões aparecem na UI, comunicando que a feature existe
- **Ativação trivial** — mudar uma flag para `true` ativa a feature completamente
- **Portfólio** — demonstra capacidade técnica mesmo com limitações de infraestrutura

### Resultado
EmojiPicker, GifPicker, PollCreator, LocationPicker e PostScheduler estão implementados e funcionais. A ativação requer apenas mudar a flag e garantir a infraestrutura de backend correspondente.

---

## 6. Code Splitting com manualChunks

### Contexto
O bundle inicial era um único arquivo de 1.156 MB. Isso significa que o browser precisava baixar, parsear e executar todo o JavaScript antes de renderizar qualquer coisa — mesmo que o usuário nunca abrisse o EmojiPicker ou o PostScheduler.

### Decisão
Lazy load em todas as rotas via `React.lazy` + `Suspense`, combinado com `manualChunks` no Vite para separar bibliotecas pesadas.

```typescript
// Rotas com lazy load
const Home = lazy(() => import('../pages/Home'))
const Profile = lazy(() => import('../pages/Profile'))

// Vendors separados por domínio
manualChunks: {
  'vendor-emoji': ['emoji-picker-react'],        // 75 KB — só carrega ao abrir o picker
  'vendor-datepicker': ['react-datepicker'],     // 37 KB — só carrega ao agendar
  'vendor-giphy': ['@giphy/react-components'],   // 22 KB — só carrega ao buscar GIFs
}
```

### Justificativa
- **First load otimizado** — chunk principal caiu de 1.156 MB para 328 KB (↓71%)
- **Cache eficiente** — vendors raramente mudam, o browser os mantém em cache
- **Carregamento sob demanda** — bibliotecas pesadas só são baixadas quando necessário

### Resultado
Bundle principal reduzido em 71%. O impacto é mais significativo em conexões lentas, onde a diferença entre 1.1 MB e 328 KB pode representar vários segundos de carregamento.

---

## 7. PageHeader Unificado

### Contexto
Cada página tinha seu próprio header implementado manualmente com `BackButton`, título e tabs. Isso gerava inconsistências visuais, duplicação de código e retrabalho a cada nova página.

### Decisão
Componente único `PageHeader` com variantes para cada contexto, consumindo um componente `Tabs` genérico.

```typescript
// Fonte de verdade única — dados como props
<PageHeader
  variant="profile"
  title={viewingUser.name}
  subtitle={`${viewingUser.stats.posts} posts`}
  tabs={PROFILE_TABS}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onBack={() => navigate(-1)}
/>
```

### Justificativa
- **Consistência visual** — todos os headers seguem o mesmo padrão de espaçamento e comportamento
- **Manutenção centralizada** — mudanças de comportamento (scroll, animação) aplicam em todas as páginas
- **Sem tipos específicos** — `activeTab` é `string`, `tabs` é `TabItem[]` — genérico e reutilizável
- **Scroll behavior** — hide/show no mobile implementado uma vez via `useScrollDirection`

### Resultado
9 páginas migradas para o `PageHeader` unificado. 6 componentes de tabs específicos (`HomeTabs`, `NotificationTabs`, `ExploreTabs`, `ConnectTabs`, `FollowTabs`, `ProfileTabs`) e seus tipos foram removidos.

---

## 8. Backend como Source of Truth para Validação

### Contexto
O frontend tinha validação de tipo e tamanho de mídia duplicando regras do backend. Manter as duas sincronizadas seria retrabalho constante.

### Decisão
Remover validação de mídia do frontend. O backend é responsável por validar tipo, tamanho e segurança dos arquivos.

### Justificativa
- **DRY** — lógica de validação em um único lugar
- **Segurança** — validação no cliente é contornável, a do backend é autoritativa
- **Manutenção** — mudanças nos limites do backend não exigem atualização no frontend
- **Trade-off consciente** — o usuário pode tentar enviar um arquivo inválido e receber erro do servidor, mas isso é raro e o feedback via toast é suficiente

### Resultado
`mediaHelpers.ts` simplificado para apenas criar previews (blob URLs) e fazer cleanup de memória. Toda validação de conteúdo é delegada ao backend.

---

## 9. Context Pattern com Separação de Hook

### Contexto
O Vite usa Fast Refresh para atualizar componentes sem recarregar a página. O Fast Refresh falha silenciosamente quando um arquivo exporta tanto um Context quanto um componente ou hook — ele não consegue determinar o que precisa ser atualizado.

### Decisão
Separar o Context e o Hook em arquivos distintos.

```
contexts/
  ThemeContext.tsx      # createContext, Provider, ThemeProvider
  useTheme.ts           # useContext(ThemeContext)

  MobileDrawerContext.tsx
  useMobileDrawer.ts
```

### Justificativa
- **Fast Refresh funcional** — cada arquivo exporta apenas um tipo de coisa
- **Separação de responsabilidades** — o Context define o contrato, o Hook consome
- **Padrão recomendado** pela documentação do React para projetos com Vite

### Resultado
Hot reload funciona corretamente em todos os contextos. Mudanças no tema ou no drawer refletem instantaneamente durante o desenvolvimento.

---

## 10. React.StrictMode Desabilitado

### Contexto
O `React.StrictMode` monta componentes duas vezes em desenvolvimento para detectar side effects. O `createGlobalStyle` do Styled Components, combinado com o ciclo de montagem dupla do Vite, causava CSS global inconsistente — estilos eram injetados, removidos e reinjetados de forma imprevisível.

### Decisão
Remover o `React.StrictMode` do `main.tsx`.

### Justificativa
- **Estabilidade visual** — sem flickering de estilos globais durante desenvolvimento
- **Trade-off consciente** — os benefícios do StrictMode (detecção de side effects) são menos críticos em um projeto com TypeScript rigoroso e sem uso de APIs legadas do React

### Resultado
CSS global estável em desenvolvimento. A decisão foi documentada no CHANGELOG desde a versão `0.0.2` para não surpreender quem clonar o projeto.
