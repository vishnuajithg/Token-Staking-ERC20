import {ethers, Contract}  from 'ethers';
import stakingAbi from '../ABI/stakingAbi.json'
import stakeTokenAbi from '../ABI/stakeTokenAbi.json'


export const connectWallet = async()=>{
    try {
        let [signer, provider, stakingContract, stakeTokenContract,chainID] = [null]

        if(window.ethereum === null){
            throw new Error("Metamask is not installed!");
        }
            const accounts = await window.ethereum.request({
                method:'eth_requestAccounts'
            })
            let chainIDHex = await window.ethereum.request({
                method:"eth_chainId"
            })
            chainID = parseInt(chainIDHex, 16)
            let selectedAccount = accounts[0];
            if(!selectedAccount){
                throw new Error("No Ethereum accounts available")
            }

            provider = new ethers.BrowserProvider(window.ethereum);
            signer = await provider.getSigner();

            const stakingContractAddress = "0xad55e1fe58ee111b0ece5fa5423cd6aa3f227c19"
            const stakeTokenContractAddress = "0x7dcd684a3537958271ca85da8f1c51df72bc3e50"

            stakingContract = new Contract(stakingContractAddress, stakingAbi, signer)
            stakeTokenContract = new Contract(stakeTokenContractAddress, stakeTokenAbi,signer)

            return {provider, selectedAccount, stakeTokenContract, stakingContract, chainID}

        }
     catch (error) {
        console.log()
    }
}