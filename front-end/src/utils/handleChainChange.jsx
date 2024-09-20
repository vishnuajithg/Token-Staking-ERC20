export const handleChainChange = async(setState)=>{
    let chainIDHex = await window.ethereum.request({
        method:"eth_chainId"
    })
    const chainId = parseInt(chainIDHex,16)
    console.log(chainId)
    setState(prevState=>({...prevState, chainId}));
}