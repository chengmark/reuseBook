import { Avatar, Button, Chip } from '@material-ui/core'
import { Info, LockOpen } from '@material-ui/icons'
import React, { ReactElement } from 'react'
import InfoCard from './infoCard'
import InterestCard from './interestCard'
import MainCard from './mainCard'
import {
  Card,
  AvatarWrapper,
  MainColumn,
  ProfileLayout,
  SecondaryColumn,
  CoverPhoto,
  useStyles,
  Name,
  Block,
  Username,
  Divider,
  InterestTitle,
  InterestContainer,
} from './style'

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
  const classes = useStyles()
  return (
    <ProfileLayout>
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
