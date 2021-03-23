import { Avatar } from '@material-ui/core'
import { useUserState } from '@src/context/UserContext'
import React, { ReactElement } from 'react'
import InfoCard from './infoCard'
import InterestCard from './interestCard'
import MainCard from './mainCard'
import { AppViewName, AppViewRow, OutlinedBtn, MainColumn, ProfileLayout, SecondaryColumn } from './style'

// const testUser = {
//   username: 'TestUser',
//   firstName: 'Test',
//   lastName: 'User',
//   interests: ['Math', 'Philosophy', 'Movie', 'Travel', 'Scocial Science'],
// }

const ProfileView = (): ReactElement => {
  const user = useUserState().state

  return (
    <ProfileLayout>
      <AppViewRow>
        <Avatar></Avatar>
        <AppViewName>{user.firstname + ' ' + user.lastname}</AppViewName>
        <OutlinedBtn variant="outlined">UPDATE INFO</OutlinedBtn>
      </AppViewRow>
      <SecondaryColumn>
        <InfoCard user={user}></InfoCard>
        <InterestCard user={user}></InterestCard>
      </SecondaryColumn>
      <MainColumn>
        <MainCard></MainCard>
      </MainColumn>
    </ProfileLayout>
  )
}

export default ProfileView
