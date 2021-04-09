import { Request, Response, Router } from 'express'
import { Routes } from '..'
import ChatController from './ChatController'

// routes for user related operations
export class ChatRoutes extends Routes {
  constructor(router: Router) {
    super(router, 'ChatRoutes')
  }

  configureRoutes(): void {
    this.router
    .route('/chats')
    .get((req: Request, res: Response) => {
        ChatController.listChatRooms(req, res)
    })
    .post((req: Request, res: Response) => {
        ChatController.createChatRoom(req, res)
    })

    this.router
        .route('/chats/:roomId')
        .delete((req: Request, res: Response) => {
            ChatController.deleteChatRoom(req, res)
        })
        .get((req: Request, res: Response) => {
            ChatController.getChatRoom(req, res)
        })

    this.router.route('/chats/:userId').get((req: Request, res: Response) => {
        ChatController.listUserChatRooms(req, res)
    })

    this.router
        .route('/chats/:roomId/:messageId')
        .delete((req: Request, res: Response) => {
            ChatController.deleteMessage(req, res)
        })
        
        this.router
        .route('/chats/:roomId/message')
        .post((req: Request, res: Response) => {
            ChatController.addMessage(req, res)
        })
        .get((req: Request, res: Response) => {
            ChatController.listMessages(req, res)
        })

    this.router
    .route('/chats/:roomId/user')
    .post((req: Request, res: Response) => {
        ChatController.addUser(req, res)
    })  
    .get((req: Request, res: Response) => {
        ChatController.listUsers(req, res)
    })
     
  }
}





