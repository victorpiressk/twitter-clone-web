# Troubleshooting

Este documento registra problemas conhecidos, suas causas e soluções. A maioria foi encontrada e resolvida durante o desenvolvimento do projeto.

---

## Build e Deploy

### Build falha no Vercel com erro de casing

**Sintoma:**
```
error TS1261: Already included file name '...Layout/...' differs from '...layout/...' only in casing.
```

**Causa:** O Windows é case-insensitive no sistema de arquivos. Renomear uma pasta de `Layout` para `layout` localmente não é detectado pelo Git, que continua rastreando o nome original. O Vercel roda em Linux, que é case-sensitive, e encontra o conflito.

**Solução:** Forçar o rename via Git usando um nome temporário:
```bash
git mv src/components/Layout src/components/layout_temp
git mv src/components/layout_temp src/components/layout
git commit -m "fix: corrigir capitalização da pasta layout"
git push
```

Se o `git mv` falhar com "source directory is empty", a pasta já está rastreada com o nome correto no Git — o problema está nos imports. Use o find & replace global do VSCode para corrigir todos os imports de `components/Layout` para `components/layout`.

---

### URL da API com barra no final causa falha no deploy

**Sintoma:**
```
(corsheaders.E014) Origin 'http://localhost:4173/' in CORS_ALLOWED_ORIGINS should not have path
Build failed
```

**Causa:** O Django não aceita URLs com trailing slash no `CORS_ALLOWED_ORIGINS`.

**Solução:** Remover a barra do final da URL:
```python
# ❌ Incorreto
CORS_ALLOWED_ORIGINS = ['http://localhost:4173/']

# ✅ Correto
CORS_ALLOWED_ORIGINS = ['http://localhost:4173']
```

---

### Chunk acima de 500 KB após build

**Sintoma:**
```
(!) Some chunks are larger than 500 kB after minification.
```

**Causa:** Bibliotecas pesadas (`emoji-picker-react`, `react-datepicker`, `@giphy`) sendo incluídas no bundle principal.

**Solução:** Configurar `manualChunks` no `vite.config.ts`:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-emoji': ['emoji-picker-react'],
        'vendor-datepicker': ['react-datepicker', 'date-fns'],
        'vendor-giphy': ['@giphy/js-fetch-api', '@giphy/react-components'],
      }
    }
  }
}
```

---

## Autenticação

### Usuário deslogado após reload da página

**Causa:** O token não está sendo carregado do `localStorage` no estado inicial do `authSlice`.

**Verificação:** Confirme que o `initialState` do `authSlice` lê do `localStorage`:
```typescript
const initialState: AuthState = {
  accessToken: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  // ...
}
```

---

### Logout disparado incorretamente em erros de rede

**Causa:** O `authMiddleware` estava disparando logout para qualquer erro, incluindo erros 500 e timeouts.

**Solução:** O middleware deve verificar especificamente o status 401:
```typescript
if (isRejectedWithValue(action)) {
  const status = action.payload?.status
  if (status === 401) {  // Apenas 401, não qualquer erro
    dispatch(logout())
  }
}
```

---

## Estado e Redux

### Curtidas não persistem após refresh

**Causa:** O backend retorna um `like_id` ao curtir, e o `DELETE` de like usa esse ID — não o ID do post. Se o `like_id` não for salvo no Redux, o unfollow tenta deletar com o ID errado.

**Solução:** Salvar o `like_id` após curtir:
```typescript
const result = await likePost({ post: postId }).unwrap()
dispatch(setLikeId({ postId, likeId: result.id }))
```

---

### Follow state persiste após logout

**Causa:** O `usersSlice` não estava reagindo à action `logout` do `authSlice`.

**Solução:** Adicionar `extraReducers` no `usersSlice`:
```typescript
extraReducers: (builder) => {
  builder.addCase(logout, () => initialState)
}
```

---

### Posts com dados incompletos após o 5º item no feed

**Causa:** O `loadMore` fazia fetch manual da URL `next` mas não aplicava os transformers. Os dados chegavam em `snake_case` do backend e os campos como `author.first_name` não eram mapeados para `author.firstName`.

**Solução:** Aplicar `transformPostWithInteractions` em todos os resultados do fetch manual:
```typescript
const transformedPosts = backendData.results.map(transformPostWithInteractions)
dispatch(appendFeedPosts({ posts: transformedPosts, cursor: backendData.next, hasMore: !!backendData.next }))
```

---

### Selector causa warning de performance no Redux

**Sintoma:**
```
Selector unknown returned a different result when called with the same parameters.
```

**Causa:** Um selector inline dentro de `useAppSelector` que retorna um novo objeto/array a cada render.

**Solução:** Usar `createSelector` para memoizar:
```typescript
// ❌ Causa warning — novo array a cada render
const posts = useAppSelector((state) =>
  state.posts.feed.ids.map(id => state.posts.byId[id])
)

