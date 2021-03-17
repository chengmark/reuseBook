import { Avatar } from '@material-ui/core'
import React, { ReactElement } from 'react'
import InfoCard from './infoCard'
import InterestCard from './interestCard'
import MainCard from './mainCard'
import { AppViewName, AppViewRow, OutlinedBtn, MainColumn, ProfileLayout, SecondaryColumn } from './style'

type Props = {
  children?: ReactElement
}

const testUser = {
  username: 'TestUser',
  firstName: 'Test',
  lastName: 'User',
  interests: ['Math', 'Philosophy', 'Movie', 'Travel', 'Scocial Science'],
}

const ProfileView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <ProfileLayout>
      <AppViewRow>
        <Avatar></Avatar>
        <AppViewName>{testUser.firstName + ' ' + testUser.lastName}</AppViewName>
        <OutlinedBtn variant="outlined">UPDATE INFO</OutlinedBtn>
      </AppViewRow>
      <SecondaryColumn>
        <InfoCard user={testUser}></InfoCard>
        <InterestCard user={testUser}></InterestCard>
      </SecondaryColumn>
      <MainColumn>
        <MainCard></MainCard>
      </MainColumn>
    </ProfileLayout>
  )
}

export default ProfileView
