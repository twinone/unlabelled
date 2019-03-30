import { createContext } from 'react'

const AuthContext = createContext({
  restaurantName: '',
  token: null,
  loggedIn: false
})

export default AuthContext
