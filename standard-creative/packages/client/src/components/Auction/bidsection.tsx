import React, { useState } from 'react'
import './style.scss'

const BidSection = (props) => {
  const { handle } = props
  const closeWalletConnectionModal = () => {
    handle()
  }

  return (
    <div className="bid-container">
      <div className="bid-single">
        <div className="bid-type">1/1</div>
        <div className="bid-view">
          <div>TOP BID</div>
          <div>
            <span>Ξ</span>100
          </div>
          <div>($330,000)</div>
          <div>BIDDER NAME</div>
        </div>
        <div className="bid-detail"></div>
      </div>
      <div className="controll-wrapper">
        <div className="time">
          <div>TIME REMAINING:</div>
          <div>15:23</div>
          <div>(each bid extends auction 10min)</div>
        </div>
        <div className="control-btns">
          <button onClick={() => closeWalletConnectionModal()}>CONNECT WALLET</button>
        </div>
      </div>
      <div className="bid-multi">
        <div className="bid-type">COLLECTIBLES</div>
        <div className="bid-view">
          <div>TOTAL BID</div>
          <div>
            <span>Ξ</span>90
          </div>
          <div>($300,000)</div>
          <div>440 EDITIONS</div>
        </div>
        <div className="bid-detail"></div>
      </div>
    </div>
  )
}

export default BidSection
