import Routes from './hot-routes'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import './index.css'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  )
}

Loadable.preloadReady()
  .then(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
  })
  .catch((err) => {
    console.log(err)
  })
