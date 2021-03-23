import React, { useState, createContext, useContext, ReactElement } from 'react'
import { Obj } from '@myTypes/Obj'

type ContextType = {
  state: Obj
  updateState: (newState: Obj) => void
  loggedIn: () => boolean
  logout: () => void
}

type Props = {
  children: ReactElement
}

export const UserContext = createContext<ContextType>({
  state: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateState: () => {},
  loggedIn: () => false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
})

// an example of context hook
const UserProvider = ({ children }: Props): ReactElement => {
  const [state, setState] = useState({})

  const updateState = (newState: Obj): void => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  const loggedIn = (): boolean => {
    return Object.keys(state).length > 0
  }

  const logout = (): void => {
    setState({})
  }

  // const initState = async () => {
  //   updateState({})
  // }

  return (
    <UserContext.Provider
      value={{
        state,
        updateState,
        loggedIn,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Pull information from the data layer
export const useUserState = (): ContextType => useContext(UserContext)

export default UserProvider
