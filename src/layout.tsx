import styled from 'styled-components'
import { COLOR } from './styling'

export const NAV_WIDTH = 72
export const NAV_EXPANDED_WIDTH = 256

export const MIN_MAIN_COLUMN_WIDTH = 480
export const MAX_MAIN_COLUMN_WIDTH = 580

export const MAX_APP_COLUMN_WIDTH = 260 // for app view

export const SEARCH_BAR_HEIGHT = 62
export const FOOTER_HEIGHT = 100

export const MEDIA_BREAK = MIN_MAIN_COLUMN_WIDTH + NAV_WIDTH * 2 // 572px

export const AppLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${NAV_WIDTH}px 1fr;
  grid-template-areas: 'navigation main';
  background: ${COLOR.bg.grey};
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

/* navbar on bottom, main view on top (mobile version)
┌──────────────┐
│      xx      │
│      xx      │
│      xx      │
│      xx      │
│──────────────│
└──────────────┘
*/

export const MainLayout = styled.div`
  display: grid;
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
  place-self: center;
  max-width: ${MAX_MAIN_COLUMN_WIDTH}px;
  grid-template-columns: minmax(${MIN_MAIN_COLUMN_WIDTH}px, ${MAX_MAIN_COLUMN_WIDTH}px);
  @media (max-width: ${MEDIA_BREAK}px) {
    max-width: ${MAX_APP_COLUMN_WIDTH}px;
    grid-template-columns: ${MAX_APP_COLUMN_WIDTH}px;
  }
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
