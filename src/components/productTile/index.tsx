import { toRelativeTime } from '@src/utils'
import React, { ReactElement, useState } from 'react'
import Tooltip from '../tooltip'
import RateReviewIcon from '@material-ui/icons/RateReview'
import {
  Wrapper,
  FlexRow,
  ImageWrapper,
  InfoSection,
  Image,
  ProductTitle,
  InfoText,
  CategoryIcon,
  TimeIcon,
  SellIcon,
  TradeIcon,
  HighlightText,
  ConditionIcon,
  OperationSection,
  ReviewBtn,
  ReviewIcon,
} from './style'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'
import { useUserState } from '@src/context/UserContext'
import { useSnackbar } from 'notistack'
import ReviewPopup from '../reviewPopup'

type Props = {
  book: any
}

const ProductTile = (props: Props): ReactElement => {
  const { book, ...rest } = props
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
    <Wrapper>
      <ImageWrapper onClick={redirect}>
        <Image src={book.img} />
      </ImageWrapper>
      <InfoSection>
        <ProductTitle onClick={redirect}>{book.name}</ProductTitle>
        <FlexRow>
          <InfoText>{`by ${book.author}`}</InfoText>
        </FlexRow>
        <FlexRow>
          <CategoryIcon />
          <InfoText>{book.category.name}</InfoText>
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
            <InfoText>{book.reviews.length}</InfoText>
          </FlexRow>
        </Tooltip>
      </InfoSection>
      <OperationSection>
        <Tooltip title="Have read this book before? Write a review!" style={{ fontSize: '14px' }}>
          <ReviewBtn onClick={handleAddReview}>
            <RateReviewIcon />
          </ReviewBtn>
        </Tooltip>
      </OperationSection>
      <ReviewPopup
        bookId={book._id}
        userId={state._id as string}
        submitCallback={redirect}
        open={open}
        setOpen={setOpen}
      />
    </Wrapper>
  )
}
export default ProductTile
