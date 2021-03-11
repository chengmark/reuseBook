import { Button, TextField } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { checkIntegrity, VALIDATORS } from '@src/formIntegrity'
import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { SIGNUP, RESET_PW } from '..'
import { CenteredRow, Container, DividerText, IconRow, Line, LinkText, useStyles } from '../style'

type Props = {
  setOperation: Dispatch<SetStateAction<number>>
}

const LoginForm = (props: Props): ReactElement => {
  const { setOperation } = props
  const classes = useStyles()
  const [input, setInput] = useState({
    username: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleSubmit = () => {
    // integrity check
    const username = checkIntegrity(input.username, [VALIDATORS.REQUIRED])
    const password = checkIntegrity(input.password, [VALIDATORS.REQUIRED])
    setInput({ ...input, username, password })
  }

  return (
    <>
      <Container>
        <IconRow>
          <Line></Line>
          <AccountCircle fontSize="inherit" color="inherit"></AccountCircle>
          <Line></Line>
        </IconRow>
        <TextField
          id="username-input"
          name="username"
          label="Username"
          type="text"
          autoComplete="current-username"
          variant="outlined"
          className={classes.textField}
          error={!!input.username.errMsg}
          helperText={input.username.errMsg}
          onChange={handleInputChange}
        />
        <TextField
          id="password-input"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className={classes.textField}
          error={!!input.password.errMsg}
          helperText={input.password.errMsg}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
          Log in
        </Button>
        <CenteredRow>
          <Line></Line>
          <DividerText>OR</DividerText>
          <Line></Line>
        </CenteredRow>
        <CenteredRow>
          <LinkText onClick={() => setOperation(RESET_PW)}>Forgot password?</LinkText>
        </CenteredRow>
      </Container>
      <Container>
        <div>{"Don't have an account yet?"}</div>
        <LinkText onClick={() => setOperation(SIGNUP)}>Sign up here.</LinkText>
      </Container>
    </>
  )
}

export default LoginForm
