import { ethers } from 'ethers';
import React from 'react'
import { useState,useContext,useRef } from 'react'
import Button from '../Button/Button';
import Web3Context from '../../Context/Web3Context';
import StakingContext from '../../Context/StakingContext';

const TokenApproval = () => {
    const {stakeTokenContract, stakingContract} = useContext(Web3Context)
    const {isReload} = useContext(StakingContext)
    const  approvedTokenRef = useRef();
    const [transactionStatus, setTransactionStatus] = useState()
    const approveToken = async(e)=>{
        e.preventDefault();
        const amount = approvedTokenRef.current.value.trim()
        if(isNaN(amount) || amount<=0 ){
            console.error("Please enter a valid amount")
            return;
        }
        const amountToSend = ethers.parseUnits(amount,18).toString();
        console.log(amountToSend)
        try {
            const transaction = await stakeTokenContract.approve(stakingContract.target, amountToSend)
            console.log(transaction)
            setTransactionStatus("Transaction is in pending...")
            setIsReload(!isReload)
            const receipt = await transaction.wait()
            if(receipt.status===1){
                setTransactionStatus("Transaction is success")
                setTimeout(()=>{
                    setTransactionStatus("") 
                },5000)
                approvedTokenRef.current.value = ""
            }else{
                setTransactionStatus("Transation Failed")
            }
        } catch (error) {
            console.error("Token Approval Failed", error.message)
        }
    }
  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md  w-[70%] mx-auto mb-1 text-white mt-6">
    {transactionStatus && (
      <div className="mb-4 text-teal-400 font-semibold">
        {transactionStatus}
      </div>
    )}
    
    <form onSubmit={approveToken} className="space-y-4">
      <div>
        <label className="block text-lg font-bold  text-teal-300 mb-2">
          Token Approval:
        </label>
        <input
          type="text"
          ref={approvedTokenRef}
          className="w-full p-2 bg-gray-800 text-teal-200 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
  
      <Button onClick={approveToken} type="submit" label="Token Approve" />
    </form>
  </div>
  
  )
}

export default TokenApproval
