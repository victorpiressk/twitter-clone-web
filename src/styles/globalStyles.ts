import styled, { createGlobalStyle } from 'styled-components'
import { light } from './themes/light'

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
  lg: '18px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px'
}

// 📏 Pesos de fonte
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
}

// 🌍 Estilos globais
export const GlobalStyle = createGlobalStyle`
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ← FORÇAR SCROLLBAR SEMPRE VISÍVEL */
  html {
    overflow: auto scroll;
    overscroll-behavior-y: none;
    color-scheme: ${(props) => (props.theme === light ? 'light' : 'dark')};
  }

  /* Body */
  body {
    font-family: "Roboto", sans-serif;
    font-size: ${fontSizes.xxl};
    font-weight: ${fontWeights.regular};
    line-height: 1.5;
    color: ${(props) => props.theme.colors.text.primary};
    background-color: ${(props) => props.theme.colors.background.primary};

  }

  /* Listas */
  ul, ol {
    list-style: none;
  }
`

// 📦 Container principal
export const Container = styled.div`
  display: grid;
  grid-template-columns: 275px auto;

  max-width: ${breakpoints.wide};
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 50px auto;
    padding: 0 8px;
  }
`

// 📄 Container do conteúdo principal
export const MainContainer = styled.main`
  position: relative;
  left: 275px;

  display: grid;
  grid-template-columns: 600px 350px;
  gap: 32px;

  align-items: start;

  @media (max-width: ${breakpoints.tablet}) {
    left: 50px;
  }
`
