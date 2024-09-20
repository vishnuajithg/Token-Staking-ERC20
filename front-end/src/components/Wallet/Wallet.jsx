import { useState,useEffect, Children } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3Context from '../../Context/Web3Context';
import Button from "../Button/Button";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";

const Wallet = ({children}) => {
    const [state,setState] = useState({
        provider: null,
        account: null,
        stakingContract: null,
        stakeTokenContract: null,
        chainID: null
    });
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        window.ethereum.on('accountsChanged', () => handleAccountChange(setState));
        window.ethereum.on('chainChanged', () => handleChainChange(setState));

        return(
            ()=>{
                window.ethereum.removeListener('accountsChanged', () => handleAccountChange(setState));
                window.ethereum.removeListener('chainChanged', () => handleChainChange(setState));
            }
        )
    },[]) 
    const handleWallet = async() => {
        try { 
            setIsLoading(true);
            const{
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainID
            } = await connectWallet();
            console.log(
                "Provider :",provider,
                "Selected Account : ",selectedAccount,
                "Staking Contract Address : ",stakingContract,
                "Stake Token Contract Address : ",stakeTokenContract,
                "Chain ID : ",chainID)
            setState({
                provider,
                selectedAccount,
                stakingContract,
                stakeTokenContract,
                chainID
            })
        } catch (error) {
            console.error('Error connecting wallet',error.message);
        }
        finally{
            setIsLoading(false);
        }
    }
    return(
        <>
        <Web3Context.Provider value={state}>
            {children}
        </Web3Context.Provider>
        {isLoading && <p>Loading...</p>}
         <div className="flex justify-center items-center m-1">
            <Button onClick={handleWallet} label="Connect Wallet" />
         </div>
        </>
    )
}
export default Wallet;