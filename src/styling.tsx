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

/**
 * bg is for general background coloring
 * font is for general font colors
 * the above two scheme is usually only black white contrast
 * primary & secondary is the theme color,
 * use more primary & secondary for better UI
 */
export const COLOR = {
  bg: {
    light: '#FFFFFF', // white
    dark: '#012032', // dark blue from primary
    grey: '#F5FBFF',
  },
  divider: {
    light: '#D6D6D6',
    dark: '#BDBDBD',
  },
  font: {
    light: '#F5FBFF',
    dark: '#012032',
  },
  primary: {
    main: '#167BFF',
    tint1: '#E0EEFF',
    tint2: '#7AB4FF',
    shade1: '#0061E0',
    shade2: '#004BAD',
  },
  secondary: {
    main: '#FF9916',
    tint1: '#FFF2E0',
    tint2: '#FFC57A',
    shade1: '#E07E00',
    shade2: '#AD6100',
  },
  error: {
    shade: '#F44336',
    tint: '#FCC9C5',
  },
}

export const TRANSITION = {
  hover: {
    on: '.2s',
    off: '.2s',
  },
}
