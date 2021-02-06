import styled from 'styled-components'

export const NAV_WIDTH = 72
export const NAVBAR_EXPANDED_WIDTH = 256
export const MIN_PRIMARY_COLUMN_WIDTH = 600
export const MIN_SECONDARY_COLUMN_WIDTH = 320
export const MAX_PRIMARY_COLUMN_WIDTH = 968
export const MAX_SECONDARY_COLUMN_WIDTH = 400
export const COL_GAP = 24
export const HEADER_HEIGHT = 62
export const MIN_MAX_WIDTH = MIN_PRIMARY_COLUMN_WIDTH + MIN_SECONDARY_COLUMN_WIDTH + COL_GAP
export const MAX_WIDTH = MAX_PRIMARY_COLUMN_WIDTH + MAX_SECONDARY_COLUMN_WIDTH + COL_GAP
export const MIN_WIDTH_TO_EXPAND_NAVIGATION = MAX_WIDTH + 256
export const SINGLE_COLUMN_WIDTH = MAX_WIDTH
// add 144 (72 * 2) to account for the left side nav
export const MEDIA_BREAK = MIN_PRIMARY_COLUMN_WIDTH + MIN_SECONDARY_COLUMN_WIDTH + COL_GAP + NAV_WIDTH * 2

export const AppLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${NAV_WIDTH}px 1fr;
  grid-template-areas: 'navigation main';
`

/* navbar on left, main view on right
┌──┬───────────┐
│xx│     xx    │
│  │           │
│xx│     xx    │
│  │           │
│xx│     xx    │
└──┴───────────┘
*/

export const MainLayout = styled.main.attrs({
  className: 'main-view',
})`
  display: grid;
  grid-area: main;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: auto;

  @media (max-width: ${MEDIA_BREAK}px) {
    max-height: calc(100vh - ${HEADER_HEIGHT}px);
  }
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
  grid-template-columns: ${MAX_WIDTH}px;
  align-self: center;
  max-width: ${MAX_PRIMARY_COLUMN_WIDTH}px;
  grid-template-columns: minmax(${MIN_PRIMARY_COLUMN_WIDTH}px, ${MAX_PRIMARY_COLUMN_WIDTH}px);
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
