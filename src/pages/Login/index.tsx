import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Twitter } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import type { LoginFormData, LoginFormErrors } from './types'
import * as S from './styles'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrUsername: '',
    password: ''
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {}

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email ou usuário é obrigatório'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // TODO: Integrar com API
      console.log('Login:', formData)

      // Simula delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sucesso - redireciona para home
      navigate('/home')
    } catch (err) {
      console.error('Erro no login:', err)
      setErrors({ general: 'Erro ao fazer login. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <S.Logo>
          <Twitter size={40} strokeWidth={2} />
        </S.Logo>

        <S.Title>Entrar no Twitter Clone</S.Title>

        <S.Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="emailOrUsername"
            label="Email ou usuário"
            placeholder="Digite seu email ou usuário"
            value={formData.emailOrUsername}
            onChange={(value) =>
              setFormData({ ...formData, emailOrUsername: value })
            }
            error={errors.emailOrUsername}
            required
            autoFocus
          />

          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            error={errors.password}
            required
          />

          <S.ForgotPassword href="#">Esqueceu a senha?</S.ForgotPassword>

          {errors.general && <S.ErrorMessage>{errors.general}</S.ErrorMessage>}

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </S.Form>

        <S.Divider>ou</S.Divider>

        <S.SignUpLink>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </S.SignUpLink>
      </S.LoginCard>
    </S.LoginContainer>
  )
}

export default Login
