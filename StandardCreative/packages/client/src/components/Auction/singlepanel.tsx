import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './style.scss'

const SinglePanel = (props) => {
  const dispatch = useDispatch()
  const isconnected = useSelector((state: any) => state.user.walletConnected)
  const { issingle, updateBid } = props
  const [amount, setAmount] = useState(0)
  const placeBid = () => {
    updateBid(amount, amount * 3300)
  }
  const updateamout = (e) => {
    setAmount(e.target.value)
  }

  return (
    <div className="bid-detail">
      {isconnected && issingle && (
        <>
          <div className="single-bid-btn">
            <div className="single-bid-input">
              <span className="eth-symbol">Ξ</span>
              <input type="number" onChange={(e) => updateamout(e)} />
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
