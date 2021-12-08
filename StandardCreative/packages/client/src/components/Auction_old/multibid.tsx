import React, { useEffect, useState } from 'react'
import MultiPanel from './multipanel'
import RecordPanel from './recordpanel'
import './style.scss'

const MultiBid = (props) => {
  const { isconnected, issingle, setIssingle, switcheth } = props
  const [records, setRecords] = useState([])
  const [totaleth, setTotaleth] = useState(0)
  const [totalprice, setTotalprice] = useState(0)
  const [totaledition, setTotaledition] = useState(0)
  const updateBid = (eth, price, quantity) => {
    setTotalprice(totalprice + price)
    setTotaleth(totaleth + eth)
    setTotaledition(totaledition + quantity)
  }
  useEffect(() => {
    setTotalprice(totalprice + switcheth * 3300)
    setTotaleth(totaleth + switcheth)
    setTotaledition(totaledition + switcheth / 0.2)
  }, [switcheth])
  return (
    <div className="bid-multi">
      <div onClick={() => setIssingle()}>
        <div className="bid-type">COLLECTIBLES</div>
        <div className="bid-view">
          <div>TOTAL BID</div>
          <div>
            <span>Ξ</span>
            {totaleth.toFixed(1)}
          </div>
          <div>(${totalprice.toFixed(2)})</div>
          <div>{totaledition} EDITIONS</div>
        </div>
      </div>
      <MultiPanel
        issingle={issingle}
        isconnected={isconnected}
        updateBid={(eth, price, quantity) => updateBid(eth, price, quantity)}
      />
      <div className="records">{!issingle && <RecordPanel isconnected={isconnected} />}</div>
    </div>
  )
}

export default MultiBid
