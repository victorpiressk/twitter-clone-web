import styled from 'styled-components'
import { colors } from '../../styles/globalStyles'

export const HomeContainer = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border.primary};
  min-height: 100vh;
  width: 600px;
  flex-shrink: 0;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`

export const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 8px;
`

export const EmptyStateText = styled.p`
  font-size: 0.938rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 400px;
`

export const ErrorState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`

export const ErrorStateText = styled.p`
  font-size: 0.938rem;
  color: ${colors.error};
`

export const PullToRefresh = styled.div<{ $distance: number }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(${({ $distance }) => $distance - 40}px);
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  z-index: 10;
  opacity: ${({ $distance }) => Math.min($distance / 80, 1)};
  transition: opacity 0.2s;
`

// src/pages/Home/styles.ts - Adicionar esses estilos

export const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`

export const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`

export const EndMessage = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
`

export const PullMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.875rem;
`

export const ReleaseMessage = styled.div`
  text-align: center;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 0.875rem;
  font-weight: 600;
`
