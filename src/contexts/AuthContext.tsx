import { createContext, useState, useCallback, useEffect } from 'react'

export type User = {
  id: string
  name: string
  username: string
  email: string
  avatar?: string
}

export type RegisterData = {
  name: string
  contact: string
  birthDate: string
  username: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  isInitialLoading: boolean
  login: (identifier: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
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

    const mockUser: User = {
      id: '1',
      name: 'Victor Pires',
      username: 'victor',
      email: 'victor@example.com',
      avatar: undefined
    }

    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }, [])

  const register = useCallback(async (userData: RegisterData) => {
    // Simula delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Register attempt:', userData)

    const mockUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      username: userData.username,
      email: userData.contact,
      avatar: undefined
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
