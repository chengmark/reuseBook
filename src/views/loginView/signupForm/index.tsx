import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { AccountCircle } from '@material-ui/icons'
import { LOGIN, RESET_PW } from '..'
import { Container, IconRow, Line, CenteredRow, DividerText, LinkText, InputRow, Input } from '../style'
import { VALIDATORS, checkIntegrity, formNoErr, toData } from '@src/formIntegrity'
import UserService from '@src/services/UserService'
import { useUserState } from '@src/context/UserContext'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'
import { useSnackbar } from 'notistack'
import { Btn } from '@src/views/sellView/style'

type Props = {
  setOperation: Dispatch<SetStateAction<number>>
}

const SignupForm = (props: Props): ReactElement => {
  const { setOperation } = props
  const [input, setInput] = useState({
    email: { value: '', errMsg: '' },
    username: { value: '', errMsg: '' },
    password: { value: '', errMsg: '' },
    firstname: { value: '', errMsg: '' },
    lastname: { value: '', errMsg: '' },
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
    const email = checkIntegrity(input.email, [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
    const username = checkIntegrity(input.username, [VALIDATORS.REQUIRED])
    const password = checkIntegrity(input.password, [VALIDATORS.REQUIRED, VALIDATORS.NUM_AND_LETTER])
    const firstname = checkIntegrity(input.firstname, [VALIDATORS.REQUIRED])
    const lastname = checkIntegrity(input.lastname, [VALIDATORS.REQUIRED])
    setInput({ ...input, email, username, password, firstname, lastname })
    if (formNoErr(input)) {
      UserService.signup(toData(input))
        .then((res) => {
          // userState.updateState(res)
          setOperation(LOGIN)
          // history.push(toPath(LOCATIONS.profile))
          enqueueSnackbar('Successful signup. You can login now. ', { variant: 'success' })
        })
        .catch((err) => {
          if (err.response) enqueueSnackbar(err.response.data.message, { variant: 'error' })
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
        <Input
          id="email-input"
          name="email"
          label="Email"
          type="text"
          autoComplete="current-email"
          variant="outlined"
          error={!!input.email.errMsg}
          helperText={input.email.errMsg}
          onChange={handleInputChange}
        />
        <Input
          id="username-input"
          name="username"
          label="Username"
          type="text"
          autoComplete="current-username"
          variant="outlined"
          error={!!input.username.errMsg}
          helperText={input.username.errMsg}
          onChange={handleInputChange}
        />
        <Input
          id="password-input"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          error={!!input.password.errMsg}
          helperText={input.password.errMsg}
          onChange={handleInputChange}
        />
        <InputRow>
          <Input
            id="firstname-input"
            name="firstname"
            label="First Name"
            type="firstname"
            autoComplete="current-firstname"
            variant="outlined"
            error={!!input.firstname.errMsg}
            helperText={input.firstname.errMsg}
            onChange={handleInputChange}
          />
          <Input
            id="lastname-input"
            name="lastname"
            label="Last Name"
            type="lastname"
            autoComplete="current-lastname"
            variant="outlined"
            error={!!input.lastname.errMsg}
            helperText={input.lastname.errMsg}
            onChange={handleInputChange}
          />
        </InputRow>
        <Btn variant="contained" color="primary" onClick={handleSubmit}>
          SIGN UP
        </Btn>
        <CenteredRow>
          <Line></Line>
          <DividerText>OR</DividerText>
          <Line></Line>
        </CenteredRow>
        <CenteredRow>
          <LinkText onClick={() => setOperation(RESET_PW)}>Forgot password?</LinkText>
        </CenteredRow>
      </Container>
      <Container secondary>
        <div>{'Already have an account?'}</div>
        <LinkText onClick={() => setOperation(LOGIN)}>Log in here.</LinkText>
      </Container>
    </>
  )
}

export default SignupForm
