import React, { useContext, useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia
} from '@material-ui/core'
import AuthContext from '../globals/useToken'
import ProgressIndicator from '../components/ProgressIndicator'
import posed from 'react-pose'

const ORDERS = [
  {
    name: 'Pizza order',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes',
    status: 'incoming',
    id: 2323
  },
  {
    name: 'Food order',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes',
    status: 'delivered',
    id: 2325
  },
  {
    name: 'Food order',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes',
    status: 'accepted',
    id: 2311
  },
  {
    name: 'Food order',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes',
    status: 'incoming',
    id: 888
  },
  {
    name: 'Food order',
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    deliverTime: '30 minutes',
    status: 'incoming',
    id: 287
  }
]

const IncomingOrder = ({ name, picture, deliverTime, onAccept, onDecline }) => (
  <Card style={{ flexDirection: 'column' }}>
    <CardMedia
      component="img"
      alt="Contemplative Reptile"
      height="140px"
      image={picture}
      title="Contemplative Reptile"
    />
    <CardContent
      style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}
    >
      <div style={{ fontSize: 23, paddingBottom: 8 }}>{name}</div>
      <div style={{ paddingBottom: 8 }}>Delivery {deliverTime}</div>
      <div
        style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}
      >
        <Button style={{ flex: 1 }} onClick={onAccept}>
          Accept
        </Button>
        <Button style={{ flex: 1 }} onClick={onDecline}>
          Decline
        </Button>
      </div>
    </CardContent>
  </Card>
)

const PosedDiv = posed.div({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
})

const DelieveredOrder = ({ name, picture, deliverTime, onDelivered }) => (
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
      <div style={{ paddingBottom: 8 }}>Accepted order {deliverTime}</div>

      <Button onClick={onDelivered}>Delivered ✔️</Button>
    </CardContent>
  </Card>
)

const AcceptedOrder = ({ name, picture, deliverTime, onShipped }) => (
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
      <div style={{ paddingBottom: 8 }}>Accepted order {deliverTime}</div>

      <Button onClick={onShipped}>Shipped</Button>
    </CardContent>
  </Card>
)

function PosedAcceptedOrder(props) {
  const [mounted, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
    return () => {
      setMount(false)
    }
  }, [])

  return (
    <PosedDiv pose={mounted ? 'visible' : 'hidden'}>
      <AcceptedOrder {...props} />
    </PosedDiv>
  )
}

const WEB_SOCKET_URL = 'ws://twinone.xyz:17001/ws'
const socket = new WebSocket(WEB_SOCKET_URL)

function DashboardScreen() {
  const [{ restaurantName }, setAuth] = useContext(AuthContext)
  const [orders, setOrders] = useState([])

  const addOrder = order => {
    setOrders([order, ...orders])
  }

  useEffect(() => {
    socket.addEventListener('message', msg => {
      const order = JSON.parse(msg.data)

      if (order.foodType !== undefined) {
        console.log(order)

        addOrder({
          picture:
            'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
          name: order.foodType + ' Order',
          price: order.price,
          latLng: [order.lat, order.lng],
          toppings: order.toppings,
          status: 'incoming'
        })
      }
    })
  }, [])

  const deleteOrder = id => () => {
    const newOrders = orders.filter(obj => obj.id !== id)
    setOrders(newOrders)
    socket.send(
      JSON.stringify({
        status: 'rejected'
      })
    )
  }

  const acceptOrder = order => () => {
    const newOrders = orders.filter(obj => obj.id !== order.id)
    setOrders([{ ...order, status: 'accepted' }, ...newOrders])
    socket.send(
      JSON.stringify({
        status: 'accepted'
      })
    )
  }

  const shipOrder = order => () => {
    const newOrders = orders.filter(obj => obj.id !== order.id)
    setOrders([{ ...order, status: 'delivered' }, ...newOrders])
    socket.send(
      JSON.stringify({
        status: 'shipped'
      })
    )
  }

  const deliveredOrder = order => () => {
    const newOrders = orders.filter(obj => obj.id !== order.id)
    setOrders(newOrdersx)
    socket.send(
      JSON.stringify({
        status: 'delivered'
      })
    )
  }

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
      <div>
        <h1
          style={{
            fontWeight: '200'
          }}
        >
          {restaurantName}
        </h1>
      </div>
      {orders.length === 0 ? (
        <ProgressIndicator />
      ) : (
        <div style={styles.gridContainer}>
          <h4>Orders</h4>
          <div style={styles.grid}>
            {orders.map(e => {
              if (e.status === 'accepted')
                return <PosedAcceptedOrder {...e} onShipped={shipOrder(e)} />
              if (e.status === 'delivered')
                return (
                  <DelieveredOrder {...e} onDelivered={deliveredOrder(e)} />
                )
              if (e.status === 'done') return null
              return (
                <IncomingOrder
                  {...e}
                  onAccept={acceptOrder(e)}
                  onDecline={deleteOrder(e.id)}
                />
              )
            })}
          </div>
        </div>
      )}
      <Button
        onClick={() => {
          setAuth({
            token: null,
            loggedIn: false,
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
    gridTemplateColumns: '200px 200px 200px',
    gridColumnGap: '18px',
    gridRowGap: '18px'
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default DashboardScreen
