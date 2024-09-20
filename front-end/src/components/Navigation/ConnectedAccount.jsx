import React from 'react'
import { useContext } from 'react'
import Web3Context from '../../Context/Web3Context'

const ConnectedAccount = () => {
  const { selectedAccount } = useContext(Web3Context)
//   console.log(selectedAccount)
  return (
      <p>Connected Account : <span className='font-bold '>{ selectedAccount }</span> </p>
  )
}

export default ConnectedAccount
