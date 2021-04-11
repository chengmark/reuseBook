import { Obj } from '@myTypes/Obj'
import React, { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { Container, Input, InputRow, Btn } from '../style'

type Props = {
  user: any // should change to specific user type, define in common types later
  setNewInfo: Dispatch<SetStateAction<any>>
  newInfo: any
}

const InfoForm = (props: Props): ReactElement => {
  const { user, setNewInfo, newInfo, ...rest } = props

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = newInfo
    nextState[e.target.name as keyof typeof newInfo] = { value: e.target.value, errMsg: '' }
    setNewInfo({ ...nextState })
  }

  return (
    <Container>
      <Input
        id="password-input"
        name="password"
        label="New Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        error={!!newInfo.password.errMsg}
        helperText={newInfo.password.errMsg}
        onChange={handleInputChange}
      />
      <Input
        id="password-confirm-input"
        name="passwordConfirm"
        label="Confirm Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        error={!!newInfo.passwordConfirm.errMsg}
        helperText={newInfo.passwordConfirm.errMsg}
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
          error={!!newInfo.firstname.errMsg}
          helperText={newInfo.firstname.errMsg}
          onChange={handleInputChange}
          value={newInfo.firstname.value}
        />
        <Input
          id="lastname-input"
          name="lastname"
          label="Last Name"
          type="lastname"
          autoComplete="current-lastname"
          variant="outlined"
          error={!!newInfo.lastname.errMsg}
          helperText={newInfo.lastname.errMsg}
          onChange={handleInputChange}
          value={newInfo.lastname.value}
        />
      </InputRow>
    </Container>
  )
}

export default InfoForm
