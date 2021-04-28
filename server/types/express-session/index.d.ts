import session from 'express-session'

// extended typing of SessionData
declare module 'express-session' {
  export interface SessionData {
    userId: string
  }
}
