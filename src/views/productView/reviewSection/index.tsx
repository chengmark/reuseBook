import { Divider } from '@material-ui/core'
import ReviewPopup from '@src/components/reviewPopup'
import Tooltip from '@src/components/tooltip'
import { toDDMMYYYY, toRelativeTime, toStandardTime } from '@src/utils'
import { Btn } from '@src/views/sellView/style'
import React, { ReactElement, useState } from 'react'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { useSnackbar } from 'notistack'
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
import { useUserState } from '@src/context/UserContext'

type Props = {
  bookId: string
  reviews: Array<any>
  getBook: () => void
}

const ReviewSection = (props: Props): ReactElement => {
  const { bookId, reviews, getBook, ...rest } = props
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { loggedIn, state } = useUserState()

  const handleAddReview = () => {
    if (!loggedIn()) return enqueueSnackbar('Please Login First.', { variant: 'warning' })
    setOpen(true)
  }

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
      <Btn onClick={handleAddReview} startIcon={<AddBoxIcon />}>
        Add a review
      </Btn>
      <ReviewPopup
        bookId={bookId}
        userId={state._id as string}
        submitCallback={getBook}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  )
}

export default ReviewSection
