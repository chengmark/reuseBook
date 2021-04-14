import React, { ReactElement, useEffect, useState } from 'react'
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
  Btn,
  StyledForwardIcon,
} from '../style'
import { ChatBubbleOutline, FavoriteBorder, PostAdd, Visibility } from '@material-ui/icons'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'
import BookService from '@src/services/BookService'
import { useUserState } from '@src/context/UserContext'
import ProductTile from '@src/components/productTile'

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
  const { currentTab, index = 0 } = props
  const history = useHistory()
  const { state } = useUserState()
  const [books, setBooks] = useState<Array<any>>()

  useEffect(() => {
    BookService.getBookBySeller(state._id as string)
      .then((res) => {
        setBooks(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const redirectToSellView = () => {
    history.push(toPath(LOCATIONS.sell))
  }

  return (
    <TabPanel currentTab={currentTab} index={0}>
      {books?.map((book) => (
        <ProductTile book={book} key={book._id} />
        // <Tile key={book.name}>
        //   <BookAvatar src={book.coverPhoto}></BookAvatar>
        //   <TileInfoBlock>
        //     <TileTitle>{book.name}</TileTitle>
        //     <TileDetails>
        //       <div>$ {book.price}</div>
        //       <div>{'(' + book.type + ')'}</div>
        //       <div>{book.postDate}</div>
        //     </TileDetails>
        //     <TileDetails>
        //       <Tooltip title="views" placement="top">
        //         <IconWrapper>
        //           <Visibility></Visibility> {book.views}
        //         </IconWrapper>
        //       </Tooltip>
        //       <Tooltip title="favorites" placement="top">
        //         <IconWrapper>
        //           <FavoriteBorder></FavoriteBorder> {book.favorites}
        //         </IconWrapper>
        //       </Tooltip>
        //       <Tooltip title="comments" placement="top">
        //         <IconWrapper>
        //           <ChatBubbleOutline></ChatBubbleOutline> {book.comments}
        //         </IconWrapper>
        //       </Tooltip>
        //     </TileDetails>
        //   </TileInfoBlock>
        //   <StyledForwardIcon></StyledForwardIcon>
        // </Tile>
      ))}
      {books?.length === 0 && (
        <CenteredTabPanel>
          <TileInfoBlock>
            <TileTitle>{'Your listings will be displayed here.'}</TileTitle>
            <Btn startIcon={<PostAdd />} onClick={redirectToSellView}>
              Sell a book now
            </Btn>
          </TileInfoBlock>
        </CenteredTabPanel>
      )}
    </TabPanel>
  )
}

export default ListingTab
