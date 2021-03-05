import styled from 'styled-components'
import { TRANSITION } from '@src/styling'
import { COLOR } from '@src/styling'
import { Link } from 'react-router-dom'
import { MEDIA_BREAK } from '@src/layout'

type Props = {
  isActive?: boolean
  toBottom?: boolean
}

export const NavItemContainer = styled.div`
  ${(props: Props) => `
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: ${props.isActive ? COLOR.active.light : COLOR.bg.light};
    transition: ${TRANSITION.hover.off};
    ${props.isActive ? ` box-shadow: rgb(36, 41, 46) 3px 0px 0px inset; ` : ``}
    &:hover {
      transition: ${TRANSITION.hover.on};
      background: ${COLOR.active.light};
    }
    ${props.toBottom ? `margin-top: auto;` : ``}

    @media (max-width: ${MEDIA_BREAK}px) {
      ${props.isActive ? ` box-shadow: 0px -3px 0px rgb(36, 41, 46) inset; ` : ``}
      margin-top:0;
      flex:1;
    }

  `}
`

export const NavItemLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: currentColor;
  text-decoration: none;
  padding: 8px 12px;
  width: 100%;
`

export const navIconStyle = {
  fontSize: '32px',
}

// reference: spectrum/views/navigation/style.js
