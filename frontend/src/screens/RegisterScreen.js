import React, { useState, useContext } from 'react'
import {
  Input,
  Card,
  Chip,
  CardHeader,
  CardContent,
  Button
} from '@material-ui/core'
import AuthContext from '../globals/useToken'
import FoodTypes from '../components/FoodTypes'

const FOOD_TYPES = ['Burger', 'Kebab', 'Pizza']
const url = '/restaurant/register'

const registerRestaurant = ({ name, latLng, types }) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      location: latLng,
      foodTypes: types
    })
  })

function RegisterScreen() {
  const [name, setName] = useState('')
  const [latLng, setLatLng] = useState({ lat: '', lng: '' })
  const [types, setTypes] = useState([])
  const { lat, lng } = latLng
  const [_, setAuth] = useContext(AuthContext)

  const onSubmit = () => {
    if (name === '' || lat === '' || lng === '')
      alert('Please enter all the fields.')
    else {
      registerRestaurant({ name, latLng, types }).then(r => {
        console.log(r)
        if (r.error) {
          alert(r.error)
          return null
        } else {
          setAuth({
            restaurant: name,
            token: r.token
          })
        }
      })
    }
  }

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <CardHeader title="UNLABELLED for restaurants" />
        <CardContent style={styles.content}>
          <Input
            placeholder="restaurant name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div style={{ flexDirection: 'row' }}>
            <Input
              placeholder="lattitude"
              value={lat}
              onChange={e => setLatLng({ lat: e.target.value, lng })}
            />
            <Input
              placeholder="longitude"
              value={lng}
              onChange={e => setLatLng({ lat, lng: e.target.value })}
            />
          </div>
          <FoodTypes
            currentTypes={types}
            foodTypes={FOOD_TYPES}
            setTypes={setTypes}
          />
          <Button onClick={onSubmit}>Register</Button>
        </CardContent>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: !'100%',
    paddingTop: '200px',
    alignSelf: 'center'
  },
  card: { flexDirection: 'column', width: '400px' },
  content: { flexDirection: 'column' }
}

export default RegisterScreen
