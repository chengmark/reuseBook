import { Card, Divider } from '@material-ui/core'
import SearchBar from '@src/components/searchBar'
import Tooltip from '@src/components/tooltip'
import React, { ReactElement, useEffect, useState } from 'react'
import ReviewSection from './reviewSection'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined'
import {
  Container,
  ProductInfo,
  ProductWrapper,
  Image,
  InfoTextSection,
  Title,
  DescriptionText,
  Href,
  FlexRow,
  SellIcon,
  TradeIcon,
  Highlighted,
  ConditionIcon,
  ConditionText,
  DescriptionIcon,
  ChatBtn,
  CategoryIcon,
  ShareBtn,
  TimeIcon,
  TimeText,
  ImageWrapper,
} from './style'
import { getUrlLastSegmant, toStandardTime } from '@src/utils'
import RecommendationSection from './recommendationSection'
import { useSnackbar } from 'notistack'
import BookService from '@src/services/BookService'
import { Obj } from '@myTypes/Obj'
import { useUserState } from '@src/context/UserContext'

type Props = {
  children?: ReactElement
}

const book = {
  name: 'Discrete Mathematics and Its Application',
  type: 'sell', // or trade
  price: '120', // or ''
  tradeOption: '', // or 'I want to trade a Calculus book'
  author: 'Kenneth H. Rosen',
  category: 'Math',
  description: 'trade at MTR station.',
  createdAt: new Date('2021-04-07T07:45:27.791+00:00').getTime(),
  condition: 'New', // or 'used' just to make the product view richer
  reviews: [
    {
      _id: 'object Id of this review',
      by: {
        _id: 'object Id of this user',
        username: '',
        firstname: '',
        lastname: '',
        // etc. user info... populate in backend
      },
      content: 'a',
      createdAt: new Date('2021-04-07T07:45:27.791+00:00').getTime(),
    },
    {
      _id: 'object Id of this review',
      by: {
        _id: 'object Id of this user',
        username: '',
        firstname: '',
        lastname: '',
        // etc. user info... populate in backend
      },
      content: 'This book is good. Test string. Test string. Test string. Test string. ',
      createdAt: new Date('2021-04-07T07:45:27.791+00:00').getTime(),
    },
    {
      _id: 'object Id of this review',
      by: {
        _id: 'object Id of this user',
        username: '',
        firstname: '',
        lastname: '',
        // etc. user info... populate in backend
      },
      content: 'This book is good Test string. Test string. Test string. ',
      createdAt: new Date('2021-04-07T07:45:27.791+00:00').getTime(),
    },
    {
      _id: 'object Id of this review',
      by: {
        _id: 'object Id of this user',
        username: '',
        firstname: '',
        lastname: '',
        // etc. user info... populate in backend
      },
      content: 'This book is good.',
      createdAt: new Date('2021-04-07T07:45:27.791+00:00').getTime(),
    },
  ],
}

const ProductView = (props: Props): ReactElement => {
  const { ...rest } = props
  const [loading, setLoading] = useState(true)
  const [book, setBook] = useState<Obj>({})
  const { enqueueSnackbar } = useSnackbar()
  const { loggedIn } = useUserState()

  useEffect(() => {
    getBook()
  }, [])

  const getBook = (): void => {
    BookService.getBook(getUrlLastSegmant())
      .then((res) => {
        setLoading(false)
        console.log(res)
        setBook(res)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        // book not found
      })
  }

  const handleShareOnClick = () => {
    navigator.clipboard.writeText(location.href)
    enqueueSnackbar('Copied URL to clipboard', { variant: 'info' })
  }

  const handleImageOnClick = (url: string) => window.open(url, '_blank')

  const handleChatBtnOnClick = () => {
    if (!loggedIn()) return enqueueSnackbar('Please Login First.', { variant: 'warning' })
  }

  return (
    <ProductWrapper>
      <SearchBar />
      <Container>
        <ProductInfo>
          <ImageWrapper onClick={() => handleImageOnClick(book.img as string)}>
            <Image src={book.img as string} />
          </ImageWrapper>
          <InfoTextSection>
            <Title>{`${book.name}`}</Title>
            <Tooltip title="Author" style={{ fontSize: '14px' }}>
              <Href>{`${book.author}`}</Href>
            </Tooltip>
            <Divider />
            <ImageWrapper onClick={() => handleImageOnClick(book.img as string)} isMobile>
              <Image src={book.img as string} />
            </ImageWrapper>
            {book.type == 'sell' ? (
              <Tooltip title="For sell" style={{ fontSize: '14px' }}>
                <FlexRow>
                  <SellIcon />
                  <Highlighted>{`${book.price}`}</Highlighted>
                </FlexRow>
              </Tooltip>
            ) : (
              <Tooltip title="For trade" style={{ fontSize: '14px' }}>
                <FlexRow>
                  <TradeIcon />
                  <Highlighted>{`${book.tradeOption}`}</Highlighted>
                </FlexRow>
              </Tooltip>
            )}
            <Tooltip title="Category" style={{ fontSize: '14px' }}>
              <FlexRow>
                <CategoryIcon />
                <Href>{`${(book.category as any)?.name}`}</Href>
              </FlexRow>
            </Tooltip>
            <Tooltip title="Condition" style={{ fontSize: '14px' }}>
              <FlexRow>
                <ConditionIcon />
                <ConditionText>{`${book.condition}`}</ConditionText>
              </FlexRow>
            </Tooltip>
            {book.description && (
              <Tooltip title="Description" style={{ fontSize: '14px' }}>
                <FlexRow>
                  <DescriptionIcon />
                  <DescriptionText>{`${book.description}`}</DescriptionText>
                </FlexRow>
              </Tooltip>
            )}
            <Tooltip title="Listing time" style={{ fontSize: '14px' }}>
              <FlexRow>
                <TimeIcon />
                <TimeText>{`${toStandardTime(book.createdAt as string)}`}</TimeText>
              </FlexRow>
            </Tooltip>
            <ChatBtn onClick={handleChatBtnOnClick} startIcon={<ChatBubbleOutlineOutlinedIcon />}>
              Chat with seller
            </ChatBtn>
            <ShareBtn startIcon={<ShareOutlinedIcon />} onClick={handleShareOnClick}>
              Share
            </ShareBtn>
          </InfoTextSection>
        </ProductInfo>
      </Container>
      <ReviewSection bookId={book._id as string} reviews={book.reviews as any[]} getBook={getBook}></ReviewSection>
      <RecommendationSection />
    </ProductWrapper>
  )
}

export default ProductView
