import React, { Dispatch, ReactElement, SetStateAction } from 'react'
import { AccountCircle } from '@material-ui/icons'
import { Button, TextField } from '@material-ui/core'
import { LOGIN, RESET_PW } from '..'
import { Container, IconRow, Line, CenteredRow, DividerText, LinkText, useStyles } from '../style'

type Props = {
  setOperation: Dispatch<SetStateAction<number>>
}

const SignupForm = (props: Props): ReactElement => {
  const { setOperation } = props
  const classes = useStyles()
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
          label="Username"
          type="text"
          autoComplete="current-username"
          variant="outlined"
          className={classes.textField}
        />
        <TextField
          id="password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className={classes.textField}
        />
        <Button variant="contained" color="primary" className={classes.button}>
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
