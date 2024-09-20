import { useContext, useState } from "react";
import Web3Context from "../../Context/Web3Context";
import Button from "../Button/Button";

const ClaimReward = () => {
    const { stakingContract } = useContext(Web3Context);
    const [transactionStatus, setTransactionStatus] = useState();

    const claimReward = async () => {
        try {
            const transaction = await stakingContract.getReward();
            const receipt = await transaction.wait();
            if(receipt.status===1){
                setTransactionStatus("Transaction is success")
                setTimeout(()=>{
                    setTransactionStatus("") 
                },5000)
            }else{
                setTransactionStatus("Transation Failed")
            }
        } catch (error) {
            console.error("Claiming Failed", error.message)
        }
    }

    return (
        <>
        {transactionStatus && <div>{transactionStatus}</div>}
        <div className="flex justify-center items-center m-2">
             <Button onClick={claimReward} type="button" label="Claim Reward" />
        </div>

        </>
    )
}

export default ClaimReward