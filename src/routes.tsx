import React, { ReactChild, ReactElement, useEffect, useState } from 'react'
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
import UserService from './services/UserService'
import ResetPwView from './views/resetPwView'
import ProductView from './views/productView'

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
  settings: 'settings',
  sell: 'sell',
  reset: 'reset', // reset pw
  product: 'product/:bookId',
}

export const toPath = (location: string): string => {
  return '/' + location
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Routes = (props: Props): ReactElement => {
  const userState = useUserState()
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  const requireLogin = (element: ReactElement): ReactElement => {
    if (userState.loggedIn()) return element
    else {
      enqueueSnackbar('Please login', { variant: 'info' })
      return <Redirect to={toPath(LOCATIONS.login)} />
    }
  }

  useEffect(() => {
    UserService.auth()
      .then((res) => {
        console.log(res)
        userState.updateState(res)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

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
            <Route exact path={toPath(LOCATIONS.product)}>
              <ProductView />
            </Route>
            <Route exact path={toPath(LOCATIONS.profile)}>
              {/* {({ match }) => !!match && requireLogin(<ProfileView />)} */}
              {() => !loading && requireLogin(<ProfileView />)}
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
              {() => !loading && requireLogin(<SellView />)}
            </Route>
            <Route exact path={toPath(LOCATIONS.reset)}>
              <ResetPwView />
            </Route>
          </Switch>
        </MainLayout>
      </AppView>
    </>
  )
}

export default Routes
