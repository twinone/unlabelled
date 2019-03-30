import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import AuthContext from '../globals/useToken'
import FoodTypes from '../components/FoodTypes'

const FOOD_TYPES = ['Burger', 'Kebab', 'Pizza']

function DashboardScreen() {
  const name = 'Restaurant'
  const types = ['Burger', 'Kebab']
  const [{ restaurantName, token }, setAuth] = useContext(AuthContext)
  const onDelete = () => {}

  return (
    <div
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '200px',
        alignSelf: 'center'
      }}
    >
      <h4> !!!! + {restaurantName}</h4>
      <FoodTypes
        foodTypes={FOOD_TYPES}
        currentTypes={['Kebab', 'Pizza']}
        setTypes={() => {}}
      />
      <Button
        onClick={() => {
          setAuth({
            token: null,
            restaurant: ''
          })
        }}
      >
        LOG OUT
      </Button>
    </div>
  )
}

export default DashboardScreen
