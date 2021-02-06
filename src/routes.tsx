import React, { ReactChild, ReactElement } from 'react'
import Loadable, { LoadingComponentProps } from 'react-loadable'
import { Redirect, Route, Switch } from 'react-router-dom'
// import Navigation from './components/navigation'
import MainView from './views/mainView'
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
    <MainView>
      {/* <Navigation /> */}
      <Switch>
        <Route exact path="/">
          {/* <Sample /> */}
          <div> test </div>
        </Route>
      </Switch>
    </MainView>
  )
}

export default Routes
