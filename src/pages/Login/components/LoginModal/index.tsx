import { useState } from 'react'
import { Twitter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AppleIcon from '../../../../assets/icons/apple-original.svg'
import GoogleIcon from '../../../../assets/icons/google-original.svg'
import Button from '../../../../components/common/Button'
import Modal from '../../../../components/common/Modals/BaseModal'
import { useToast } from '../../../../hooks/useToast'
import { useAppDispatch } from '../../../../store/hooks'
import { useLoginMutation } from '../../../../store/slices/api/auth.api'
import { setCredentials } from '../../../../store/slices/auth/authSlice'
import { transformApiError } from '../../../../utils/transformers/error'
import * as S from './styles'
import type { LoginModalProps, LoginStep } from './types'
import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

const LoginModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenRegister
}: LoginModalProps) => {
  // ============================================
  // DEPENDENCIES
  // ============================================

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  // ============================================
  // MUTATIONS
  // ============================================

  const [login, { isLoading: isSubmitting }] = useLoginMutation()

  // ============================================
  // STATE
  // ============================================

  const [step, setStep] = useState<LoginStep>('identifier')
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // ============================================
  // VALIDATION
  // ============================================

  const validateIdentifier = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Campo obrigatório'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePassword = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ============================================
  // HANDLERS
  // ============================================

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'identifier' && validateIdentifier()) {
      setStep('password')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePassword()) return

    try {
      const identifier = formData.identifier.trim()
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
      const isPhone = /^\d{10,11}$/.test(identifier.replace(/\D/g, ''))

      const payload = {
        password: formData.password,
        ...(isEmail && { email: identifier }),
        ...(isPhone && { phone: identifier }),
        ...(!isEmail && !isPhone && { username: identifier })
      }

      const result = await login(payload).unwrap()

      dispatch(setCredentials({ user: result.user, token: result.token }))
      showToast('success', 'Bem-vindo de volta!')
      onLoginSuccess?.()
      handleModalClose()
      navigate('/home', { replace: true })
    } catch (err: unknown) {
      const { message, fields } = transformApiError(
        err as FetchBaseQueryError | SerializedError
      )
      showToast('error', message)
      if (Object.keys(fields).length > 0) {
        setErrors(fields)
      }
    }
  }

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    showToast(
      'info',
      `Login com ${provider === 'google' ? 'Google' : 'Apple'} em breve!`
    )
  }

  const handleModalClose = () => {
    onClose()
    setTimeout(() => {
      setStep('identifier')
      setFormData({ identifier: '', password: '' })
      setErrors({})
    }, 300)
  }

  const handleOpenSignup = () => setStep('signup')

  const handleOpenRegisterModal = () => {
    onClose()
    onOpenRegister()
  }

  // ============================================
  // RENDER STEPS
  // ============================================

  const renderIdentifierStep = () => (
    <>
      <S.Header>
        <S.Title>Entrar no Twitter Clone</S.Title>
      </S.Header>

      <S.Form onSubmit={handleNextStep}>
        <S.SocialButtons>
          <S.SocialButton
            type="button"
            $provider="google"
            onClick={() => handleSocialLogin('google')}
          >
            <img src={GoogleIcon} alt="Google" />
            Entrar com o Google
          </S.SocialButton>

          <S.SocialButton
            type="button"
            $provider="apple"
            onClick={() => handleSocialLogin('apple')}
          >
            <img src={AppleIcon} alt="Apple" />
            Entrar com a Apple
          </S.SocialButton>
        </S.SocialButtons>

        <S.Divider>
          <span>OU</span>
        </S.Divider>

        <S.FloatingInputContainer>
          <S.FloatingLabel
            $hasValue={!!formData.identifier}
            $isFocused={focusedField === 'identifier'}
          >
            Telefone, e-mail ou nome de usuário
          </S.FloatingLabel>
          <S.FloatingInput
            type="text"
            value={formData.identifier}
            onChange={(e) => handleChange('identifier', e.target.value)}
            onFocus={() => setFocusedField('identifier')}
            onBlur={() => setFocusedField(null)}
            $hasValue={!!formData.identifier}
            $isFocused={focusedField === 'identifier'}
            $hasError={!!errors.identifier}
          />
          {errors.identifier && (
            <S.InputError>{errors.identifier}</S.InputError>
          )}
        </S.FloatingInputContainer>

        <Button type="submit" variant="secondary">
          Avançar
        </Button>

        <Button type="button" variant="outline">
          Esqueceu a senha?
        </Button>

        <S.SignupText>
          <span>Não tem uma conta?</span>
          <button type="button" onClick={handleOpenSignup}>
            Inscreva-se
          </button>
        </S.SignupText>
      </S.Form>
    </>
  )

  const renderPasswordStep = () => (
    <>
      <S.Header>
        <S.Title>Digite sua senha</S.Title>
      </S.Header>

      <S.Form onSubmit={handleSubmit}>
        <S.FloatingInputContainer>
          <S.FloatingLabel
            $hasValue={!!formData.identifier}
            $isFocused={false}
            $disabled
          >
            Telefone, e-mail ou nome de usuário
          </S.FloatingLabel>
          <S.FloatingInput
            type="text"
            value={formData.identifier}
            disabled
            $hasValue={!!formData.identifier}
            $isFocused={false}
            $hasError={false}
            $disabled
          />
        </S.FloatingInputContainer>

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
          {errors.password && <S.InputError>{errors.password}</S.InputError>}
        </S.FloatingInputContainer>

        <S.ForgotPassword type="button">Esqueceu a senha?</S.ForgotPassword>
      </S.Form>
    </>
  )

  const renderSignupStep = () => (
    <>
      <S.Header>
        <S.Title>Inscreva-se no Twitter Clone</S.Title>
      </S.Header>

      <S.Form>
        <S.SocialButtons>
          <S.SocialButton
            type="button"
            $provider="google"
            onClick={() => handleSocialLogin('google')}
          >
            <img src={GoogleIcon} alt="Google" />
            Inscrever-se com o Google
          </S.SocialButton>

          <S.SocialButton
            type="button"
            $provider="apple"
            onClick={() => handleSocialLogin('apple')}
          >
            <img src={AppleIcon} alt="Apple" />
            Inscrever-se com a Apple
          </S.SocialButton>

          <S.Divider>
            <span>OU</span>
          </S.Divider>

          <Button
            type="button"
            variant="secondary"
            onClick={handleOpenRegisterModal}
          >
            Criar conta
          </Button>
        </S.SocialButtons>

        <S.Terms>
          Ao se inscrever, você concorda com os{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Termos de Serviço
          </a>{' '}
          e a{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a>
          , incluindo o{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Uso de Cookies
          </a>
          .
        </S.Terms>

        <S.SignupText style={{ marginTop: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Já tem uma conta?</span>
          <button type="button" onClick={() => setStep('identifier')}>
            Entrar
          </button>
        </S.SignupText>
      </S.Form>
    </>
  )

  // ============================================
  // FOOTER
  // ============================================

  const footer = step === 'password' && (
    <S.Footer>
      <Button
        type="submit"
        variant="secondary"
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        Entrar
      </Button>

      <S.SignupText>
        <span>Não tem uma conta?</span>
        <button type="button" onClick={handleOpenSignup}>
          Inscreva-se
        </button>
      </S.SignupText>
    </S.Footer>
  )

  // ============================================
  // RENDER
  // ============================================

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
      <S.ModalContent $step={step}>
        {step === 'identifier' && renderIdentifierStep()}
        {step === 'password' && renderPasswordStep()}
        {step === 'signup' && renderSignupStep()}
      </S.ModalContent>
    </Modal>
  )
}

export default LoginModal
