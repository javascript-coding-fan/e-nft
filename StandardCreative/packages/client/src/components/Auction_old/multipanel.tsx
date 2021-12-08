import React, { useState } from 'react'
import './style.scss'

const MultiPanel = (props) => {
  const { isconnected, issingle, updateBid } = props
  const [quantity, setQuantity] = useState(0)
  const placeBid = () => {
    updateBid(0.2 * quantity, 300 * quantity, quantity)
  }
  return (
    <div className="bid-detail">
      {isconnected && !issingle && (
        <>
          <div className="multi-bid-input">
            <input type="number" onChange={(e) => setQuantity(parseInt(e.target.value))} />
            <span>.2Ξ/$300 EACH</span>
          </div>
          <div className="multi-bid-btn">
            <span>
              {quantity ? (0.2 * quantity).toFixed(1) : 0}Ξ/${quantity ? 300 * quantity : 0}
            </span>
            <span onClick={() => placeBid()}>Bid to Mint</span>
          </div>
        </>
      )}
    </div>
  )
}

export default MultiPanel
