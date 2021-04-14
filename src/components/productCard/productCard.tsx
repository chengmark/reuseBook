import { CardContent } from '@material-ui/core'
import { useUserState } from '@src/context/UserContext'
import { toPath, LOCATIONS } from '@src/routes'
import { COLOR } from '@src/styling'
import { toRelativeTime } from '@src/utils'
import { useSnackbar } from 'notistack'
import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReviewPopup from '../reviewPopup'
import Tooltip from '../tooltip'
import RateReviewIcon from '@material-ui/icons/RateReview'
import {
  CardWrapper,
  MediaWrapper,
  ProductTitle,
  FlexRow,
  InfoText,
  CategoryIcon,
  TimeIcon,
  ConditionIcon,
  SellIcon,
  TradeIcon,
  ReviewIcon,
  HighlightText,
  ReviewBtn,
  ContentWrapper,
} from './style'

type Props = {
  book: any
}

const ProductCard = (props: Props): ReactElement => {
  const { book } = props
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { loggedIn, state } = useUserState()

  const handleAddReview = () => {
    if (!loggedIn()) return enqueueSnackbar('Please Login First.', { variant: 'warning' })
    setOpen(true)
  }

  const redirect = () => {
    history.push(toPath(LOCATIONS.product, book._id))
  }

  return (
    <CardWrapper>
      <MediaWrapper image={book.img} onClick={redirect} style={{ cursor: 'pointer' }} />
      <ContentWrapper>
        <ProductTitle onClick={redirect}>{book.name}</ProductTitle>
        <FlexRow>
          <InfoText>{`by ${book.author}`}</InfoText>
        </FlexRow>
        <FlexRow>
          <CategoryIcon />
          <InfoText>{book.category?.name}</InfoText>
          <InfoText>{'|'}</InfoText>
          <TimeIcon />
          <InfoText>{toRelativeTime(book.createdAt)}</InfoText>
          <InfoText>{'|'}</InfoText>
          <ConditionIcon />
          <InfoText>{book.condition}</InfoText>
        </FlexRow>
        {book.type == 'sell' ? (
          <FlexRow>
            <SellIcon />
            <HighlightText>{`${book.price}`}</HighlightText>
            <InfoText>{`(for sell)`}</InfoText>
          </FlexRow>
        ) : (
          <FlexRow>
            <TradeIcon />
            <HighlightText>{`${book.tradeOption}`}</HighlightText>
            <InfoText>{`(for trade)`}</InfoText>
          </FlexRow>
        )}
        {book.description && (
          <FlexRow>
            <InfoText>{book.description}</InfoText>
          </FlexRow>
        )}
        <Tooltip title={`Number of reviews`} style={{ fontSize: '14px' }}>
          <FlexRow>
            <ReviewIcon />
            <InfoText>{book.reviews?.length}</InfoText>
          </FlexRow>
        </Tooltip>
        <Tooltip title="Have read this book before? Write a review!" style={{ fontSize: '14px' }}>
          <ReviewBtn onClick={handleAddReview}>
            <RateReviewIcon />
          </ReviewBtn>
        </Tooltip>
      </ContentWrapper>
      <ReviewPopup
        bookId={book._id}
        userId={state._id as string}
        submitCallback={redirect}
        open={open}
        setOpen={setOpen}
      />
    </CardWrapper>
  )
}

export default ProductCard
