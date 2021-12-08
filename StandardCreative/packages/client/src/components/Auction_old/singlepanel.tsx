import React, { useState } from 'react'
import './style.scss'

const SinglePanel = (props) => {
  const { isconnected, issingle, updateBid } = props
  const [amount, setAmount] = useState(0)
  const placeBid = () => {
    updateBid(amount, amount * 3300)
  }

  return (
    <div className="bid-detail">
      {isconnected && issingle && (
        <>
          <div className="single-bid-btn">
            <div className="single-bid-input">
              <span className="eth-symbol">Ξ</span>
              <input type="number" onChange={(e) => setAmount(parseInt(e.target.value))} />
              <span>(${amount ? (amount * 3300).toFixed(2) : 0})</span>
            </div>
            <span onClick={() => placeBid()}>Bid to Win</span>
          </div>
        </>
      )}
    </div>
  )
}

export default SinglePanel
