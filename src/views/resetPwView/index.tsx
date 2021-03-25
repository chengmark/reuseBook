import { AccountCircle } from '@material-ui/icons'
import { checkIntegrity, VALIDATORS } from '@src/formIntegrity'
import { CenteredLayout } from '@src/layout'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { useHistory } from 'react-router'
import { Container, IconRow, Line, Input, Btn, LinkText } from './style'
import { useSnackbar } from 'notistack'
import UserService from '@src/services/UserService'
import { LOCATIONS, toPath } from '@src/routes'
import { Wrapper } from '../loginView/style'

type Props = {
  children?: ReactElement
}

const ResetPwView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const [input, setInput] = useState({
    password: { value: '', errMsg: '' },
  })
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleSubmit = () => {
    // integrity check
    const password = checkIntegrity(input.password, [VALIDATORS.REQUIRED])
    setInput({ ...input, password })
    const tokenId = new URLSearchParams(location.search).get('token')
    UserService.resetPassword({ tokenId: tokenId, password: input.password.value })
      .then((res) => {
        setResetSuccess(true)
      })
      .catch((err) => {
        if (err.response) enqueueSnackbar(err.response.data.message, { variant: 'error' })
      })
  }

  return (
    <CenteredLayout>
      <Wrapper>
        <Container secondary>
          <IconRow>
            <Line />
            <AccountCircle fontSize="inherit" color="inherit"></AccountCircle>
            <Line />
          </IconRow>
          {resetSuccess ? (
            <>
              <span>{`You have reset your password.`}</span>
              <LinkText
                onClick={() => {
                  history.push(toPath(LOCATIONS.login))
                }}
              >{`Login here`}</LinkText>
            </>
          ) : (
            <>
              <Input
                id="password-input"
                name="password"
                label="New Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                error={!!input.password.errMsg}
                helperText={input.password.errMsg}
                onChange={handleInputChange}
              />
              <Btn variant="contained" color="primary" onClick={handleSubmit}>
                RESET PASSWORD
              </Btn>
            </>
          )}
        </Container>
      </Wrapper>
    </CenteredLayout>
  )
}

export default ResetPwView
