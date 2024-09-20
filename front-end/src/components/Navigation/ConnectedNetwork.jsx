import React from 'react'
import { useContext } from 'react'
import Web3Context from '../../Context/Web3Context'

const ConnectedNetwork = () => {
    const { chainID } = useContext(Web3Context)
    // console.log(chainID)
    if(chainID===11155111)
    {
       return (
        <p>Connected Network : <span className='font-bold animate-pulse'>Sepolia</span>  </p>
    ) 
    }else{
        return(
            <p>Connected NetWork : <span className='font-bold'>Unsupported</span></p>
        )
      
    }
    
}

export default ConnectedNetwork
