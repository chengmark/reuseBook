import { useUserState } from '@src/context/UserContext'
import { CenteredLayout } from '@src/layout'
import BookService from '@src/services/BookService'
import ChatService from '@src/services/ChatService'
import { getUrlLastSegmant } from '@src/utils'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Wrapper, Container, MessageWrapper, InputWrapper, Input, Btn } from './style'
import SendIcon from '@material-ui/icons/Send'
import io from 'socket.io-client'

const ChatView = (): ReactElement => {
  const { loggedIn, state } = useUserState()
  const [messages, setMessages] = useState<Array<any>>([])
  const [input, setInput] = useState('')
  const [chatroom, setChatroom] = useState<any>()

  useEffect(() => {
    BookService.getBook(getUrlLastSegmant())
      .then((book) => {
        ChatService.getChatroom(state._id as string).then((chatrooms: Array<any>) => {
          console.log(chatrooms)
          if (!chatrooms) {
            createChatroom(book)
          } else {
            const chatroom = chatrooms.find((chatroom) => chatroom.name == getUrlLastSegmant())
            console.log(chatroom)
            if (!chatroom) createChatroom(book)
            else {
              setChatroom(chatroom)
              setMessages(chatroom.messages)
              const socket = io()
              socket.connect()
              console.log(socket.connected)
              socket.emit('join', { id: chatroom._id })
            }
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const createChatroom = (book: any) => {
    ChatService.createChatroom(state._id as string, (book.sellerId as any)._id as string, getUrlLastSegmant()).then(
      (res) => {
        console.log(res)
      },
    )
  }

  const handleSendMessage = () => {
    // if (socket && input) {
    //   socket.emit('message', {
    //     id: chatroom._id,
    //     content: input,
    //   })
    // }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <CenteredLayout>
      <Wrapper>
        <Container>
          <MessageWrapper></MessageWrapper>
          <InputWrapper>
            <Input variant="outlined" onChange={handleInputChange} />
            <Btn onClick={handleSendMessage}>
              <SendIcon />
            </Btn>
          </InputWrapper>
        </Container>
      </Wrapper>
    </CenteredLayout>
  )
}

export default ChatView
