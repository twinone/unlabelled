import React, { useState } from 'react'
import {
  Input,
  Card,
  Chip,
  CardHeader,
  CardContent,
  Button
} from '@material-ui/core'

const foodTypes = ['Burger', 'Kebab', 'Pizza']
const url = '/restaurant/register'
const base_url = '22323gg232g3'

function DashboardScreen() {
  const name = 'Restaurant'
  const types = ['Burger', 'Kebab']

  onDelete = () => {}

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
          <div>{name}</div>
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

          <Button onClick={onDelete}>Delete restaurant</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardScreen
