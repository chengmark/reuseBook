import React, { ReactChild, ReactElement } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Navigation from '@components/navigation'
import AppView from './views/appView'
import MainView from './views/mainView'
import SearchView from './views/searchView'
import ProfileView from './views/profileView'
import CartView from './views/cartView'
import SettingsView from './views/settingsView'
import { GlobalStyles } from './styling'
// import LoadingView from './views/loadingView'

// const Sample = Loadable({
//   loader: () => import('./views/SampleView'),
//   loading: ({ isLoading }: LoadingComponentProps): ReactElement => (isLoading ? <LoadingView /> : <></>),
// })

type Props = {
  children?: ReactChild | ReactChild[]
}

export const LOCATIONS = {
  home: 'home',
  search: 'search',
  profile: 'profile',
  login: 'login',
  shoppingCart: 'shopping_cart',
  settings: 'settings',
}

export const toPath = (location: string): string => {
  return '/' + location
}

const Routes = (props: Props): ReactElement => {
  return (
    <>
      <GlobalStyles />
      <AppView>
        <Navigation />
        <Switch>
          <Route exact path={['/', toPath(LOCATIONS.home)]}>
            <MainView></MainView>
          </Route>
          <Route exact path={toPath(LOCATIONS.search)}>
            <SearchView>
              <div>Search View</div>
            </SearchView>
          </Route>
          <Route exact path={toPath(LOCATIONS.profile)}>
            <ProfileView>
              <div> Profile view </div>
            </ProfileView>
          </Route>
          <Route exact path={toPath(LOCATIONS.shoppingCart)}>
            <CartView>
              <div> Shopping cart view </div>
            </CartView>
          </Route>
          <Route exact path={toPath(LOCATIONS.settings)}>
            <SettingsView>
              <div> Settings view </div>
            </SettingsView>
          </Route>
          <Route exact path={toPath(LOCATIONS.login)}>
            <SettingsView>
              <div> Login view </div>
            </SettingsView>
          </Route>
        </Switch>
      </AppView>
    </>
  )
}

export default Routes
