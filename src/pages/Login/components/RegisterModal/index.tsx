import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Twitter } from 'lucide-react'
import { setCredentials } from '../../../../store/slices/auth/authSlice'
import { useAppDispatch } from '../../../../store/hooks'
import { useToast } from '../../../../hooks/useToast'
import Modal from '../../../../components/common/Modals/BaseModal'
import Button from '../../../../components/common/Button'
import { transformApiError } from '../../../../utils/transformers/error'
import type {
  RegisterModalProps,
  RegisterStep,
  ContactType,
  RegisterFormData
} from './types'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import * as S from './styles'
import { useRegisterMutation } from '../../../../store/slices/api/auth.api'

const RegisterModal = ({
  isOpen,
  onClose,
  onRegisterSuccess
}: RegisterModalProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  // ✅ RTK Query mutation
  const [register, { isLoading: isSubmitting }] = useRegisterMutation()

  const [step, setStep] = useState<RegisterStep>('basic')
  const [contactType, setContactType] = useState<ContactType>('phone')
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    contact: '',
    birthDate: '',
    username: '',
    password: '',
    passwordConfirm: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // ============================================
  // VALIDAÇÕES
  // ============================================

  const validateBasicInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!formData.contact.trim()) {
      newErrors.contact =
        contactType === 'phone'
          ? 'Celular é obrigatório'
          : 'E-mail é obrigatório'
    } else if (
      contactType === 'email' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact)
    ) {
      newErrors.contact = 'E-mail inválido'
    } else if (
      contactType === 'phone' &&
      !/^\d{10,11}$/.test(formData.contact.replace(/\D/g, ''))
    ) {
      newErrors.contact = 'Celular inválido'
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateCompleteInfo = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Nome de usuário é obrigatório'
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Apenas letras, números e underscore'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres'
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'As senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ============================================
  // HANDLERS
  // ============================================

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateBasicInfo()) {
      setStep('complete')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCompleteInfo()) return

    try {
      // Separa nome em firstName e lastName
      const nameParts = formData.name.trim().split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || ''

      const payload = {
        username: formData.username,
        email: contactType === 'email' ? formData.contact : '',
        phone: contactType === 'phone' ? formData.contact : '',
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
        firstName,
        lastName,
        birthDate: formData.birthDate
      }

      // Chama mutation do RTK Query
      const result = await register(payload).unwrap()

      // Salva credenciais no Redux (já persiste no localStorage)
      dispatch(
        setCredentials({
          user: result.user,
          token: result.token
        })
      )

      showToast('success', 'Conta criada com sucesso!')

      // Callbacks e limpeza
      onRegisterSuccess?.()
      handleModalClose()

      // Redireciona para home
      navigate('/home')
    } catch (err: unknown) {
      // O unwrap() do RTK Query lança o erro no formato FetchBaseQueryError | SerializedError
      // Passamos para o transformer que já sabe lidar com o tipo unknown/any internamente
      const { message, fields } = transformApiError(
        err as FetchBaseQueryError | SerializedError
      )

      showToast('error', message)

      if (Object.keys(fields).length > 0) {
        setErrors(fields)
      }
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const toggleContactType = () => {
    setContactType((prev) => (prev === 'phone' ? 'email' : 'phone'))
    setFormData((prev) => ({ ...prev, contact: '' }))
    setErrors((prev) => ({ ...prev, contact: '' }))
  }

  const handleModalClose = () => {
    onClose()

    // Reset após fechar
    setTimeout(() => {
      setStep('basic')
      setContactType('phone')
      setFormData({
        name: '',
        contact: '',
        birthDate: '',
        username: '',
        password: '',
        passwordConfirm: ''
      })
      setErrors({})
    }, 300)
  }

  // ============================================
  // RENDER
  // ============================================

  const canProceed =
    formData.name.trim() && formData.contact.trim() && formData.birthDate

  const footer =
    step === 'basic' ? (
      <S.Footer>
        <Button
          type="button"
          variant="secondary"
          onClick={handleNextStep}
          disabled={!canProceed}
        >
          Avançar
        </Button>
      </S.Footer>
    ) : (
      <S.Footer>
        <Button
          type="submit"
          variant="secondary"
          loading={isSubmitting} // ← vem do RTK Query
          onClick={handleSubmit}
        >
          Criar conta
        </Button>
      </S.Footer>
    )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      size="medium"
      showOverlay
      showCloseButton
      title={<Twitter size={30} strokeWidth={2} />}
      header={<div />}
      footer={footer}
    >
      <S.ModalContent>
        <S.Header>
          <S.Title>Criar sua conta</S.Title>
        </S.Header>

        {/* ETAPA 1: Informações Básicas */}
        {step === 'basic' && (
          <S.Form onSubmit={handleNextStep}>
            {/* Nome */}
            <S.FloatingInputContainer>
              <S.FloatingLabel
                $hasValue={!!formData.name}
                $isFocused={focusedField === 'name'}
              >
                Nome
              </S.FloatingLabel>
              <S.FloatingInput
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                $hasValue={!!formData.name}
                $isFocused={focusedField === 'name'}
                $hasError={!!errors.name}
              />
              {errors.name && <S.InputError>{errors.name}</S.InputError>}
            </S.FloatingInputContainer>

            {/* Celular ou E-mail */}
            <S.FloatingInputContainer>
              <S.FloatingLabel
                $hasValue={!!formData.contact}
                $isFocused={focusedField === 'contact'}
              >
                {contactType === 'phone' ? 'Celular' : 'E-mail'}
              </S.FloatingLabel>
              <S.FloatingInput
                type={contactType === 'phone' ? 'tel' : 'email'}
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                onFocus={() => setFocusedField('contact')}
                onBlur={() => setFocusedField(null)}
                $hasValue={!!formData.contact}
                $isFocused={focusedField === 'contact'}
                $hasError={!!errors.contact}
              />

              <S.ToggleButton type="button" onClick={toggleContactType}>
                {contactType === 'phone' ? 'Usar e-mail' : 'Usar celular'}
              </S.ToggleButton>
              {errors.contact && <S.InputError>{errors.contact}</S.InputError>}
            </S.FloatingInputContainer>

            {/* Data de Nascimento */}
            <S.FloatingInputContainer>
              <S.FloatingLabel
                $hasValue={!!formData.birthDate}
                $isFocused={focusedField === 'birthDate'}
              >
                Data de nascimento
              </S.FloatingLabel>
              <S.FloatingInput
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
                onFocus={() => setFocusedField('birthDate')}
                onBlur={() => setFocusedField(null)}
                $hasValue={!!formData.birthDate}
                $isFocused={focusedField === 'birthDate'}
                $hasError={!!errors.birthDate}
              />
              {errors.birthDate && (
                <S.InputError>{errors.birthDate}</S.InputError>
              )}
            </S.FloatingInputContainer>
          </S.Form>
        )}

        {/* ETAPA 2: Completar Cadastro */}
        {step === 'complete' && (
          <S.Form onSubmit={handleSubmit}>
            {/* Nome de Usuário */}
            <S.FloatingInputContainer>
              <S.FloatingLabel
                $hasValue={!!formData.username}
                $isFocused={focusedField === 'username'}
              >
                Nome de usuário
              </S.FloatingLabel>
              <S.FloatingInput
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                $hasValue={!!formData.username}
                $isFocused={focusedField === 'username'}
                $hasError={!!errors.username}
                placeholder="@usuario"
              />
              {errors.username && (
                <S.InputError>{errors.username}</S.InputError>
              )}
            </S.FloatingInputContainer>

            {/* Senha */}
            <S.FloatingInputContainer>
              <S.FloatingLabel
                $hasValue={!!formData.password}
                $isFocused={focusedField === 'password'}
              >
                Senha
              </S.FloatingLabel>
              <S.FloatingInput
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                $hasValue={!!formData.password}
                $isFocused={focusedField === 'password'}
                $hasError={!!errors.password}
              />
              {errors.password && (
                <S.InputError>{errors.password}</S.InputError>
              )}
            </S.FloatingInputContainer>

            {/* Confirmar Senha */}
            <S.FloatingInputContainer>
              <S.FloatingLabel
                $hasValue={!!formData.passwordConfirm}
                $isFocused={focusedField === 'passwordConfirm'}
              >
                Confirmar senha
              </S.FloatingLabel>
              <S.FloatingInput
                type="password"
                value={formData.passwordConfirm}
                onChange={(e) =>
                  handleChange('passwordConfirm', e.target.value)
                }
                onFocus={() => setFocusedField('passwordConfirm')}
                onBlur={() => setFocusedField(null)}
                $hasValue={!!formData.passwordConfirm}
                $isFocused={focusedField === 'passwordConfirm'}
                $hasError={!!errors.passwordConfirm}
              />
              {errors.passwordConfirm && (
                <S.InputError>{errors.passwordConfirm}</S.InputError>
              )}
            </S.FloatingInputContainer>
          </S.Form>
        )}
      </S.ModalContent>
    </Modal>
  )
}

export default RegisterModal
