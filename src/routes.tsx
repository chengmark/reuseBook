import React, { ReactChild, ReactElement } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Navigation from '@components/navigation'
import AppView from './views/appView'
import MainView from './views/mainView'
import SearchView from './views/searchView'
import ProfileView from './views/profileView'
import CartView from './views/cartView'
// import LoadingView from './views/loadingView'

// const Sample = Loadable({
//   loader: () => import('./views/SampleView'),
//   loading: ({ isLoading }: LoadingComponentProps): ReactElement => (isLoading ? <LoadingView /> : <></>),
// })

type Props = {
  children?: ReactChild | ReactChild[]
}

const Routes = (props: Props): ReactElement => {
  return (
    <AppView>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <MainView></MainView>
        </Route>
        <Route exact path="/search">
          <SearchView>
            <div>Search View</div>
          </SearchView>
        </Route>
        <Route exact path="/profile">
          <ProfileView>
            <div> Profile view </div>
          </ProfileView>
        </Route>
        <Route exact path="/cart">
          <CartView>
            <div> Shopping cart view </div>
          </CartView>
        </Route>
      </Switch>
    </AppView>
  )
}

export default Routes
