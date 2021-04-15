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
import LoadingSkeleton from '@src/views/resultView/loadingSkeleton'
import { Separator } from '@src/views/resultView/style'
import { uuidv4 } from '@src/utils'

type Props = {
  currentTab: number
  index?: number
}

const ListingTab = (props: Props): ReactElement => {
  const { currentTab, index = 0 } = props
  const history = useHistory()
  const { state } = useUserState()
  const [books, setBooks] = useState<Array<any>>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    BookService.getBookBySeller(state._id as string)
      .then((res) => {
        setLoading(false)
        setBooks(res)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  const redirectToSellView = () => {
    history.push(toPath(LOCATIONS.sell))
  }

  return (
    <TabPanel currentTab={currentTab} index={0}>
      {!loading &&
        books?.map((book, i) => (
          <>
            <ProductTile book={book} key={book._id} />
            <Separator isBook key={i} />
          </>
        ))}
      {loading && new Array(4).fill(0).map((i) => <LoadingSkeleton key={i} />)}
      {!loading && books?.length === 0 && (
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
