import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Web3Context from '../../Context/Web3Context'
import { ethers } from 'ethers'
import StakingContext from '../../Context/StakingContext'

const StakedAmount = () => {
  const {stakingContract, selectedAccount } = useContext(Web3Context)
  const {isReload} = useContext(StakingContext)
  const [StakedAmount, setStakedAmount] = useState(null)
  useEffect(() => {
    const fetchStakedBalance = async()=>{
      try {
        const amountStakedWei = await stakingContract.stakedBalance(selectedAccount)
        // console.log(amountStaked)
        const amountStakedEth = ethers.formatUnits(amountStakedWei.toString(), 18)
        console.log(amountStakedEth)
        setStakedAmount(amountStakedEth)
      } catch (error) {
        console.error("Fetching cannot be fulfilled",error.message)
      }
    }
    stakingContract && fetchStakedBalance()
    //didnt set
  },[stakingContract,selectedAccount,isReload])
  
  return (
    <p className="text-[#5FCC9C] text-2xl font-bold pt-4 flex justify-center items-center">Staked Amount: {StakedAmount}</p>
  )
  
}

export default StakedAmount
