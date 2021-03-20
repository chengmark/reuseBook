import React, { ReactElement } from 'react'
import Tooltip from '@src/components/tooltip'
import {
  TileTitle,
  TabPanel,
  Tile,
  TileInfoBlock,
  TileDetails,
  IconWrapper,
  CenteredTabPanel,
  BookAvatar,
  StyledBtn,
  StyledForwardIcon,
} from '../style'
import { ChatBubbleOutline, FavoriteBorder, PostAdd, Visibility } from '@material-ui/icons'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'

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

const ListingTab = (props: Props): ReactElement => {
  const { currentTab, index = 1, ...rest } = props
  const history = useHistory()

  const redirect = () => {
    history.push(toPath(LOCATIONS.sell))
  }

  return (
    <TabPanel currentTab={currentTab} index={0}>
      {testListings.length > 0 &&
        testListings.map((listing) => (
          <Tile key={listing.name}>
            <BookAvatar src={listing.coverPhoto}></BookAvatar>
            <TileInfoBlock>
              <TileTitle>{listing.name}</TileTitle>
              <TileDetails>
                <div>$ {listing.price}</div>
                <div>{'(' + listing.type + ')'}</div>
                <div>{listing.postDate}</div>
              </TileDetails>
              <TileDetails>
                <Tooltip title="views" placement="top">
                  <IconWrapper>
                    <Visibility></Visibility> {listing.views}
                  </IconWrapper>
                </Tooltip>
                <Tooltip title="favorites" placement="top">
                  <IconWrapper>
                    <FavoriteBorder></FavoriteBorder> {listing.favorites}
                  </IconWrapper>
                </Tooltip>
                <Tooltip title="comments" placement="top">
                  <IconWrapper>
                    <ChatBubbleOutline></ChatBubbleOutline> {listing.comments}
                  </IconWrapper>
                </Tooltip>
              </TileDetails>
            </TileInfoBlock>
            <StyledForwardIcon></StyledForwardIcon>
          </Tile>
        ))}
      {testListings.length === 0 && (
        <CenteredTabPanel>
          <TileInfoBlock>
            <TileTitle>{'Your posts will be displayed here.'}</TileTitle>
            <StyledBtn startIcon={<PostAdd />} onClick={redirect}>
              Sell a book now
            </StyledBtn>
          </TileInfoBlock>
        </CenteredTabPanel>
      )}
    </TabPanel>
  )
}

export default ListingTab
