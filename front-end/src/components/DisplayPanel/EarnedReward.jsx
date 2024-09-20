import React, { useContext, useState, useEffect} from 'react'
import Web3Context from '../../Context/Web3Context'
import { ethers } from 'ethers'
const EarnedReward = () => {
  const {stakingContract, selectedAccount} = useContext(Web3Context)
  const [rewardVal, setRewardVal] = useState()
  useEffect(() => {
    const fetchStakeRewardInfo = async()=>{
      try {
        const rewardValueWei = await stakingContract.earned(selectedAccount)
        const rewardValueEth = ethers.formatUnits(rewardValueWei.toString(), 18) / 1e18
        // ethers.formatUnits(amountStakedWei.toString(), 18)
        const roundedReward = parseFloat(rewardValueEth).toFixed(2)
        console.log("reward",roundedReward) 
        setRewardVal(roundedReward)
      } catch (error) {
        console.error("Fetching cannot be fulfilled",error.message)
      }
    }
       const interval = setInterval(()=>{
        stakingContract && fetchStakeRewardInfo()
       },5000) 
       return ()=> clearInterval(interval)

    // stakingContract && fetchStakeRewardInfo()
  },[stakingContract,selectedAccount])

  return (
    <>
    <p  className="text-[#5FCC9C] text-2xl font-bold pt-4 flex justify-center items-center">Earned Reward : &nbsp; <span className=''>{ rewardVal}</span></p>
    </>
  )
  
}

export default EarnedReward
