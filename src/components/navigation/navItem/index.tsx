import { SvgIconTypeMap } from '@material-ui/core'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { Obj } from '@myTypes/Obj'
import Tooltip from '@src/components/tooltip'
import { toPath } from '@src/routes'
import React, { ReactElement } from 'react'
import { navIconStyle, NavItemContainer, NavItemLink } from './style'

type Props = {
  title: string
  isActive: boolean
  toBottom?: boolean // whether this is the item to start placing bottom
  icon: OverridableComponent<SvgIconTypeMap<Obj, 'svg'>>
}

const NavItem = (props: Props): ReactElement => {
  const { title, isActive, toBottom = false, ...rest } = props
  const Icon = props.icon
  return (
    <Tooltip title={title} style={{ fontSize: '16px' }}>
      <NavItemContainer isActive={isActive} toBottom={toBottom} {...rest}>
        <NavItemLink to={toPath(title)}>
          <Icon style={navIconStyle}></Icon>
        </NavItemLink>
      </NavItemContainer>
    </Tooltip>
  )
}

export default NavItem
