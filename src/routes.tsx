import React, { ReactChild, ReactElement } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Navigation from '@components/navigation'
import AppView from './views/appView'
import HomeView from './views/homeView'
import SearchView from './views/searchView'
import ProfileView from './views/profileView'
import CartView from './views/cartView'
import SettingsView from './views/settingsView'
import { GlobalStyles } from './styling'
import LoginView from './views/loginView'
import { MainLayout } from './layout'
import { useUserState } from './context/UserContext'
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Routes = (props: Props): ReactElement => {
  const loggedIn = useUserState().loggedIn()

  return (
    <>
      <GlobalStyles />
      <AppView>
        <Navigation />
        <MainLayout>
          <Switch>
            <Route exact path={['/', toPath(LOCATIONS.home)]}>
              <HomeView></HomeView>
            </Route>
            <Route exact path={toPath(LOCATIONS.search)}>
              <SearchView>
                <div>Search View</div>
              </SearchView>
            </Route>
            <Route exact path={toPath(LOCATIONS.profile)}>
              {loggedIn ? (
                <ProfileView>
                  <div> Profile view </div>
                </ProfileView>
              ) : (
                <Redirect to={toPath(LOCATIONS.login)} />
              )}
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
              <LoginView></LoginView>
            </Route>
          </Switch>
        </MainLayout>
      </AppView>
    </>
  )
}

export default Routes
