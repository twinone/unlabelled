import React, { useState } from 'react'
import {
  Input,
  Card,
  Chip,
  CardHeader,
  CardContent,
  Button
} from '@material-ui/core'
import { BASE_URL } from '../constants'

const foodTypes = ['Burger', 'Kebab', 'Pizza']
const url = '/restaurant/register'

const registerRestaurant = ({ name, latLng, types }) =>
  fetch(BASE_URL + url, {
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

  const onSubmit = () => {
    if ((name === '') | (lat === '') | (lng === ''))
      alert('Please enter all the fields.')
    else {
      registerRestaurant({ name, latLng, types }).then(r => {
        console.log(r)
        if (r.error) {
          alert(r.error)
          return null
        } else {
          console.log('SUCCESS!!!!!')
          return r.token
        }
      })
    }
  }

  return (
    <div
      style={{
        flex: 1,
        //  position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: !'100%',
        paddingTop: '200px',
        alignSelf: 'center'
      }}
    >
      <Card style={{ flexDirection: 'column', width: '400px' }}>
        <CardHeader title="UNLABELLED for restaurants" />
        <CardContent style={{ flexDirection: 'column' }}>
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
          <div style={{ flexDirection: 'row', padding: 8 }}>
            {foodTypes.map(e => (
              <Chip
                key={e}
                onClick={() => {
                  if (types.includes(e)) {
                    types.splice(types.indexOf(e), 1)
                    setTypes([...types])
                  } else {
                    setTypes([...types, e])
                  }
                }}
                label={e}
                variant={types.includes(e) ? 'default' : 'outlined'}
                padding={4}
              />
            ))}
          </div>

          <Button onClick={onSubmit}>Register</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterScreen
