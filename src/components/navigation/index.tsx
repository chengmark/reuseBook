import React, { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import SettingsIcon from '@material-ui/icons/Settings'
import { NavWrapper, NavigationGrid, Divider } from './style'
import { LOCATIONS, toPath } from '@src/routes'
import NavItem from './navItem'
import { AddBox } from '@material-ui/icons'

type Props = {
  history?: History
  //   user?: Obj
}

// const HomeTab = (props: Props): ReactElement => {
//   const { title, isActive, ...rest } = props
//   return <NavItem title={title} isActive={isActive} icon={HomeIcon} {...rest}></NavItem>
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Navigation = (props: Props): ReactElement => {
  return (
    <NavWrapper>
      <NavigationGrid>
        <Route exact path={['/', toPath(LOCATIONS.home)]}>
          {({ match }) => <NavItem title={LOCATIONS.home} isActive={!!match} icon={HomeIcon}></NavItem>}
        </Route>
        <Route exact path={toPath(LOCATIONS.shoppingCart)}>
          {({ match }) => <NavItem title={LOCATIONS.shoppingCart} isActive={!!match} icon={ShoppingCartIcon}></NavItem>}
        </Route>
        <Route exact path={toPath(LOCATIONS.profile)}>
          {({ match }) => <NavItem title={LOCATIONS.profile} isActive={!!match} icon={AccountCircleIcon}></NavItem>}
        </Route>
        <Divider></Divider>
        <Route exact path={toPath(LOCATIONS.login)}>
          {({ match }) => <NavItem title={LOCATIONS.login} isActive={!!match} icon={ExitToAppIcon}></NavItem>}
        </Route>
        <Route exact path={toPath(LOCATIONS.sell)}>
          {({ match }) => <NavItem title={LOCATIONS.sell} isActive={!!match} icon={AddBox}></NavItem>}
        </Route>
        <Route exact path={toPath(LOCATIONS.settings)}>
          {({ match }) => (
            <NavItem toBottom title={LOCATIONS.settings} isActive={!!match} icon={SettingsIcon}></NavItem>
          )}
        </Route>
      </NavigationGrid>
    </NavWrapper>
  )
}

export default Navigation
