import { Info, LockOpen, ExitToApp } from '@material-ui/icons'
import { useUserState } from '@src/context/UserContext'
import { LOCATIONS, toPath } from '@src/routes'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { Card, CoverPhoto, AvatarWrapper, Block, Name, Username, Divider, UserAvatar, Btn, LogoutBtn } from '../style'
import { useSnackbar } from 'notistack'
import UserHelper from '@src/helpers/UserHelper'

type Props = {
  user: any // should change to specific user type, define in common types later
}

const InfoCard = (props: Props): ReactElement => {
  const { user } = props
  const userState = useUserState()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const handleLogoutClick = () => {
    history.push(toPath(LOCATIONS.home))
    enqueueSnackbar('Successful logout', { variant: 'success' })
    userState.logout()
    UserHelper.logout()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
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
