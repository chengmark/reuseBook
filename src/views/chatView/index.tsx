import { useUserState } from '@src/context/UserContext'
import { CenteredLayout } from '@src/layout'
import BookService from '@src/services/BookService'
import ChatService from '@src/services/ChatService'
import { getUrlLastSegmant, toPreciseTime } from '@src/utils'
import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { Wrapper, Container, MessageWrapper, InputWrapper, Input, Btn, MessageBubble, MessageRow } from './style'
import SendIcon from '@material-ui/icons/Send'
import { io, Socket } from 'socket.io-client'
import Tooltip from '@src/components/tooltip'
import ProductTile from '@src/components/productTile'
import { useSnackbar } from 'notistack'
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { InfoDialog } from '../profileView/style'
import { checkIntegrity, formNoErr, VALIDATORS } from '@src/formIntegrity'

const ChatView = (): ReactElement => {
  const { loggedIn, state } = useUserState()
  const [messages, setMessages] = useState<Array<any>>([])
  const [input, setInput] = useState('')
  const [chatroom, setChatroom] = useState<any>()
  const [socket, setSocket] = useState<Socket>()
  const [book, setBook] = useState<any>()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [contactInput, setContactInput] = useState({
    contact: { value: '', errMsg: '' },
  })

  useEffect(() => {
    // const socket = io()
    // socket.emit('join', { roomId: 'roomId', userId: 'userId' })
    // socket.emit('leave', { roomId: 'roomId', userId: 'userId' })
    // // socket.disconnect()
    console.log('mount, set and create chat room')
    Promise.all([getBookById(getUrlLastSegmant()), getChatRoomByUser(state._id as string)]).then(
      ([book, chatrooms]) => {
        setBook(book)
        const _chatroom = chatrooms.find((chatroom) => chatroom.name == getUrlLastSegmant())
        if (!_chatroom) {
          createChatroom(book)
        } else {
          setChatroom(_chatroom)
          setMessages(_chatroom.messages)
          setSocket(io())
        }
      },
    )
    return () => {
      console.log('unmount')
      socket?.emit('leave', { roomId: chatroom._id, userId: state._id })
      socket?.close()
      if (socket) setSocket(undefined)
    }
  }, [])

  useEffect(() => {
    if (socket) {
      if (!socket.connected) {
        console.log('connect chatroom')
        socket.connect()
        socket.emit('join', { roomId: chatroom._id, userId: state._id })
      }
    }
  }, [socket, chatroom])

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message: any) => {
        setMessages([...messages, message])
        setChatroom({ ...chatroom, messages: [...chatroom.messages, message] })
      })
    }
    return () => {
      socket?.off('newMessage')
    }
  }, [socket, messages])

  const getBookById = async (bookId: string) => await BookService.getBook(bookId).then((book: any) => book)

  const getChatRoomByUser = async (userId: string) =>
    await ChatService.getChatroom(userId).then((chatrooms: Array<any>) => chatrooms)

  const createChatroom = async (book: any) => {
    ChatService.createChatroom(
      state._id as string,
      (book.sellerId as any)._id as string,
      getUrlLastSegmant(),
      getUrlLastSegmant(),
    ).then((res) => {
      setChatroom(res)
      console.log(res)
      setMessages(res.messages)
      setSocket(io())
    })
  }

  // const getChatroomMessages = async (chatroom: any) => {}

  const handleSendMessage = () => {
    if (socket && input) {
      console.log(input)
      socket.emit('message', {
        roomId: chatroom._id,
        userId: state._id,
        content: input,
      })
      setInput('')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleContactInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextState = contactInput
    nextState[e.target.name as keyof typeof contactInput] = { value: e.target.value, errMsg: '' }
    setContactInput({ ...nextState })
  }

  const handleMakeOfferClick = () => {
    if (!loggedIn()) return enqueueSnackbar('Please Login First.', { variant: 'warning' })
    else setOpen(true)
  }

  const handleSubmitContact = () => {
    const contact = checkIntegrity(contactInput.contact, [VALIDATORS.REQUIRED])
    setContactInput({ ...contactInput, contact })
    if (formNoErr(contactInput)) {
      BookService.addOffer(
        book._id as string,
        contactInput.contact.value,
        (state as any)._id as string,
        (book.sellerId as any)?._id,
      )
        .then((res) => {
          enqueueSnackbar('Offer made, seller will contact you if they accept it.', { variant: 'success' })
          setOpen(false)
        })
        .catch((err) => {
          console.log(err)
          enqueueSnackbar('Plaese try again later.', { variant: 'error' })
          setOpen(false)
        })
    }
  }

  return (
    <CenteredLayout>
      <Wrapper>
        <Container>
          {book && book.sellerId._id != state._id && (
            <ProductTile book={book} simplified handleOffer={handleMakeOfferClick} />
          )}
          {book && book.sellerId._id == state._id && <ProductTile book={book} simplified />}
          <MessageWrapper>
            {messages?.map((message) => (
              <MessageRow isSender={message.sender == state._id} key={message._id}>
                <Tooltip title={toPreciseTime(message?.createdAt)} style={{ fontSize: '14px' }}>
                  <MessageBubble isSender={message.sender == state._id}>{message.content}</MessageBubble>
                </Tooltip>
              </MessageRow>
            ))}
          </MessageWrapper>
          <InputWrapper>
            <Input variant="outlined" onChange={handleInputChange} value={input} />
            <Btn onClick={handleSendMessage}>
              <SendIcon />
            </Btn>
          </InputWrapper>
        </Container>
      </Wrapper>
      <InfoDialog
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <DialogTitle>{'Make an offer'}</DialogTitle>
        <DialogContent dividers>
          <DialogContent>
            <TextField
              id="contact-input"
              name="contact"
              label="Contact"
              type="contact"
              autoComplete="current-contact"
              variant="outlined"
              error={!!contactInput.contact.errMsg}
              helperText={contactInput.contact.errMsg}
              onChange={handleContactInputChange}
            />
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmitContact} color="primary">
            Submit
          </Button>
        </DialogActions>
      </InfoDialog>
    </CenteredLayout>
  )
}

export default ChatView
