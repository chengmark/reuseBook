import Routes from './hot-routes'
import React, { createRef } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import UserProvider from './context/UserContext'
import { SnackbarKey, SnackbarProvider } from 'notistack'
import { Button, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { COLOR } from './styling'

const App = () => {
  const notistackRef = createRef<any>()
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <SnackbarProvider
            preventDuplicate
            ref={notistackRef}
            action={(key) => (
              <IconButton onClick={onClickDismiss(key)} style={{ color: COLOR.font.light }}>
                <CloseIcon />
              </IconButton>
            )}
          >
            <Routes />
          </SnackbarProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
