import React, { ReactElement } from 'react'

type Props = {
  children?: ReactElement
}

const NavItem = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return <>{children}</>
}

export default NavItem
