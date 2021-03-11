import { Obj } from '@myTypes/Obj'
import { Chip } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Card, Block, InterestTitle, Divider, InterestContainer, useStyles } from '../style'

type Props = {
  user: any // should change to specific user type, define in common types later
}

const InterestCard = (props: Props): ReactElement => {
  const { user, ...rest } = props
  const classes = useStyles()

  return (
    <Card>
      <Block>
        <InterestTitle>Interests</InterestTitle>
        <Divider></Divider>
        <InterestContainer>
          {user.interests.map((
            interest: any, // should change any to string when user type is defined later
          ) => (
            <Chip key={interest} className={classes.chip} label={interest}></Chip>
          ))}
        </InterestContainer>
      </Block>
    </Card>
  )
}

export default InterestCard
