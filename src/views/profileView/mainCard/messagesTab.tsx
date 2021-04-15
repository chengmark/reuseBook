import React, { ReactElement, useEffect, useState } from 'react'
import Tooltip from '@src/components/tooltip'
import {
  TileTitle,
  TabPanel,
  TileInfoBlock,
  CenteredTabPanel,
  Image,
  TileWrapper,
  ImageWrapper,
  InfoSection,
  InfoText,
  BuyerName,
  FlexRow,
  LastMsgText,
} from '../style'
import { ChatBubbleOutline, FavoriteBorder, PostAdd, Visibility } from '@material-ui/icons'
import { useHistory } from 'react-router'
import { LOCATIONS, toPath } from '@src/routes'
import BookService from '@src/services/BookService'
import { useUserState } from '@src/context/UserContext'
import { toPreciseTime, uuidv4 } from '@src/utils'
import { Separator } from '@src/views/resultView/style'
import { Chip } from '@material-ui/core'

type Props = {
  currentTab: number
  index?: number
}

const MessagesTab = (props: Props): ReactElement => {
  const { currentTab, index = 2 } = props
  const history = useHistory()
  const [chatrooms, setChatrooms] = useState<Array<any>>([])
  const { state } = useUserState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getChatrooms()
  }, [])

  const getChatrooms = () => {
    BookService.getChatroomByUserId(state._id as string)
      .then((res) => {
        setLoading(false)
        setChatrooms(res)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const getLastMessageTime = (messages: Array<any>) => {
    if (messages.length > 0) return 'last message at: ' + toPreciseTime(messages[messages.length - 1].createdAt)
    else return ''
  }

  const isSeller = (chatroom: any) => chatroom.users[0]._id == state._id

  const redirect = (bookId: string) => {
    history.push(toPath(LOCATIONS.chat, bookId))
  }

  return (
    <TabPanel currentTab={currentTab} index={2}>
      {!loading &&
        chatrooms?.map((chatroom, i) => (
          <>
            <TileWrapper key={chatroom._id}>
              <ImageWrapper
                onClick={() => {
                  redirect(chatroom.book._id)
                }}
              >
                <Image src={chatroom.book.img} />
              </ImageWrapper>
              <InfoSection>
                <FlexRow>
                  <BuyerName
                    onClick={() => {
                      redirect(chatroom.book._id)
                    }}
                  >{`${
                    isSeller(chatroom)
                      ? `${chatroom.users[1].firstname} ${chatroom.users[1].lastname}`
                      : `${chatroom.users[0].firstname} ${chatroom.users[0].lastname}`
                  }`}</BuyerName>
                  {isSeller(chatroom) ? <Chip label={`Seller of the book`} /> : <Chip label={`Buyer of your book`} />}
                </FlexRow>

                <InfoText>{`Book Name: ${chatroom.book.name}`}</InfoText>
                {/* <InfoText>{`contact: ${offer.contact}`}</InfoText> */}
                <LastMsgText>{`${getLastMessageTime(chatroom.messages)}`}</LastMsgText>
              </InfoSection>
            </TileWrapper>
            <Separator isBook key={i} />
          </>
        ))}
      {chatrooms?.length === 0 && (
        <CenteredTabPanel>
          <TileInfoBlock>
            <TileTitle>{'No chatrooms yet.'}</TileTitle>
          </TileInfoBlock>
        </CenteredTabPanel>
      )}
    </TabPanel>
  )
}

export default MessagesTab
