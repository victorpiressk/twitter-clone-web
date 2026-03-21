import { useState } from 'react'
import Button from '../../../../components/common/Button'
import { useToast } from '../../../../hooks/useToast'
import { useAppSelector } from '../../../../store/hooks'
import { useUpdateAccountMutation } from '../../../../store/slices/api/users.api'
import { selectCurrentUser } from '../../../../store/slices/auth/authSlice'
import * as S from '../../styles'

type Step = 'password' | 'fields'

const AccountSettings = () => {
  const { showToast } = useToast()
  const currentUser = useAppSelector(selectCurrentUser)
  const [updateAccount, { isLoading }] = useUpdateAccountMutation()

  const [step, setStep] = useState<Step>('password')
  const [verifiedPassword, setVerifiedPassword] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [form, setForm] = useState({
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    username: currentUser?.username || ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePasswordContinue = () => {
    if (!passwordInput) {
      setPasswordError('Senha atual é obrigatória')
      return
    }
    setVerifiedPassword(passwordInput)
    setPasswordInput('')
    setPasswordError('')
    setStep('fields')
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async () => {
    if (!currentUser) return

    const data: {
      email?: string
      phone?: string
      username?: string
      current_password: string
    } = { current_password: verifiedPassword }

    if (form.email !== (currentUser.email || '')) data.email = form.email
    if (form.phone !== (currentUser.phone || '')) data.phone = form.phone
    if (form.username !== currentUser.username) data.username = form.username

    if (Object.keys(data).length === 1) {
      showToast('info', 'Nenhuma alteração detectada')
      return
    }

    try {
      await updateAccount({ id: currentUser.id, data }).unwrap()
      showToast('success', 'Dados atualizados com sucesso!')
      setStep('password')
      setVerifiedPassword('')
    } catch (error: unknown) {
      const serverErrors =
        (error as { data?: Record<string, string | string[]> })?.data || {}
      const mapped: Record<string, string> = {}
      Object.entries(serverErrors).forEach(([key, value]) => {
        mapped[key] = Array.isArray(value) ? value[0] : String(value)
      })

      // Se senha incorreta, volta para o passo 1
      if (mapped.current_password) {
        setStep('password')
        setVerifiedPassword('')
        setPasswordError('Senha atual incorreta')
        showToast('error', 'Senha atual incorreta')
        return
      }

      setErrors(mapped)
    }
  }

  if (step === 'password') {
    return (
      <S.FormContainer>
        <S.FormGroup>
          <S.Label>Insira sua senha.</S.Label>
          <S.Input
            type="password"
            autoFocus
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value)
              setPasswordError('')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handlePasswordContinue()}
            placeholder="••••••••"
          />
          {passwordError && <S.ErrorText>{passwordError}</S.ErrorText>}
        </S.FormGroup>

        <Button
          type="button"
          variant="primary"
          onClick={handlePasswordContinue}
        >
          Continuar
        </Button>
      </S.FormContainer>
    )
  }

  return (
    <div>
      <S.FormGroup>
        <S.Label>Email</S.Label>
        <S.Input
          type="email"
          autoFocus
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="seu@email.com"
        />
        {errors.email && <S.ErrorText>{errors.email}</S.ErrorText>}
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>Telefone</S.Label>
        <S.Input
          type="tel"
          value={form.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="11999999999"
        />
        {errors.phone && <S.ErrorText>{errors.phone}</S.ErrorText>}
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>Nome de usuário</S.Label>
        <S.Input
          type="text"
          value={form.username}
          onChange={(e) => handleChange('username', e.target.value)}
          placeholder="ex: João Silva"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        {errors.username && <S.ErrorText>{errors.username}</S.ErrorText>}
      </S.FormGroup>

      <Button
        type="submit"
        variant="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        loading={isLoading}
      >
        Salvar alterações
      </Button>
    </div>
  )
}

export default AccountSettings
