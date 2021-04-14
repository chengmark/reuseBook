import React, { ReactElement, useEffect, useState } from 'react'
import Tooltip from '@src/components/tooltip'
import {
  TileTitle,
  TabPanel,
  TileInfoBlock,
  CenteredTabPanel,
  TileWrapper,
  Image,
  ImageWrapper,
  InfoSection,
  BuyerName,
  FlexRow,
  InfoText,
  FinishBtn,
  IgnoreBtn,
} from '../style'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'
import BookService from '@src/services/BookService'
import { useUserState } from '@src/context/UserContext'
import { useSnackbar } from 'notistack'

type Props = {
  currentTab: number
  index?: number
}

const testListings: any[] = [
  // {
  //   coverPhoto: '',
  //   name: 'Test book name',
  //   auther: 'Test author',
  //   views: 24,
  //   favorites: 12,
  //   comments: 2,
  //   postDate: Date.now(),
  //   price: 240,
  //   type: 'For Listing',
  // },
  // {
  //   coverPhoto: '',
  //   name: 'Test book name 2',
  //   auther: 'Test author 2',
  //   views: 54,
  //   favorites: 1,
  //   comments: 0,
  //   postDate: Date.now(),
  //   price: 20,
  //   type: 'For Rent',
  // },
]

const OfferTab = (props: Props): ReactElement => {
  const { currentTab, index = 1 } = props
  const { state } = useUserState()
  const [offers, setOffers] = useState<Array<any>>()
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()

  useEffect(() => {
    getOffers()
  }, [])

  const getOffers = () => {
    BookService.getOfferBySeller(state._id as string)
      .then((res) => {
        setOffers(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleIgnoreOnClick = (offerId: string) => {
    BookService.deleteOffer(offerId)
      .then(() => {
        enqueueSnackbar('Offer Deleted', { variant: 'success' })
        getOffers()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const redirect = (bookId: string) => {
    history.push(toPath(LOCATIONS.product, bookId))
  }

  return (
    <TabPanel currentTab={currentTab} index={1}>
      {offers?.map((offer) => (
        <TileWrapper key={offer._id}>
          <ImageWrapper
            onClick={() => {
              redirect(offer.book._id)
            }}
          >
            <Image src={offer.book.img} />
          </ImageWrapper>
          <InfoSection>
            <BuyerName>{`User: ${offer.buyerId.firstname} ${offer.buyerId.lastname}`}</BuyerName>
            <InfoText>{`made an offer on you book: ${offer.book.name}`}</InfoText>
            <InfoText>{`contact: ${offer.contact}`}</InfoText>
            <FlexRow>
              <Tooltip title={`Clear this offer`} style={{ fontSize: '14px' }}>
                <FinishBtn
                  onClick={() => {
                    handleIgnoreOnClick(offer._id)
                  }}
                >
                  Finish
                </FinishBtn>
              </Tooltip>
              {/* <Tooltip title={`Delete this offer`} style={{ fontSize: '14px' }}>
                <IgnoreBtn
                  onClick={() => {
                    handleIgnoreOnClick(offer._id)
                  }}
                >
                  Ignore
                </IgnoreBtn>
              </Tooltip> */}
            </FlexRow>
          </InfoSection>
        </TileWrapper>
      ))}
      {offers?.length === 0 && (
        <CenteredTabPanel>
          <TileInfoBlock>
            <TileTitle>{'No offers yet.'}</TileTitle>
          </TileInfoBlock>
        </CenteredTabPanel>
      )}
    </TabPanel>
  )
}

export default OfferTab
