import styled from 'styled-components'

const SECOND_COLUMN_WIDTH = 380

export const ProfileLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${SECOND_COLUMN_WIDTH}px 1fr;
  grid-template-areas: 'secondary main';
`

/* second col on left, main col on right (desktop version)
┌──┬───────────┐
│xx│     xx    │
│  │           │
│xx│     xx    │
│  │           │
│xx│     xx    │
└──┴───────────┘
*/

export const SecondaryColumn = styled.div`
  grid-area: secondary;
  display: flex;
  flex-direction: column;
  padding: 24px;
`
export const MainColumn = styled.div`
  grid-area: main;
  display: flex;
`
