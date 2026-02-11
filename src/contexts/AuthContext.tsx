import { createContext, useState, useCallback, useEffect } from 'react'
import { MOCK_CURRENT_USER } from '../mocks/user'
import type { UserWithFollowState } from '../models'

export type RegisterData = {
  username: string
  firstName: string
  lastName: string
  contact: string
  birthDate: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: UserWithFollowState | null
  isInitialLoading: boolean
  login: (identifier: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserWithFollowState | null>(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // 1. Sincronização Inicial (Onde a mágica acontece)
  useEffect(() => {
    const loadStorageData = () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error)
      } finally {
        // Finaliza o loading independente de ter achado o usuário ou não
        setIsInitialLoading(false)
      }
    }

    loadStorageData()
  }, [])

  // 2. Estado derivado
  const isAuthenticated = user !== null

  // 3. Ações de Autenticação
  const login = useCallback(async (identifier: string, password: string) => {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Login attempt:', { identifier, password })

    setUser(MOCK_CURRENT_USER)
    localStorage.setItem('user', JSON.stringify(MOCK_CURRENT_USER))
  }, [])

  const register = useCallback(async (userData: RegisterData) => {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Register attempt:', userData)

    const mockUser: UserWithFollowState = {
      id: Date.now(),
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.contact,
      avatar: null,
      banner: null,
      bio: '',
      location: '',
      website: '',
      birthDate: userData.birthDate,
      createdAt: Date.now().toString(),
      stats: {
        posts: 0,
        following: 0,
        followers: 0
      },
      isFollowing: false
    }

    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialLoading,
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
