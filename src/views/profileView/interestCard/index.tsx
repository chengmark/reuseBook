import React, { ReactElement } from 'react'
import { Card, Block, InterestTitle, Divider, InterestContainer, StyledChip } from '../style'

type Props = {
  user: any // should change to specific user type, define in common types later
}

const InterestCard = (props: Props): ReactElement => {
  const { user } = props

  return (
    <Card>
      <Block>
        <InterestTitle>Interests</InterestTitle>
        <Divider></Divider>
        <InterestContainer>
          {user.interests?.map((
            interest: any, // should change any to string when user type is defined later
          ) => (
            <StyledChip key={interest} label={interest} />
          ))}
        </InterestContainer>
      </Block>
    </Card>
  )
}

export default InterestCard
