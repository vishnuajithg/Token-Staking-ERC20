import { ethers } from 'ethers';
import React from 'react'
import { useState,useContext,useRef } from 'react'
import Button from '../Button/Button';
import Web3Context from '../../Context/Web3Context';
import StakingContext from '../../Context/StakingContext';

const stakeAmount = () => {
    const [transactionStatus, setTransactionStatus] = useState()
    const {stakingContract} = useContext(Web3Context)
    const {isReload,SetIsReload} = useContext(StakingContext)
    const  stakeAmountRef = useRef();
    const stakeToken = async(e)=>{
        e.preventDefault();
        const amount = stakeAmountRef.current.value.trim()
        if(isNaN(amount) || amount<=0 ){
            console.error("Please enter a valid amount")
            return;
        }
        const amountToStake = ethers.parseUnits(amount,18).toString();
        // console.log(amount)
        try {
            const transaction = await stakingContract.stake(amountToStake)
            console.log(transaction)
            setTransactionStatus("Transaction is in pending...")
            const receipt = await transaction.wait()
            if(receipt.status===1){

                setTransactionStatus("Transaction is success")
                SetIsReload(!isReload)
                setTimeout(()=>{
                    setTransactionStatus("") 
                },5000)
                stakeAmountRef.current.value = ""
            }else{
                setTransactionStatus("Transation Failed")
            }
        } catch (error) {
            console.error("Staking Failed", error.message)
        }
    }
  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md w-[70%] mx-auto text-white">
  {transactionStatus && (
    <div className="mb-4 text-teal-400 font-semibold">
      {transactionStatus}
    </div>
  )}
  
  <form onSubmit={stakeToken} className="space-y-4">
    <div>
      <label className="block text-lg font-bold text-teal-300 mb-2">
        Amount to Stake:
      </label>
      <input
        type="text"
        ref={stakeAmountRef}
        className="w-full p-2 bg-gray-800 text-teal-200 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        placeholder="Enter amount"
      />
    </div>

    <Button onClick={stakeToken} type="submit" label="Stake" />
  </form>
</div>

  )
}

export default stakeAmount