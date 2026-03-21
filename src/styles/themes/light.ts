export const light = {
  name: 'light',
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F7F9F9',
      tertiary: '#EFF3F4',
      blur: 'rgba(255, 255, 255, 0.65)',
      reverseBlur: 'rgba(0, 0, 0, 0.65)',
      modalBlur: 'rgba(0, 0, 0, 0.20)'
    },

    text: {
      primary: '#0F1419',
      secondary: '#536471',
      tertiary: '#71767B',
      reverse: '#E7E9EA'
    },

    border: {
      primary: '#EFF3F4',
      secondary: '#CFD9DE'
    },

    hover: {
      primary: '#F7F9F9',
      secondary: 'rgba(101, 119, 134, 0.2)'
    },

    shadow: {
      primary: 'rgba(101, 119, 134, 0.2)',
      secondary: 'rgba(101, 119, 134, 0.15)'
    }
  }
}

export type Theme = typeof light
