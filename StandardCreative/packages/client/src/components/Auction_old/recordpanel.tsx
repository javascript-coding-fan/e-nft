import React, { useState } from 'react'
import { SwitchIcon } from './images'
import './style.scss'

const RecordPanel = (props) => {
  const { isconnected, data, switchbid } = props
  const items = data ? data : []
  const handleSwitch = (index) => {
    switchbid(index)
  }
  return (
    <div>
      {isconnected && (
        <>
          {items.map((item, index) => (
            // .sort((a, b) => a.amount < b.amount ? 1 : -1)
            // .map((item, index) => (

            <div key={index} className="item {item.bidder == ' certainxp' ? 'active' : ''}">
              <div className="item-amount">{item.amount}</div>
              <div className="item-name">
                {item.bidder !== 'certainxp' ? (
                  <span>item.bidder</span>
                ) : (
                  <button className="switch-btn" onClick={() => handleSwitch(index)}>
                    switch bid
                  </button>
                )}
              </div>
              {item.bidder == 'certainxp' && <div className="item-tip">Mint {item.amount / 0.2} Collectibles</div>}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default RecordPanel
