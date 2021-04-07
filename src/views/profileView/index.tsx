import { Avatar, DialogTitle } from '@material-ui/core'
import { useUserState } from '@src/context/UserContext'
import React, { ReactElement, useState } from 'react'
import InfoCard from './infoCard'
import InfoForm from './infoForm'
import InterestCard from './interestCard'
import MainCard from './mainCard'
import { AppViewName, AppViewRow, OutlinedBtn, MainColumn, ProfileLayout, SecondaryColumn, Card, Btn } from './style'
import { VALIDATORS, checkIntegrity, formNoErr, toData, checkSameValue } from '@src/formIntegrity'

// const testUser = {
//   username: 'TestUser',
//   firstName: 'Test',
//   lastName: 'User',
//   interests: ['Math', 'Philosophy', 'Movie', 'Travel', 'Scocial Science'],
// }

const ProfileView = (): ReactElement => {
  const user = useUserState().state
  const [openForm, setOpenForm] = useState(false)
  const [newInfo, setNewInfo] = useState({
    password: { value: '', errMsg: '' },
    passwordConfirm: { value: '', errMsg: '' },
    firstname: { value: user.firstname as string, errMsg: '' },
    lastname: { value: user.lastname as string, errMsg: '' },
  })

  const handleFormToggle = () => {
    setOpenForm(!openForm)
  }

  const handleUpdate = () => {
    const password = checkIntegrity(newInfo.password, [VALIDATORS.REQUIRED, VALIDATORS.NUM_AND_LETTER])
    const firstname = checkIntegrity(newInfo.firstname, [VALIDATORS.REQUIRED])
    const lastname = checkIntegrity(newInfo.lastname, [VALIDATORS.REQUIRED])
    setNewInfo({ ...newInfo, password, firstname, lastname })
    if (formNoErr(newInfo)) {
      const [password, passwordConfirm] = checkSameValue(newInfo.password, newInfo.passwordConfirm)
      setNewInfo({ ...newInfo, password, passwordConfirm })
      if (formNoErr(newInfo)) {
      }
      // UserService.signup(toData(input))
      //   .then((res) => {
      //     userState.updateState(res)
      //     history.push(toPath(LOCATIONS.profile))
      //     enqueueSnackbar('Successful signup', { variant: 'success' })
      //   })
      //   .catch((err) => {
      //     if (err.response) enqueueSnackbar(err.response.data.message, { variant: 'error' })
      //   })
    }
  }

  return (
    <ProfileLayout>
      {/* AppViewRow will be displayed for mobile view */}
      <AppViewRow>
        <Avatar></Avatar>
        <AppViewName>{user.firstname + ' ' + user.lastname}</AppViewName>
        <OutlinedBtn variant="outlined" onClick={handleFormToggle}>
          {openForm ? `BACK` : `UPDATE INFO`}
        </OutlinedBtn>
      </AppViewRow>
      {/* secondary will be hidden for mobile view */}
      <SecondaryColumn>
        <InfoCard user={user}></InfoCard>
        <InterestCard></InterestCard>
      </SecondaryColumn>
      {/* infoForm is for mobile view*/}
      {openForm ? (
        <Card>
          <DialogTitle>{'Update Information'}</DialogTitle>
          <InfoForm user={user} newInfo={newInfo} setNewInfo={setNewInfo} />
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
