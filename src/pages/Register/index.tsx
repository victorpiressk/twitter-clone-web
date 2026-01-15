import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import type { RegisterFormData, RegisterFormErrors } from './types'
import * as S from './styles'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {}

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome completo é obrigatório'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres'
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    // Validação do username
    if (!formData.username.trim()) {
      newErrors.username = 'Usuário é obrigatório'
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Usuário deve ter no mínimo 3 caracteres'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Usuário pode conter apenas letras, números e _'
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    // Validação da confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
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
      console.log('Registro:', formData)

      // Simula delay de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sucesso - redireciona para login
      navigate('/login')
    } catch (err) {
      console.error('Erro no registro:', err)
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <S.RegisterContainer>
      <S.RegisterCard>
        <S.Logo>𝕏</S.Logo>

        <S.Title>Criar sua conta</S.Title>

        <S.Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Nome completo"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            error={errors.name}
            required
            autoFocus
          />

          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
            required
          />

          <Input
            type="text"
            name="username"
            label="Usuário"
            placeholder="Digite seu nome de usuário"
            value={formData.username}
            onChange={(value) => setFormData({ ...formData, username: value })}
            error={errors.username}
            required
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

          <Input
            type="password"
            name="confirmPassword"
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={(value) =>
              setFormData({ ...formData, confirmPassword: value })
            }
            error={errors.confirmPassword}
            required
          />

          {errors.general && <S.ErrorMessage>{errors.general}</S.ErrorMessage>}

          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </S.Form>

        <S.Divider>ou</S.Divider>

        <S.LoginLink>
          Já tem conta? <Link to="/login">Entrar</Link>
        </S.LoginLink>
      </S.RegisterCard>
    </S.RegisterContainer>
  )
}

export default Register
