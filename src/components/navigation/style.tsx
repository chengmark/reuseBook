import styled from 'styled-components'
import { COLOR } from '@src/styling'
import { NAV_WIDTH } from '@src/layout'

export const NavWrapper = styled.div`
  grid-area: navigation;
  position: sticky;
  top: 0;
  left: 0;
  width: ${NAV_WIDTH}px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
`
export const NavigationGrid = styled.div`
  display: grid;
  align-content: start;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: ${NAV_WIDTH}px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  padding: 12px 0 12px;
  border-right: 1px solid ${COLOR.divider.light};
`
// reference: spectrum/views/navigation/style.js
