import React from 'react'
import StakedAmount from './StakedAmount'
import EarnedReward from './EarnedReward'
import RewardRate from './RewardRate'

const DisplayPanel = () => {
  return (
    <>
      <StakedAmount/>
      <RewardRate/>
      <EarnedReward/>
    </>
  )
}

export default DisplayPanel
