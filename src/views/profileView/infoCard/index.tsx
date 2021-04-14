import { Info, ExitToApp } from '@material-ui/icons'
import { useUserState } from '@src/context/UserContext'
import { LOCATIONS, toPath } from '@src/routes'
import { VALIDATORS, checkIntegrity, formNoErr, toData, checkSameValue } from '@src/formIntegrity'
import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router'
import {
  Card,
  CoverPhoto,
  AvatarWrapper,
  Block,
  Name,
  Username,
  Divider,
  UserAvatar,
  Btn,
  LogoutBtn,
  InfoDialog,
} from '../style'
import { useSnackbar } from 'notistack'
import UserService from '@src/services/UserService'
import { DialogContent, DialogActions, DialogTitle, Button } from '@material-ui/core'
import InfoForm from '../infoForm'

type Props = {
  user: any // should change to specific user type, define in common types later
}

const InfoCard = (props: Props): ReactElement => {
  const { user } = props
  const userState = useUserState()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [newInfo, setNewInfo] = useState({
    password: { value: '', errMsg: '' },
    passwordConfirm: { value: '', errMsg: '' },
    firstname: { value: user.firstname, errMsg: '' },
    lastname: { value: user.lastname, errMsg: '' },
  })

  const handleLogoutClick = () => {
    history.push(toPath(LOCATIONS.home))
    enqueueSnackbar('Successful logout', { variant: 'success' })
    userState.logout()
    UserService.logout()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleDialogOpen = () => {
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }

  const handleUpdateInfo = () => {
    const password = checkIntegrity(newInfo.password, [VALIDATORS.REQUIRED, VALIDATORS.NUM_AND_LETTER])
    const firstname = checkIntegrity(newInfo.firstname, [VALIDATORS.REQUIRED])
    const lastname = checkIntegrity(newInfo.lastname, [VALIDATORS.REQUIRED])
    setNewInfo({ ...newInfo, password, firstname, lastname })
    if (formNoErr(newInfo)) {
      const [password, passwordConfirm] = checkSameValue(newInfo.password, newInfo.passwordConfirm)
      setNewInfo({ ...newInfo, password, passwordConfirm })
      if (formNoErr(newInfo)) {
        // call api to update userinfo
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
        <Btn size="small" variant="contained" startIcon={<Info />} onClick={handleDialogOpen}>
          Update Info
        </Btn>
        <LogoutBtn size="small" variant="contained" startIcon={<ExitToApp />} onClick={handleLogoutClick}>
          Log out
        </LogoutBtn>
      </Block>
      <InfoDialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{'Update Information'}</DialogTitle>
        <DialogContent dividers>
          <DialogContent>
            <InfoForm user={user} setNewInfo={setNewInfo} newInfo={newInfo} />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleUpdateInfo} color="primary">
            Update
          </Button>
        </DialogActions>
      </InfoDialog>
    </Card>
  )
}

export default InfoCard
