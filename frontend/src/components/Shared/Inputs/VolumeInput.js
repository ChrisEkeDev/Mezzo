import React from 'react'

function VolumeInput({value, setValue }) {
  return (
    <input className="volume_input--wrapper"
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(e)}
    />
  )
}

export default VolumeInput
