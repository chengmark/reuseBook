import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { AccountCircle } from '@material-ui/icons'
import { LOGIN } from '..'
import { Container, IconRow, Line, LinkText, Input, Btn } from '../style'
import { checkIntegrity, VALIDATORS } from '@src/formIntegrity'
import UserService from '@src/services/UserService'
import { useSnackbar } from 'notistack'

type Props = {
  setOperation: Dispatch<SetStateAction<number>>
}

const ForgotPwForm = (props: Props): ReactElement => {
  const { setOperation } = props
  const [input, setInput] = useState({
    email: { value: '', errMsg: '' },
  })
  const [sentRequest, setSentRequest] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleSubmit = () => {
    // integrity check
    const email = checkIntegrity(input.email, [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
    setInput({ ...input, email })
    UserService.createResetToken({ email: email.value })
      .then(() => {
        setSentRequest(true)
      })
      .catch((err) => {
        if (err.response) enqueueSnackbar(err.response.data.message, { variant: 'error' })
      })
  }

  return (
    <>
      <Container>
        <IconRow>
          <Line></Line>
          <AccountCircle fontSize="inherit" color="inherit"></AccountCircle>
          <Line></Line>
        </IconRow>
        {sentRequest ? (
          <>
            <span>{`We have sent an email to ${input.email.value}. Please follow the instruction to reset your password.`}</span>
          </>
        ) : (
          <>
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
            <Btn variant="contained" color="primary" onClick={handleSubmit}>
              RESET PASSWORD
            </Btn>
          </>
        )}
      </Container>
      <Container secondary>
        <LinkText onClick={() => setOperation(LOGIN)}>Back to log in.</LinkText>
      </Container>
    </>
  )
}

export default ForgotPwForm
