import DynamicCard from '@src/components/dynamicCard'
import React, { ReactElement } from 'react'
import { MainColumn, ProfileLayout, SecondaryColumn } from './style'

type Props = {
  children?: ReactElement
}

const ProfileView = (props: Props): ReactElement => {
  const { children, ...rest } = props
  return (
    <ProfileLayout>
      <SecondaryColumn>{/* <DynamicCard></DynamicCard>
        <DynamicCard></DynamicCard> */}</SecondaryColumn>
      <MainColumn></MainColumn>
    </ProfileLayout>
  )
}

export default ProfileView
