import { useState } from 'react'
import Button from '../../../../components/common/Button'
import { useToast } from '../../../../hooks/useToast'
import { useAppSelector } from '../../../../store/hooks'
import { useChangePasswordMutation } from '../../../../store/slices/api/users.api'
import { selectCurrentUser } from '../../../../store/slices/auth/authSlice'
import * as S from '../../styles'

const PasswordSettings = () => {
  const { showToast } = useToast()
  const currentUser = useAppSelector(selectCurrentUser)
  const [changePassword, { isLoading }] = useChangePasswordMutation()

  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirm: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = async () => {
    if (!currentUser) return

    const localErrors: Record<string, string> = {}

    if (!form.current_password) {
      localErrors.current_password = 'Senha atual é obrigatória'
    }
    if (!form.new_password) {
      localErrors.new_password = 'Nova senha é obrigatória'
    } else if (form.new_password.length < 8) {
      localErrors.new_password = 'A senha deve ter pelo menos 8 caracteres'
    }
    if (!form.new_password_confirm) {
      localErrors.new_password_confirm = 'Confirmação de senha é obrigatória'
    } else if (form.new_password !== form.new_password_confirm) {
      localErrors.new_password_confirm = 'As senhas não coincidem'
    }
    if (form.current_password === form.new_password && form.new_password) {
      localErrors.new_password = 'A nova senha deve ser diferente da atual'
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors)
      return
    }

    try {
      await changePassword({ id: currentUser.id, data: form }).unwrap()
      showToast('success', 'Senha alterada com sucesso!')
      setForm({
        current_password: '',
        new_password: '',
        new_password_confirm: ''
      })
    } catch (error: unknown) {
      const serverErrors =
        (error as { data?: Record<string, string | string[]> })?.data || {}
      const mapped: Record<string, string> = {}
      Object.entries(serverErrors).forEach(([key, value]) => {
        mapped[key] = Array.isArray(value) ? value[0] : String(value)
      })
      setErrors(mapped)
      if (mapped.current_password) {
        showToast('error', 'Senha atual incorreta')
      }
    }
  }

  return (
    <S.FormContainer>
      <S.FormGroup>
        <S.Label>Senha atual</S.Label>
        <S.Input
          type="password"
          autoFocus
          value={form.current_password}
          onChange={(e) => handleChange('current_password', e.target.value)}
          placeholder="••••••••"
        />
        {errors.current_password && (
          <S.ErrorText>{errors.current_password}</S.ErrorText>
        )}
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>Nova senha</S.Label>
        <S.Input
          type="password"
          value={form.new_password}
          onChange={(e) => handleChange('new_password', e.target.value)}
          placeholder="••••••••"
        />
        {errors.new_password && (
          <S.ErrorText>{errors.new_password}</S.ErrorText>
        )}
      </S.FormGroup>

      <S.FormGroup>
        <S.Label>Confirmar nova senha</S.Label>
        <S.Input
          type="password"
          value={form.new_password_confirm}
          onChange={(e) => handleChange('new_password_confirm', e.target.value)}
          placeholder="••••••••"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        {errors.new_password_confirm && (
          <S.ErrorText>{errors.new_password_confirm}</S.ErrorText>
        )}
      </S.FormGroup>

      <Button
        type="submit"
        variant="primary"
        onClick={handleSubmit}
        disabled={isLoading}
        loading={isLoading}
      >
        Salvar
      </Button>
    </S.FormContainer>
  )
}

export default PasswordSettings
