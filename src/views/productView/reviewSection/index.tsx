import { Divider } from '@material-ui/core'
import Tooltip from '@src/components/tooltip'
import { toDDMMYYYY, toRelativeTime, toStandardTime } from '@src/utils'
import React, { ReactElement } from 'react'
import {
  Container,
  FlexFullRow,
  MinorText,
  ReviewCard,
  ReviewContent,
  ReviewerAvatar,
  ReviewText,
  Title,
  SubContainer,
} from '../style'

type Props = {
  reviews: Array<any>
  children?: ReactElement
}

const ReviewSection = (props: Props): ReactElement => {
  const { reviews, ...rest } = props
  return (
    <Container>
      <FlexFullRow>
        <Title>Reviews</Title>
        <MinorText>{`(total ${reviews.length})`}</MinorText>
      </FlexFullRow>
      <Divider />
      <SubContainer>
        {reviews.map((review, i) => (
          <ReviewCard key={i}>
            <ReviewContent>
              <ReviewerAvatar></ReviewerAvatar>
              <ReviewText>{review.content}</ReviewText>
            </ReviewContent>
            <Tooltip title={toDDMMYYYY(review.createdAt)} style={{ fontSize: '12px' }}>
              <MinorText>{toRelativeTime(review.createdAt)}</MinorText>
            </Tooltip>
          </ReviewCard>
        ))}
      </SubContainer>
    </Container>
  )
}

export default ReviewSection
