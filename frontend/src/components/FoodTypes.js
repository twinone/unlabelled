import React from 'react'
import { Chip } from '@material-ui/core'

const FoodTypes = ({ currentTypes, setTypes, foodTypes }) => (
  <div style={{ flexDirection: 'row', padding: 8 }}>
    {foodTypes.map(e => (
      <Chip
        key={e}
        onClick={() => {
          if (currentTypes.includes(e)) {
            currentTypes.splice(currentTypes.indexOf(e), 1)
            setTypes([...currentTypes])
          } else {
            setTypes([...currentTypes, e])
          }
        }}
        label={e}
        variant={currentTypes.includes(e) ? 'default' : 'outlined'}
        padding={4}
      />
    ))}
  </div>
)

export default FoodTypes
