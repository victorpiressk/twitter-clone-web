import * as S from './styles'

type ModalFooterProps = {
  children: React.ReactNode
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <S.FooterContainer>{children}</S.FooterContainer>
}

export default ModalFooter
