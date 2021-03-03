import React, { ReactElement, useState } from 'react'
import { Route } from 'react-router-dom'
import { NavWrapper, NavigationGrid } from './style'
// import { Obj } from '../../../shared/types/General'
// import HomeTab from './HomeTab'
// import UserTab from './UserTab'

type Props = {
  history?: History
  //   user?: Obj
}

const Navigation = (props: Props): ReactElement => {
  return (
    <NavWrapper>
      <NavigationGrid>
        {/* <Route path="/home">{({ match }) => <HomeTab isActive={!!match} />}</Route>
        <Route path="/user">{({ match }) => <UserTab isActive={!!match} />}</Route> */}
      </NavigationGrid>
    </NavWrapper>
  )
}

export default Navigation
