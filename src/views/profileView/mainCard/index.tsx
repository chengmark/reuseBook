import { Obj } from '@myTypes/Obj'
import { Avatar, Tab, Tabs } from '@material-ui/core'
import React, { ChangeEvent, ReactElement, useState } from 'react'
import { TileTitle, Card, TabPanel, Tile, TileInfoBlock, TileDetails, IconWrapper } from '../style'
import { COLOR } from '@src/styling'
import { useStyles } from '@src/views/profileView/style'
import { ArrowForwardIos, ChatBubbleOutline, FavoriteBorder, Visibility } from '@material-ui/icons'
import Tooltip from '@src/components/tooltip'

type Props = {
  children?: ReactElement
}

const testSales = [
  {
    coverPhoto: '',
    name: 'Test book name',
    auther: 'Test author',
    views: 24,
    favorites: 12,
    comments: 2,
    postDate: Date.now(),
    price: 240,
    type: 'For Sale',
  },
  {
    coverPhoto: '',
    name: 'Test book name 2',
    auther: 'Test author 2',
    views: 54,
    favorites: 1,
    comments: 0,
    postDate: Date.now(),
    price: 20,
    type: 'For Rent',
  },
]

const MainCard = (props: Props): ReactElement => {
  const { children, ...rest } = props
  const [currentTab, setCurrentTab] = useState(0)
  const classes = useStyles()

  const handleTabChange = (e: ChangeEvent<Obj>, newTab: number) => {
    setCurrentTab(newTab)
  }

  return (
    <Card>
      <Tabs value={currentTab} variant="fullWidth" onChange={handleTabChange} indicatorColor="primary" centered>
        <Tab label="Sale"></Tab>
        <Tab label="Order"></Tab>
        <Tab label="History"></Tab>
      </Tabs>
      <TabPanel currentTab={currentTab} index={0}>
        {testSales.map((sale) => (
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
      </TabPanel>
      <TabPanel currentTab={currentTab} index={1}>
        Order tab
      </TabPanel>
      <TabPanel currentTab={currentTab} index={2}>
        history tab
      </TabPanel>
    </Card>
  )
}

export default MainCard
