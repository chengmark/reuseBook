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
import SellView from './views/sellView'
import { useSnackbar } from 'notistack'

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
  sell: 'sell',
}

export const toPath = (location: string): string => {
  return '/' + location
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Routes = (props: Props): ReactElement => {
  const loggedIn = useUserState().loggedIn()
  const { enqueueSnackbar } = useSnackbar()

  const requireLogin = (element: ReactElement): ReactElement => {
    if (loggedIn) return element
    else {
      enqueueSnackbar('Please login', { variant: 'info' })
      return <Redirect to={toPath(LOCATIONS.login)} />
    }
  }

  return (
    <>
      <GlobalStyles />
      <AppView>
        <Navigation />
        <MainLayout>
          <Switch>
            <Route exact path={['/', toPath(LOCATIONS.home)]}>
              <HomeView />
            </Route>
            <Route exact path={toPath(LOCATIONS.search)}>
              <SearchView>
                <div>Search View</div>
              </SearchView>
            </Route>
            <Route exact path={toPath(LOCATIONS.profile)}>
              {requireLogin(<ProfileView />)}
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
              <LoginView />
            </Route>
            <Route exact path={toPath(LOCATIONS.sell)}>
              {requireLogin(<SellView />)}
            </Route>
          </Switch>
        </MainLayout>
      </AppView>
    </>
  )
}

export default Routes
