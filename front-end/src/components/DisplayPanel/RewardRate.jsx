import React from 'react'
import { useState, useEffect, useContext } from 'react'
import Web3Context from '../../Context/Web3Context'
import { ethers } from 'ethers'

const RewardRate = () => {
    const {stakingContract, selectedAccount } = useContext(Web3Context)
    const [RewardRate, setRewardRate] = useState("0")
    useEffect(() => {
        const fetchRewardRate = async()=>{
          try {
            const rewardRateWei = await stakingContract.REWARD_RATE();
            const rewardRateEth = ethers.formatUnits(rewardRateWei.toString(), 18)
            setRewardRate(rewardRateEth)
          } catch (error) {
            console.error("Fetching cannot be fulfilled",error.message)
          }
        }
        stakingContract && fetchRewardRate()
      },[stakingContract,selectedAccount])
    
      return (
        <p className="text-[#5FCC9C] text-2xl font-bold pt-4 flex justify-center items-center">Reward Rate: {RewardRate} token/Second</p>
      
      )
      
    }


export default RewardRate
