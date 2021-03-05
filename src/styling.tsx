import { createGlobalStyle } from 'styled-components'

// global stylings
export const GlobalStyles = createGlobalStyle`

  html, body{
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  #root{
    width: 100%;
    height: 100%;
  }

  .App{
    width: 100%;
    height: 100%;
  }

`

export const COLOR = {
  bg: {
    light: '#FFFFFF',
    dark: '#000000',
  },
  font: {
    primary: {
      light: '#000000',
      dark: '#FFFFFF',
    },
    secondary: {
      light: '#000000',
      dark: '#FFFFFF',
    },
  },
  divider: {
    light: '#EBECED',
    dark: '#EBECED',
  },
  active: {
    light: 'rgba(36, 41, 46, 0.04)',
    dark: 'rgba(36, 41, 46, 0.04)',
  },
}

export const TRANSITION = {
  hover: {
    on: '.2s',
    off: '.2s',
  },
}
