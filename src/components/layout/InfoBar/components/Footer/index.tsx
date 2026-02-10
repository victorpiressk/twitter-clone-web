import * as S from './styles'

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterLinks>
        <S.FooterLink href="#" target="_blank" rel="noopener noreferrer">
          Termos de Serviço
        </S.FooterLink>
        <S.FooterSeparator>·</S.FooterSeparator>
        <S.FooterLink href="#" target="_blank" rel="noopener noreferrer">
          Política de Privacidade
        </S.FooterLink>
        <S.FooterSeparator>·</S.FooterSeparator>
        <S.FooterLink href="#" target="_blank" rel="noopener noreferrer">
          Política de Cookies
        </S.FooterLink>
        <S.FooterSeparator>·</S.FooterSeparator>
        <S.FooterLink href="#" target="_blank" rel="noopener noreferrer">
          Acessibilidade
        </S.FooterLink>
        <S.FooterSeparator>·</S.FooterSeparator>
        <S.FooterLink href="#" target="_blank" rel="noopener noreferrer">
          Informações de anúncios
        </S.FooterLink>
        <S.FooterSeparator>·</S.FooterSeparator>
        <S.FooterLink href="#" target="_blank" rel="noopener noreferrer">
          Mais
        </S.FooterLink>
      </S.FooterLinks>

      <S.FooterCopyright>© 2026 Twitter Clone</S.FooterCopyright>

      <S.FooterProjectInfo>
        Projeto desenvolvido com React + TypeScript + Django REST Framework
      </S.FooterProjectInfo>

      <S.FooterAuthor>
        Criado por{' '}
        <S.AuthorLink
          href="https://github.com/victorpiressk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Victor Pires
        </S.AuthorLink>
      </S.FooterAuthor>
    </S.FooterContainer>
  )
}

export default Footer
