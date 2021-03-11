import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { AccountCircle } from '@material-ui/icons'
import { Button, TextField } from '@material-ui/core'
import { LOGIN } from '..'
import { Container, IconRow, Line, CenteredRow, LinkText, useStyles } from '../style'
import { checkIntegrity, VALIDATORS } from '@src/formIntegrity'

type Props = {
  setOperation: Dispatch<SetStateAction<number>>
}

const ResetPwForm = (props: Props): ReactElement => {
  const { setOperation } = props
  const classes = useStyles()
  const [input, setInput] = useState({
    email: { value: '', errMsg: '' },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = input
    nextState[e.target.name as keyof typeof input] = { value: e.target.value, errMsg: '' }
    setInput({ ...nextState })
  }

  const handleSubmit = () => {
    // integrity check
    const email = checkIntegrity(input.email, [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
    setInput({ ...input, email })
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
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
          RESET PASSWORD
        </Button>
      </Container>
      <Container>
        <LinkText onClick={() => setOperation(LOGIN)}>Back to log in.</LinkText>
      </Container>
    </>
  )
}

export default ResetPwForm
