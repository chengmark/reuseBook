import styled from 'styled-components'
import { COLOR } from '@src/styling'
import { MEDIA_BREAK, NAV_WIDTH } from '@src/layout'

export const NavWrapper = styled.div`
  grid-area: navigation;
  position: relative;
  top: 0;
  left: 0;
  width: ${NAV_WIDTH}px;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background: ${COLOR.bg.light};
  border-right: 1px solid ${COLOR.divider.light};
  @media (max-width: ${MEDIA_BREAK}px) {
    border-right: 0px;
    border: 1px solid ${COLOR.divider.dark};
    border-radius: 15px;
    height: calc(${NAV_WIDTH}px - 5px);
    width: calc(100% - 10px);
    margin: 0 5px 0 5px;
  }
  z-index: 100;
`
export const NavigationGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: ${NAV_WIDTH}px;
  height: calc(100% - 24px);
  overflow: hidden;
  overflow-y: auto;
  padding: 12px 0 12px;
  @media (max-width: ${MEDIA_BREAK}px) {
    flex: 1 1 1 1 1;
    flex-direction: row;
    height: 100%;
    max-width: calc(100% - 24px);
    grid-template-rows: none;
    grid-template-columns: repeat(6, 1fr);
    padding: 0 12px 0px 12px;
  }
`

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: ${COLOR.divider.light};
  margin: 5px 0 5px 0;
  @media (max-width: ${MEDIA_BREAK}px) {
    display: none;
  }
`

// reference: spectrum/views/navigation/style.js
