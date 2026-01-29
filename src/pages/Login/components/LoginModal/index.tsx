import { useState } from 'react'
import { useToast } from '../../../../hooks/useToast'
import { useAuth } from '../../../../hooks/useAuth'
import Modal from '../../../../components/common/Modal'
import Button from '../../../../components/common/Button'
import { Twitter } from 'lucide-react'
import GoogleIcon from '../../../../assets/icons/google-original.svg'
import AppleIcon from '../../../../assets/icons/apple-original.svg'
import type { LoginModalProps, LoginStep } from './types'
import * as S from './styles'

const LoginModal = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenRegister
}: LoginModalProps) => {
  const { showToast } = useToast()
  const { login } = useAuth()
  const [step, setStep] = useState<LoginStep>('identifier')
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 'identifier') {
      if (validateIdentifier()) {
        setStep('password')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePassword()) return

    setIsSubmitting(true)

    try {
      await login(formData.identifier, formData.password)

      showToast('success', 'Bem-vindo de volta!')
      onLoginSuccess()
      onClose()

      setFormData({ identifier: '', password: '' })
      setStep('identifier')
      setErrors({})
    } catch {
      showToast('error', 'E-mail ou senha incorretos')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
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

  const handleOpenSignup = () => {
    setStep('signup')
  }

  const handleOpenRegisterModal = () => {
    onClose()
    onOpenRegister()
  }

  // Footer dinâmico
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
        {/* ETAPA 1: Identificador */}
        {step === 'identifier' && (
          <>
            <S.Header>
              <S.Title>Entrar no Twitter Clone</S.Title>
            </S.Header>

            <S.Form onSubmit={handleNextStep}>
              {/* Botões Sociais */}
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

              {/* Divider */}
              <S.Divider>
                <span>OU</span>
              </S.Divider>

              {/* Input Flutuante: Identificador */}
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

              {/* Botão Avançar */}
              <Button type="submit" variant="secondary">
                Avançar
              </Button>

              {/* Esqueceu a senha */}
              <Button type="button" variant="outline">
                Esqueceu a senha?
              </Button>

              {/* Não tem uma conta? */}
              <S.SignupText>
                <span>Não tem uma conta?</span>
                <button type="button" onClick={handleOpenSignup}>
                  Inscreva-se
                </button>
              </S.SignupText>
            </S.Form>
          </>
        )}

        {/* ETAPA 2: Senha */}
        {step === 'password' && (
          <>
            <S.Header>
              <S.Title>Digite sua senha</S.Title>
            </S.Header>

            <S.Form onSubmit={handleSubmit}>
              {/* Input Flutuante: Identificador (DESABILITADO) */}
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

              {/* Input Flutuante: Senha */}
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

              {/* Esqueceu a senha */}
              <S.ForgotPassword type="button">
                Esqueceu a senha?
              </S.ForgotPassword>
            </S.Form>
          </>
        )}

        {/* ETAPA 3: Signup (mesma tela da página de Login) */}
        {step === 'signup' && (
          <>
            <S.Header>
              <S.Title>Inscreva-se no Twitter Clone</S.Title>
            </S.Header>

            <S.Form>
              {/* Botões Sociais */}
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

                {/* Divider */}
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

              {/* Termos */}
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

              {/* Já tem uma conta? */}
              <S.SignupText style={{ marginTop: '20px' }}>
                <span style={{ fontWeight: 'bold' }}>Já tem uma conta?</span>
                <button type="button" onClick={() => setStep('identifier')}>
                  Entrar
                </button>
              </S.SignupText>
            </S.Form>
          </>
        )}
      </S.ModalContent>
    </Modal>
  )
}

export default LoginModal
