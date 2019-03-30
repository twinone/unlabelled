import React, { useContext } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  LinearProgress
} from '@material-ui/core'
import AuthContext from '../globals/useToken'
import FoodTypes from '../components/FoodTypes'
import ProgressIndicator from '../components/ProgressIndicator'

const FOOD_TYPES = ['Burger', 'Kebab', 'Pizza']
const orders = [
  {
    name: 'Food ORDER',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes'
  },
  {
    name: 'Food ORDER',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes'
  },
  {
    name: 'Food ORDER',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes'
  },
  {
    name: 'Food ORDER',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes'
  },
  {
    name: 'Food ORDER',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes'
  }
]

const Order = ({ name, picture, deliverTime }) => (
  <Card style={{ flexDirection: 'column' }}>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      //   className={classes.media}
      height="140px"
      image={picture}
      title="Contemplative Reptile"
    />
    <CardHeader title={name} />
    <CardContent>Delivery {deliverTime}</CardContent>
  </Card>
)

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
        alignSelf: 'center',
        flexDirection: 'column'
      }}
    >
      <h4> !!!! + {restaurantName}</h4>
      <FoodTypes
        foodTypes={FOOD_TYPES}
        currentTypes={['Kebab', 'Pizza']}
        setTypes={() => {}}
      />
      <ProgressIndicator />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 200px 200px',
          gridColumnGap: '10px',
          gridRowGap: '10px'
        }}
      >
        {orders.map(Order)}
      </div>
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
