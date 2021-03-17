import { Avatar, Button } from '@material-ui/core'
import { Info, LockOpen } from '@material-ui/icons'
import React, { ReactElement } from 'react'
import { Card, CoverPhoto, AvatarWrapper, Block, Name, Username, Divider, UserAvatar, StyledBtn } from '../style'

type Props = {
  user: any // should change to specific user type, define in common types later
}

const InfoCard = (props: Props): ReactElement => {
  const { user, ...rest } = props

  return (
    <Card>
      <CoverPhoto></CoverPhoto>
      <AvatarWrapper>
        <UserAvatar>{user.username.substr(0, 1)[0]}</UserAvatar>
      </AvatarWrapper>
      <Block>
        <Name>{user.firstName + ' ' + user.lastName}</Name>
        <Username>{'@' + user.username}</Username>
      </Block>
      <Block>
        <Divider></Divider>
        <StyledBtn size="small" variant="contained" startIcon={<LockOpen />}>
          Change password
        </StyledBtn>
        <StyledBtn size="small" variant="contained" startIcon={<Info />}>
          Update Info
        </StyledBtn>
      </Block>
    </Card>
  )
}

export default InfoCard
