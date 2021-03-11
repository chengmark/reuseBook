import { Avatar, Button } from '@material-ui/core'
import { Info, LockOpen } from '@material-ui/icons'
import React, { ReactElement } from 'react'
import { Card, CoverPhoto, AvatarWrapper, Block, Name, Username, Divider, useStyles } from '../style'

type Props = {
  user: any // should change to specific user type, define in common types later
}

const InfoCard = (props: Props): ReactElement => {
  const { user, ...rest } = props
  const classes = useStyles()

  return (
    <Card>
      <CoverPhoto></CoverPhoto>
      <AvatarWrapper>
        <Avatar className={classes.avatar}>{user.username.substr(0, 1)[0]}</Avatar>
      </AvatarWrapper>
      <Block>
        <Name>{user.firstName + ' ' + user.lastName}</Name>
        <Username>{'@' + user.username}</Username>
      </Block>
      <Block>
        <Divider></Divider>
        <Button className={classes.button} size="small" variant="contained" startIcon={<LockOpen />}>
          Change password
        </Button>
        <Button className={classes.button} size="small" variant="contained" startIcon={<Info />}>
          Update Info
        </Button>
      </Block>
    </Card>
  )
}

export default InfoCard
