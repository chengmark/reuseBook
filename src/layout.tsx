import styled from 'styled-components'

export const NAV_WIDTH = 72
export const NAV_EXPANDED_WIDTH = 256
export const MIN_MAIN_COLUMN_WIDTH = 600
export const MAX_MAIN_COLUMN_WIDTH = 968
export const SEARCH_BAR_HEIGHT = 62
export const FOOTER_HEIGHT = 100
// add 144 (72 * 2) to account for the left side nav
export const MEDIA_BREAK = MIN_MAIN_COLUMN_WIDTH + NAV_WIDTH * 2

export const AppLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${NAV_WIDTH}px 1fr;
  grid-template-areas: 'navigation main';
  @media (max-width: ${MEDIA_BREAK}px) {
    height: 100%;
    grid-template-columns: none;
    grid-template-rows: auto ${NAV_WIDTH}px;
    grid-template-areas: 'main' 'navigation';
  }
`

/* navbar on left, main view on right (desktop version)
┌──┬───────────┐
│xx│     xx    │
│  │           │
│xx│     xx    │
│  │           │
│xx│     xx    │
└──┴───────────┘
*/

/* navbar on bottom, main view on right (mobile version)
┌──────────────┐
│      xx      │
│      xx      │
│      xx      │
│      xx      │
│──────────────│
└──────────────┘
*/

export const MainLayout = styled.main.attrs({
  className: 'main-view',
})`
  grid-area: main;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: auto;
`

/*
┌──────────────┐
│      xx      │
│              │
│      xx      │
│              │
│      xx      │
└──────────────┘
*/

export const CenteredLayout = styled.div`
  display: grid;
  justify-self: center;
  grid-template-columns: ${MAX_MAIN_COLUMN_WIDTH}px;
  align-self: center;
  max-width: ${MAX_MAIN_COLUMN_WIDTH}px;
  grid-template-columns: minmax(${MIN_MAIN_COLUMN_WIDTH}px, ${MAX_MAIN_COLUMN_WIDTH}px);
`

/*
┌─────────────┐
│             │
│    ┌───┐    │
│    │ x │    │
│    └───┘    │
│             │
└─────────────┘
*/

// reference spectrum/src/component/layout/index.js
