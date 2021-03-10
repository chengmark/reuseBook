import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { AccountCircle } from '@material-ui/icons'
import { Button, TextField } from '@material-ui/core'
import { LOGIN, RESET_PW } from '..'
import { Container, IconRow, Line, CenteredRow, DividerText, LinkText, useStyles } from '../style'
import { VALIDATORS, checkIntegrity } from '@src/formIntegrity'

type Props = {
  setOperation: Dispatch<SetStateAction<number>>
}

const SignupForm = (props: Props): ReactElement => {
  const { setOperation } = props
  const classes = useStyles()
  const [input, setInput] = useState({
    email: { value: '', errMsg: '' },
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
    const email = checkIntegrity(input.email, [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
    const username = checkIntegrity(input.username, [VALIDATORS.REQUIRED])
    const password = checkIntegrity(input.password, [VALIDATORS.REQUIRED])
    setInput({ ...input, email, username, password })
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
          id="email-input"
          name="email"
          label="Email"
          type="text"
          autoComplete="current-email"
          variant="outlined"
          className={classes.textField}
          error={!!input.email.errMsg}
          helperText={input.email.errMsg}
          onChange={handleInputChange}
        />
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
          SIGN UP
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
        <div>{'Already have an account?'}</div>
        <LinkText onClick={() => setOperation(LOGIN)}>Log in here.</LinkText>
      </Container>
    </>
  )
}

export default SignupForm
