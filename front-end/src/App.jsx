// import './App.css'
import Wallet from './components/Wallet/Wallet'
import Navigation from './components/Navigation/Navigation'
import DisplayPanel from './components/DisplayPanel/DisplayPanel'
import TokenApproval from './components/stakeToken/TokenApproval'
import StakedAmount from './components/stakeToken/stakeAmount'
import WithdrawStakeAmount from './components/Withdraw/Withdraw'
import ClaimReward from './components/ClaimReward/ClaimReward'
import { StakingProvider } from './Context/StakingContext'

function App() {
  return (
  <div className='bg-[#2f404d] h-screen'>
    <Wallet >
      <Navigation/>
      <StakingProvider>
        <DisplayPanel/>
        <TokenApproval />
        <StakedAmount/>
      </StakingProvider>
      <WithdrawStakeAmount/>
      <ClaimReward/>
    </Wallet>
  </div>
  )
}

export default App
 