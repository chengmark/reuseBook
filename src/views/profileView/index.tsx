import { Avatar, DialogTitle } from '@material-ui/core'
import { useUserState } from '@src/context/UserContext'
import React, { ReactElement, useState } from 'react'
import InfoCard from './infoCard'
import InfoForm from './infoForm'
import InterestCard from './interestCard'
import MainCard from './mainCard'
import { AppViewName, AppViewRow, OutlinedBtn, MainColumn, ProfileLayout, SecondaryColumn, Card, Btn } from './style'
import { VALIDATORS, checkIntegrity, formNoErr, toData, checkSameValue } from '@src/formIntegrity'
import UserService from '@src/services/UserService'
import { useSnackbar } from 'notistack'

// const testUser = {
//   username: 'TestUser',
//   firstName: 'Test',
//   lastName: 'User',
//   interests: ['Math', 'Philosophy', 'Movie', 'Travel', 'Scocial Science'],
// }

const ProfileView = (): ReactElement => {
  const userState = useUserState()
  const [openForm, setOpenForm] = useState(false)
  const { state } = useUserState()
  const [newInfo, setNewInfo] = useState({
    password: { value: '', errMsg: '' },
    passwordConfirm: { value: '', errMsg: '' },
    firstname: { value: state.firstname as string, errMsg: '' },
    lastname: { value: state.lastname as string, errMsg: '' },
  })
  const { enqueueSnackbar } = useSnackbar()
  const handleFormToggle = () => {
    setOpenForm(!openForm)
  }

  const handleUpdate = () => {
    if (newInfo.password.value) {
      const password = checkIntegrity(newInfo.password, [VALIDATORS.NUM_AND_LETTER])
      setNewInfo({ ...newInfo, password })
    }
    const firstname = checkIntegrity(newInfo.firstname, [VALIDATORS.REQUIRED])
    const lastname = checkIntegrity(newInfo.lastname, [VALIDATORS.REQUIRED])
    setNewInfo({ ...newInfo, firstname, lastname })
    if (formNoErr(newInfo)) {
      if (newInfo.password.value) {
        const [password, passwordConfirm] = checkSameValue(newInfo.password, newInfo.passwordConfirm)
        setNewInfo({ ...newInfo, password, passwordConfirm })
      }
      if (formNoErr(newInfo)) {
        UserService.updateInfo(state._id as string, toData(newInfo))
          .then((res) => {
            userState.updateState(res)
            enqueueSnackbar('Information updated', { variant: 'success' })
          })
          .catch((err) => {
            if (err.response) enqueueSnackbar(err.response.data.message, { variant: 'error' })
          })
      }
    }
  }

  return (
    <ProfileLayout>
      {/* AppViewRow will be displayed for mobile view */}
      <AppViewRow>
        <Avatar></Avatar>
        <AppViewName>{state.firstname + ' ' + state.lastname}</AppViewName>
        <OutlinedBtn variant="outlined" onClick={handleFormToggle}>
          {openForm ? `BACK` : `UPDATE INFO`}
        </OutlinedBtn>
      </AppViewRow>
      {/* secondary will be hidden for mobile view */}
      <SecondaryColumn>
        <InfoCard user={state}></InfoCard>
        <InterestCard></InterestCard>
      </SecondaryColumn>
      {/* infoForm is for mobile view*/}
      {openForm ? (
        <Card>
          <DialogTitle>{'Update Information'}</DialogTitle>
          <InfoForm user={state} newInfo={newInfo} setNewInfo={setNewInfo} />
          <Btn size="small" variant="contained" onClick={handleUpdate}>{`Update Info`}</Btn>
        </Card>
      ) : (
        <MainColumn>
          <MainCard></MainCard>
        </MainColumn>
      )}
    </ProfileLayout>
  )
}

export default ProfileView
