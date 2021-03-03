// a card to display a product
import { Avatar, Card, CardContent, CardHeader, CardMedia } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { User } from '@myTypes/User'

type Props = {
  children?: ReactElement
  user: User
}

const DisplayCard = (props: Props): ReactElement => {
  const { children, user, ...rest } = props
  return (
    <>
      <Card>
        <CardHeader avatar={<Avatar></Avatar>} title=""></CardHeader>
        <CardMedia></CardMedia>
        <CardContent></CardContent>
      </Card>
      {children}
    </>
  )
}

export default DisplayCard
