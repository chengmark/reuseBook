import { Avatar, Button } from '@material-ui/core'
import { Info, LockOpen, ExitToApp } from '@material-ui/icons'
import { useUserState } from '@src/context/UserContext'
import React, { ReactElement } from 'react'
import { Card, CoverPhoto, AvatarWrapper, Block, Name, Username, Divider, UserAvatar, Btn, LogoutBtn } from '../style'

type Props = {
  user: any // should change to specific user type, define in common types later
}

const InfoCard = (props: Props): ReactElement => {
  const { user, ...rest } = props
  const userState = useUserState()
  const handleLogoutClick = () => {
    userState.logout()
  }

  return (
    <Card>
      <CoverPhoto></CoverPhoto>
      <AvatarWrapper>
        <UserAvatar>{user.username.substr(0, 1)[0]}</UserAvatar>
      </AvatarWrapper>
      <Block>
        <Name>{user.firstname + ' ' + user.lastname}</Name>
        <Username>{'@' + user.username}</Username>
      </Block>
      <Block>
        <Divider></Divider>
        <Btn size="small" variant="contained" startIcon={<LockOpen />}>
          Change password
        </Btn>
        <Btn size="small" variant="contained" startIcon={<Info />}>
          Update Info
        </Btn>
        <LogoutBtn size="small" variant="contained" startIcon={<ExitToApp />} onClick={handleLogoutClick}>
          Log out
        </LogoutBtn>
      </Block>
    </Card>
  )
}

export default InfoCard
