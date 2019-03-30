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

  const [cookies, setCookie] = useCookies(['token', 'restaurant'])
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
  console.log(auth.token)
  if (auth.token === null) console.log('ITS NULL')
  return (
    <AuthContext.Provider value={[auth, setAuthContext]}>
      {auth.token !== null ? <DashboardScreen /> : <RegisterScreen />}
    </AuthContext.Provider>
  )
}

export default App