// ✅ Memoizado — recalcula apenas quando o estado muda
const posts = useAppSelector(selectFeedPosts)
```

---

## Componentes

### CSS global inconsistente em desenvolvimento com Vite

**Sintoma:** Estilos globais piscam ou são aplicados de forma imprevisível durante o desenvolvimento.

**Causa:** O `React.StrictMode` monta componentes duas vezes em desenvolvimento. O `createGlobalStyle` do Styled Components combinado com esse comportamento causa injeção, remoção e reinjeção de CSS global de forma imprevisível.

**Solução:** Remover o `React.StrictMode` do `main.tsx`. Esta é uma decisão consciente documentada no projeto — os benefícios do StrictMode são menos críticos com TypeScript rigoroso e sem uso de APIs legadas do React.

---

### SearchBar Popover com posição incorreta na primeira abertura

**Causa:** O popover calculava sua posição antes do elemento estar completamente renderizado no DOM.

**Solução:** Usar variantes de largura fixa por contexto (`small: 350px`, `large: 445px`) em vez de calcular dinamicamente. O `@floating-ui` posiciona corretamente com dimensões conhecidas.

---

### Modais aninhadas bloqueiam scroll incorretamente

**Causa:** Cada modal bloqueava e desbloqueava o scroll de forma independente. Ao fechar a modal interna, o scroll era desbloqueado mesmo com a modal externa ainda aberta.

**Solução:** O `useModalScrollLock` usa um contador global — o scroll só é desbloqueado quando o contador chega a zero:
```typescript
// Incrementa ao abrir, decrementa ao fechar
// Scroll bloqueado enquanto counter > 0
```

---

### AvatarProfilePopover fecha ao mover o cursor entre avatar e popover

**Causa:** Havia um gap entre o avatar e o popover. O mouse saía do avatar, disparava o timeout de fechamento, e o popover fechava antes do cursor chegar nele.

**Solução:** Ao entrar no popover, cancelar o timeout de fechamento iniciado pelo `onMouseLeave` do avatar:
```typescript
const handlePopoverMouseEnter = () => {
  // Cancela o fechamento se o usuário mover o cursor para dentro do popover
  if (closeTimeoutRef.current) {
    clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = null
  }
}
```

---

### Fast Refresh para de funcionar em arquivos de Context

**Causa:** O Vite não consegue determinar o que atualizar quando um arquivo exporta tanto um Context quanto um hook ou componente.

**Solução:** Separar o Context e o Hook em arquivos distintos:
```
contexts/
  ThemeContext.tsx   # Apenas o Context e o Provider
  useTheme.ts        # Apenas o hook useContext(ThemeContext)
```

---

## Datas e Timezone

### Data de nascimento salva com -1 dia

**Causa:** `new Date('2000-01-15')` interpreta a string como UTC e converte para o timezone local, resultando em `2000-01-14` em fusos negativos.

**Solução:** Usar o construtor com partes separadas para forçar timezone local:
```typescript
// ❌ Interpreta como UTC
const date = new Date('2000-01-15')

// ✅ Força timezone local
const [year, month, day] = '2000-01-15'.split('-').map(Number)
const date = new Date(year, month - 1, day)
```

---

### Data de ingresso no perfil quebra com timestamp completo

**Causa:** O backend retorna `created_at` como ISO completo (`2026-01-08T12:34:56Z`). O `formatDate` esperava apenas `YYYY-MM-DD`.

**Solução:** Extrair apenas a parte da data antes de formatar:
```typescript
const dateOnly = isoString.split('T')[0]
formatDate(dateOnly, 'join')
```

---

## API e Integração

### Likes retornam erro 400 ao descurtir

**Causa:** O endpoint de unlike é `DELETE /api/likes/{like_id}/` usando o ID da relação de curtida, não o ID do post. Usar o ID do post resultava em 400 ou 404.

**Solução:** Sempre salvar o `like_id` retornado pela API ao curtir e usar esse ID no unfollow. Ver seção [Curtidas não persistem após refresh](#curtidas-não-persistem-após-refresh).

---

### Hashtags não encontradas ao buscar por nome

**Causa:** O endpoint `/api/hashtags/` retorna uma lista, mas a busca por nome exata retornava o primeiro item da lista em vez da hashtag correta.

**Solução:** Usar o endpoint de busca `/api/hashtags/search/?q={name}` e filtrar pelo nome exato com comparação case-insensitive:
```typescript
const hashtag = searchResults?.find(
  (h) => h.name.toLowerCase() === hashtagName.toLowerCase()
)
```

---

### Retweets simples não exibem post original

**Causa:** Um retweet simples é um post com `retweetOf` preenchido e `content` vazio. O `PostCard` não estava detectando esse caso corretamente e exibia o post do retweet em vez do post original.

**Solução:** Detectar retweet simples pela ausência de conteúdo:
```typescript
const isSimpleRetweet = !!post.retweetOf && !post.content.trim()
const displayPost = isSimpleRetweet && originalPost ? originalPost : post
```

---

### Busca com nome completo não retorna resultados

**Causa:** O backend não suporta busca combinada de `first_name + last_name` em um único parâmetro.

**Solução (workaround):** Separar a query em palavras e filtrar no frontend:
```typescript
const queries = debouncedQuery.trim().split(/\s+/)
const mainQuery = queries[0]  // Busca apenas a primeira palavra na API

// Filtra localmente com todas as palavras
const filteredUsers = searchData.users.filter((user) => {
  const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
  return queries.every(term => fullName.includes(term.toLowerCase()))
})
```
