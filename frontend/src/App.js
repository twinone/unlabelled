import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import { useCookies } from 'react-cookie'
import './App.css'
import RegisterScreen from './screens/RegisterScreen'
import authContext from './globals/useToken'
import AuthContext from './globals/useToken'
import DashboardScreen from './screens/DashboardScreen'

function App() {
  const [auth, setAuth] = useState({
    token: null,
    restaurantName: null,
    loggedIn: false
  })

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'restaurant'])
  const setAuthContext = ({ token, restaurant }) => {
    setAuth({
      token,
      restaurantName: restaurant
    })
    setCookie('token', token)
    setCookie('restaurant', restaurant)
  }

  useEffect(() => {
    setAuthContext(cookies)
  }, [])

  console.log('Cookies r', cookies)

  return (
    <AuthContext.Provider value={[auth, setAuthContext]}>
      {auth.token ? <DashboardScreen /> : <RegisterScreen />}
    </AuthContext.Provider>
  )
}

export default App
