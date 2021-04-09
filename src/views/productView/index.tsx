import { Card, Divider } from '@material-ui/core'
import SearchBar from '@src/components/searchBar'
import Tooltip from '@src/components/tooltip'
import React, { ReactElement } from 'react'
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
} from './style'
import { toStandardTime } from '@src/utils'
import RecommendationSection from './recommendationSection'
import { useSnackbar } from 'notistack'

type Props = {
  product?: any
  children?: ReactElement
}

const testProduct = {
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
  const { product, ...rest } = props
  const { enqueueSnackbar } = useSnackbar()

  const handleShareOnClick = () => {
    navigator.clipboard.writeText(location.href)
    enqueueSnackbar('Copied URL to clipboard', { variant: 'info' })
  }

  return (
    <ProductWrapper>
      <SearchBar />
      <Container>
        <ProductInfo>
          <Image></Image>
          <InfoTextSection>
            <Title>{`${testProduct.name}`}</Title>
            <Tooltip title="Author" style={{ fontSize: '14px' }}>
              <Href>{`${testProduct.author}`}</Href>
            </Tooltip>
            <Divider />
            {testProduct.type == 'sell' ? (
              <Tooltip title="For sell" style={{ fontSize: '14px' }}>
                <FlexRow>
                  <SellIcon />
                  <Highlighted>{`${testProduct.price}`}</Highlighted>
                </FlexRow>
              </Tooltip>
            ) : (
              <Tooltip title="For sell" style={{ fontSize: '14px' }}>
                <FlexRow>
                  <TradeIcon />
                  <Highlighted>{testProduct.tradeOption}</Highlighted>
                </FlexRow>
              </Tooltip>
            )}
            <Tooltip title="Category" style={{ fontSize: '14px' }}>
              <FlexRow>
                <CategoryIcon />
                <Href>{`${testProduct.category}`}</Href>
              </FlexRow>
            </Tooltip>
            <Tooltip title="Condition" style={{ fontSize: '14px' }}>
              <FlexRow>
                <ConditionIcon />
                <ConditionText>{`${testProduct.condition}`}</ConditionText>
              </FlexRow>
            </Tooltip>
            <Tooltip title="Description" style={{ fontSize: '14px' }}>
              <FlexRow>
                <DescriptionIcon />
                <DescriptionText>{`${testProduct.description}`}</DescriptionText>
              </FlexRow>
            </Tooltip>
            <Tooltip title="Listing time" style={{ fontSize: '14px' }}>
              <FlexRow>
                <TimeIcon />
                <TimeText>{`${toStandardTime(testProduct.createdAt)}`}</TimeText>
              </FlexRow>
            </Tooltip>
            <ChatBtn startIcon={<ChatBubbleOutlineOutlinedIcon />}>Chat with seller</ChatBtn>
            <ShareBtn startIcon={<ShareOutlinedIcon />} onClick={handleShareOnClick}>
              Share
            </ShareBtn>
          </InfoTextSection>
        </ProductInfo>
      </Container>
      <ReviewSection reviews={testProduct.reviews}></ReviewSection>
      <RecommendationSection />
    </ProductWrapper>
  )
}

export default ProductView
