import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import './App.css'
import RegisterScreen from './screens/RegisterScreen'
import AuthContext from './globals/useToken'
import DashboardScreen from './screens/DashboardScreen'

function App() {
  const [auth, setAuth] = useState({
    token: undefined,
    restaurantName: null,
    loggedIn: false
  })

  const [cookies, setCookie] = useCookies(['token', 'restaurant', 'loggedIn'])
  const setAuthContext = ({ token, restaurant, loggedIn }) => {
    setAuth({
      token,
      restaurantName: restaurant,
      loggedIn
    })
    setCookie('token', token)
    setCookie('restaurant', restaurant)
    setCookie('loggedIn', loggedIn)
  }

  useEffect(() => {
    setAuthContext(cookies)
  }, [])

  return (
    <AuthContext.Provider value={[auth, setAuthContext]}>
      {auth.loggedIn ? <DashboardScreen /> : <RegisterScreen />}
    </AuthContext.Provider>
  )
}

export default App
