import { useLocation } from 'react-router-dom'
import Button from '../../common/Button'
import * as S from './styles'

const SideBar = () => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <S.Aside>
      <S.Nav>
        <S.NavList>
          <li>
            <Button
              type="link"
              to="/"
              variant="ghost" // ← MUDAR de outline para ghost
              active={currentPath === '/'}
            >
              X
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/home"
              variant="ghost" // ← ghost
              active={currentPath === '/home'}
            >
              Página Inicial
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/explore"
              variant="ghost" // ← ghost
              active={currentPath === '/explore'}
            >
              Explorar
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/notifications"
              variant="ghost" // ← ghost
              active={currentPath === '/notifications'}
            >
              Notificações
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/following"
              variant="ghost" // ← ghost
              active={currentPath === '/following'}
            >
              Seguir
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/messages"
              variant="ghost" // ← ghost
              active={currentPath === '/messages'}
            >
              Bate-papo
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/grok"
              variant="ghost" // ← ghost
              active={currentPath === '/grok'}
            >
              Grok
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/profile"
              variant="ghost" // ← ghost
              active={currentPath === '/profile'}
            >
              Perfil
            </Button>
          </li>
          <li>
            <Button
              type="link"
              to="/more"
              variant="ghost" // ← ghost
              active={currentPath === '/more'}
            >
              Mais
            </Button>
          </li>
          <li>
            <Button
              type="button" // ← MUDAR de link para button (abre modal)
              variant="secondary" // ← MUDAR de secondary para primary (azul)
              onClick={() => console.log('Abrir modal de post')}
            >
              Postar
            </Button>
          </li>
        </S.NavList>
      </S.Nav>
    </S.Aside>
  )
}

export default SideBar
