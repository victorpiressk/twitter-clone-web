import { useState } from 'react'
import { Twitter } from 'lucide-react'
import AppleIcon from '../../assets/icons/apple-original.svg'
import GoogleIcon from '../../assets/icons/google-original.svg'
import { useToast } from '../../hooks'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import * as S from './styles'

const Login = () => {
  const { showToast } = useToast()
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleSocialRegister = (provider: 'google' | 'apple') => {
    showToast(
      'info',
      `Resgistrar com ${provider === 'google' ? 'Google' : 'Apple'} em breve!`
    )
  }

  return (
    <S.LoginPage>
      {/* Main Content */}
      <S.MainContent>
        {/* Container 1: Logo */}
        <S.LogoContainer>
          <Twitter size={302} strokeWidth={2} />
        </S.LogoContainer>

        {/* Container 2: Formulário */}
        <S.FormContainer>
          <S.Title>Acontecendo agora</S.Title>

          <S.Subtitle>Inscreva-se hoje</S.Subtitle>

          {/* Botões de Inscrição */}
          <S.SignupButtons>
            <S.SocialButton
              $provider="google"
              onClick={() => handleSocialRegister('google')}
            >
              <img src={GoogleIcon} alt="Google" />
              Inscrever-se com o Google
            </S.SocialButton>

            <S.SocialButton
              $provider="apple"
              onClick={() => handleSocialRegister('apple')}
            >
              <img src={AppleIcon} alt="Apple" />
              Inscrever-se com a Apple
            </S.SocialButton>
            <S.SignupDivisor>
              <div></div>
              <span>OU</span>
              <div></div>
            </S.SignupDivisor>
            <S.SignupButton onClick={() => setIsRegisterModalOpen(true)}>
              Criar conta
            </S.SignupButton>
          </S.SignupButtons>

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

          <S.LoginSection>
            <S.LoginText>Já tem uma conta?</S.LoginText>
            <S.LoginButton onClick={() => setIsLoginModalOpen(true)}>
              Entrar
            </S.LoginButton>
          </S.LoginSection>
        </S.FormContainer>
      </S.MainContent>

      {/* Container 3: Footer */}
      <S.Footer>
        <S.FooterContent>
          <S.FooterLink href="#">Sobre</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Baixe o app X</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Central de Ajuda</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Termos de Serviço</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Política de Privacidade</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Política de Cookies</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Acessibilidade</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Informações de anúncios</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Blog</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Status</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Carreiras</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Recursos da marca</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Publicidade</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Marketing</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">X para Empresas</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Desenvolvedores</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Diretório</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">Configurações</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
        <S.FooterContent>
          <S.FooterLink href="#">© 2026 X Corp.</S.FooterLink>
          <span>|</span>
        </S.FooterContent>
      </S.Footer>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSuccess={() => {}}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={() => {}}
        onOpenRegister={() => setIsRegisterModalOpen(true)}
      />
    </S.LoginPage>
  )
}

export default Login
