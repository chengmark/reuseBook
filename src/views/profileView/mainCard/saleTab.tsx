import React, { ReactElement } from 'react'
import { Avatar, Button } from '@material-ui/core'
import Tooltip from '@src/components/tooltip'
import {
  TileTitle,
  TabPanel,
  Tile,
  TileInfoBlock,
  TileDetails,
  IconWrapper,
  useStyles,
  CenteredTabPanel,
} from '../style'
import { ArrowForwardIos, ChatBubbleOutline, FavoriteBorder, PostAdd, Visibility } from '@material-ui/icons'

type Props = {
  currentTab: number
  index?: number
}

const testSales: any[] = [
  //   {
  //     coverPhoto: '',
  //     name: 'Test book name',
  //     auther: 'Test author',
  //     views: 24,
  //     favorites: 12,
  //     comments: 2,
  //     postDate: Date.now(),
  //     price: 240,
  //     type: 'For Sale',
  //   },
  //   {
  //     coverPhoto: '',
  //     name: 'Test book name 2',
  //     auther: 'Test author 2',
  //     views: 54,
  //     favorites: 1,
  //     comments: 0,
  //     postDate: Date.now(),
  //     price: 20,
  //     type: 'For Rent',
  //   },
]

const SaleTab = (props: Props): ReactElement => {
  const { currentTab, index = 1, ...rest } = props
  const classes = useStyles()

  return (
    <TabPanel currentTab={currentTab} index={0}>
      {testSales.length > 0 &&
        testSales.map((sale) => (
          <Tile key={sale.name}>
            <Avatar className={classes.bookAvatar} src={sale.coverPhoto}></Avatar>
            <TileInfoBlock>
              <TileTitle>{sale.name}</TileTitle>
              <TileDetails>
                <div>$ {sale.price}</div>
                <div>{'(' + sale.type + ')'}</div>
                <div>{sale.postDate}</div>
              </TileDetails>
              <TileDetails>
                <Tooltip title="views" placement="top">
                  <IconWrapper>
                    <Visibility></Visibility> {sale.views}
                  </IconWrapper>
                </Tooltip>
                <Tooltip title="favorites" placement="top">
                  <IconWrapper>
                    <FavoriteBorder></FavoriteBorder> {sale.favorites}
                  </IconWrapper>
                </Tooltip>
                <Tooltip title="comments" placement="top">
                  <IconWrapper>
                    <ChatBubbleOutline></ChatBubbleOutline> {sale.comments}
                  </IconWrapper>
                </Tooltip>
              </TileDetails>
            </TileInfoBlock>
            <ArrowForwardIos className={classes.forwardIcon}></ArrowForwardIos>
          </Tile>
        ))}
      {testSales.length === 0 && (
        <CenteredTabPanel>
          <TileInfoBlock>
            <TileTitle>{'Your posts will be displayed here.'}</TileTitle>
            <Button startIcon={<PostAdd />} className={classes.button}>
              Sell a book now
            </Button>
          </TileInfoBlock>
        </CenteredTabPanel>
      )}
    </TabPanel>
  )
}

export default SaleTab
