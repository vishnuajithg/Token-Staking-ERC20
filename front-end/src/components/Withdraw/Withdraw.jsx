import { ethers } from 'ethers';
import React from 'react'
import { useState,useContext,useRef } from 'react'
import Button from '../Button/Button';
import Web3Context from '../../Context/Web3Context';
// import StakingContext from '../../Context/StakingContext';

const WithdrawStakeAmount = () => {
    const [transactionStatus, setTransactionStatus] = useState("")
    const {stakingContract} = useContext(Web3Context)
    // const {isReload,setIsReload} = useContext(StakingContext)
    const  WithdrawStakeAmountRef = useRef();
    const WithdrawStakeToken = async(e)=>{
        e.preventDefault();
        const amount = WithdrawStakeAmountRef.current.value.trim()
        if(isNaN(amount) || amount<=0 ){
            console.error("Please enter a valid amount")
            return;
        }
        const amountToWithdraw = ethers.parseUnits(amount,18).toString();
        // console.log(amount)
        try {
            const transaction = await stakingContract.withdraw(amountToWithdraw)
            console.log(transaction)
            setTransactionStatus("Transaction is in pending...")
            // setIsReload(!isReload)
            const receipt = await transaction.wait()
            if(receipt.status===1){
                setTransactionStatus("Transaction is success")
                setTimeout(()=>{
                    setTransactionStatus("") 
                },5000)
                WithdrawStakeAmountRef.current.value = ""
            }else{
                setTransactionStatus("Transation Failed")
            }
        } catch (error) {
            console.error("Staking Failed", error.message)
        }
    }
  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md text-white w-[70%] mx-auto mb-4 mt-1">
    {transactionStatus && (
      <div className="mb-4 text-teal-400 font-semibold">
        {transactionStatus}
      </div>
    )}
    
    <form onSubmit={WithdrawStakeToken} className="space-y-4">
      <div>
        <label className="block text-lg font-bold text-teal-300 mb-2">
          Amount to Withdraw:
        </label>
        <input
          type="text"
          ref={WithdrawStakeAmountRef}
          className="w-full p-2 bg-gray-800 text-teal-200 border border-teal-500 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter amount"
        />
      </div>
  
      <Button onClick={WithdrawStakeToken} type="submit" label="Withdraw Stake Token" />
    </form>
  </div>
  
  )
}

export default WithdrawStakeAmount 