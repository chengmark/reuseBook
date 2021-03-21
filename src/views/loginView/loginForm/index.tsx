import { Button, TextField } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useUserState } from '@src/context/UserContext'
import { checkIntegrity, toData, VALIDATORS, formNoErr } from '@src/formIntegrity'
import UserHelper from '@src/helpers/UserHelper'
import { LOCATIONS, toPath } from '@src/routes'
import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SIGNUP, RESET_PW } from '..'
import { CenteredRow, Container, DividerText, IconRow, Line, LinkText, useStyles } from '../style'
import { useSnackbar } from 'notistack'

type Props = {
  setOperation: Dispatch<SetStateAction<number>>
}

const LoginForm = (props: Props): ReactElement => {
  const { setOperation } = props
  const classes = useStyles()
  const [input, setInput] = useState({
    emailOrUsername: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
  })
  const userState = useUserState()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleSubmit = () => {
    // integrity check
    const emailOrUsername = checkIntegrity(input.emailOrUsername, [VALIDATORS.REQUIRED])
    const password = checkIntegrity(input.password, [VALIDATORS.REQUIRED])
    setInput({ ...input, emailOrUsername, password })
    if (formNoErr(input)) {
      UserHelper.login(toData(input))
        .then((res) => {
          userState.updateState(res)
          history.push(toPath(LOCATIONS.profile))
          enqueueSnackbar('Successful login', { variant: 'success' })
        })
        .catch((err) => {
          console.log(err.response)
          enqueueSnackbar('Error', { variant: 'error' })
        })
    }
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
          id="username-or-email-input"
          name="emailOrUsername"
          label="Username or Email"
          type="text"
          autoComplete="current-emailOrUsername"
          variant="outlined"
          className={classes.textField}
          error={!!input.emailOrUsername.errMsg}
          helperText={input.emailOrUsername.errMsg}
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
