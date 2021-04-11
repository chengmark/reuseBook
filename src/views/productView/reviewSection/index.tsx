import { Divider } from '@material-ui/core'
import ReviewPopup from '@src/components/reviewPopup'
import Tooltip from '@src/components/tooltip'
import { toDDMMYYYY, toRelativeTime, toStandardTime } from '@src/utils'
import { Btn } from '@src/views/sellView/style'
import React, { ReactElement, useState } from 'react'
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
  NoReviewText,
} from '../style'

type Props = {
  reviews: Array<any>
  children?: ReactElement
}

const ReviewSection = (props: Props): ReactElement => {
  const { reviews, ...rest } = props
  const [open, setOpen] = useState(false)

  return (
    <Container>
      <FlexFullRow>
        <Title>Reviews</Title>
        <MinorText>{`(total ${reviews?.length})`}</MinorText>
      </FlexFullRow>
      <Divider />
      <SubContainer>
        {reviews?.map((review, i) => (
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
        {reviews?.length == 0 && <NoReviewText>{`No Reviews Yet`}</NoReviewText>}
      </SubContainer>
      <Divider />
      <Btn onClick={() => setOpen(true)}>Add a review</Btn>
      <ReviewPopup open={open} setOpen={setOpen} />
    </Container>
  )
}

export default ReviewSection
