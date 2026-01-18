import styled, { createGlobalStyle } from 'styled-components'
import { light } from './themes/light'
import ChirpRegular from '../assets/fonts/chirp-regular-web.woff'
import ChirpMedium from '../assets/fonts/chirp-medium-web.woff'
import ChirpBold from '../assets/fonts/chirp-bold-web.woff'
import ChirpHeavy from '../assets/fonts/chirp-heavy-web.woff'

// 🎨 Cores compartilhadas (usadas em ambos os temas)
export const colors = {
  white: '#FFFFFF',
  black: '#000000',

  // Accent
  primary: '#1D9BF0',
  primaryHover: '#1A8CD8',

  // Feedback
  success: '#00BA7C',
  error: '#F4212E',
  warning: '#FFD400',

  // Hover
  hover: {
    primary: 'rgba(29, 155, 240, 0.1)',
    error: '#c9182b'
  }
}

// 📱 Breakpoints de responsividade
export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
}

// ⏱️ Transições
export const transitions = {
  fast: '150ms ease-in-out',
  normal: '300ms ease-in-out',
  slow: '500ms ease-in-out'
}

// 🔤 Tamanhos de fonte
export const fontSizes = {
  xs: '11px',
  sm: '13px',
  md: '15px',
  lg: '17px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px'
}

// 📏 Pesos de fonte
export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
  heavy: 900
}

// 🌍 Estilos globais
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Chirp';
    src: url(${ChirpRegular}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Chirp';
    src: url(${ChirpMedium}) format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Chirp';
    src: url(${ChirpBold}) format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Chirp';
    src: url(${ChirpHeavy}) format('woff');
    font-weight: 900;
    font-style: normal;
  }

  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Chirp', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    letter-spacing: 0.015em;
  }

  /* ← FORÇAR SCROLLBAR SEMPRE VISÍVEL */
  html {
    overflow: auto scroll;
    overscroll-behavior-y: none;
    color-scheme: ${(props) => (props.theme === light ? 'light' : 'dark')};
  }

  /* Body */
  body {
    font-size: ${fontSizes.xxl};
    font-weight: ${fontWeights.regular};
    line-height: 1.5;
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.background.primary};
    -webkit-font-smoothing: antialiased;
  }

  /* Listas */
  ul, ol {
    list-style: none;
  }
`

// Layout Principal

export const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`

export const HeaderSection = styled.header`
  display: flex;
  flex: 1 1 0;
  justify-content: flex-end;
`

export const MainSection = styled.main`
  display: flex;
  width: 1117px;
`

export const ContentWrapper = styled.div`
  width: 1050px;
  display: flex;
  justify-content: space-between;
`
