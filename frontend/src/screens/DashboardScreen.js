import React, { useContext, useEffect } from 'react'
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
//import ProgressIndicator from '../components/ProgressIndicator'

const FOOD_TYPES = ['Burger', 'Kebab', 'Pizza']
const orders = [
  {
    name: 'Pizza ORDER',
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

const IncomingOrder = ({ name, picture, deliverTime }) => (
  <Card style={{ flexDirection: 'column' }}>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      height="140px"
      image={picture}
      title="Contemplative Reptile"
    />
    <CardContent style={{ flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 23, paddingBottom: 8 }}>{name}</div>
      <div style={{ paddingBottom: 8 }}>Delivery {deliverTime}</div>
      <div style={{ flexDirection: 'row' }}>
        <Button style={{ flex: 1 }}>Accept</Button>
        <Button style={{ flex: 1 }}>Decline</Button>
      </div>
    </CardContent>
  </Card>
)

const AcceptedOrder = ({ name, picture, deliverTime }) => (
  <Card style={{ flexDirection: 'column' }}>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      height="140px"
      image={picture}
      title="Contemplative Reptile"
    />
    <CardContent
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '0px !important'
      }}
    >
      <div style={{ fontSize: 23, paddingBottom: 8 }}>{name}</div>
      <div style={{ paddingBottom: 8 }}>Delivery {deliverTime}</div>

      <Button>Ship it</Button>
    </CardContent>
  </Card>
)

function DashboardScreen() {
  const name = 'Restaurant'
  const types = ['Burger', 'Kebab']
  const [{ restaurantName }, setAuth] = useContext(AuthContext)
  const onDelete = () => {}

  useEffect(() => {
    const socket = new WebSocket('/ws')
    console.log(socket)
    socket.addEventListener('message', e => {
      console.log(e)
    })
  }, [])

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
      <div style={{ flexDirection: 'row' }}>
        <div style={styles.gridContainer}>
          <h4>Incoming orders</h4>
          <div
            style={{
              paddingRight: 89,
              ...styles.grid
            }}
          >
            {orders.map(IncomingOrder)}
          </div>
        </div>
        <div style={{ flexDirection: 'column' }}>
          <h4>Accepted Orders</h4>
          <div
            style={{
              ...styles.grid
            }}
          >
            {orders.map(AcceptedOrder)}
          </div>
        </div>
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

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '200px 200px',
    gridColumnGap: '10px',
    gridRowGap: '10px'
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

export default DashboardScreen
