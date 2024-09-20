import React from 'react'
import ConnectedAccount from './ConnectedAccount'
import ConnectedNetwork from './ConnectedNetwork'

const Navigation = () => {
  return (
    <nav className='flex justify-between p-6 bg-[#008170] text-white text-xl'>
      <ConnectedAccount/>
      <ConnectedNetwork/>
    </nav>
  )
}

export default Navigation
