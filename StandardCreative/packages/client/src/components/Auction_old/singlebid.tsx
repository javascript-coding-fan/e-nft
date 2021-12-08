import React, { useEffect, useState } from 'react'
import SinglePanel from './singlepanel'
import RecordPanel from './recordpanel'
import './style.scss'

const BidSection = (props) => {
  const { isconnected, handleswitch, issingle, setIssingle } = props
  const initialValue = [
    { bidder: 'bidder4', amount: 100 },
    { bidder: 'bidder1', amount: 90 },
    { bidder: 'bidder2', amount: 80 },
    { bidder: 'bidder3', amount: 70 }
  ]

  const [records, setRecords] = useState([])
  const [totaleth, setTotaleth] = useState(0)
  const [totalprice, setTotalprice] = useState(0)
  const updateBid = (eth, price) => {
    setTotalprice(totalprice + price)
    const newValue = totaleth + eth
    setTotaleth(newValue)
    const newElement = { bidder: 'certainxp', amount: newValue }
    setRecords((records) => [...records, newElement])
  }
  const SwitchBid = (index) => {
    const switchamount = records[index].amount
    const newValue = totaleth - switchamount
    setTotaleth(newValue)
    setTotalprice(totalprice - switchamount * 3300)
    records.splice(index, 1)
    setRecords(records)
    handleswitch(switchamount)
  }
  useEffect(() => {
    setRecords(initialValue)
  }, [])
  return (
    <div className="bid-single">
      <div onClick={() => setIssingle()}>
        <div className="bid-type">1/1</div>
        <div className="bid-view">
          <div>TOP BID</div>
          <div>
            <span>Ξ</span>
            {totaleth.toFixed(1)}
          </div>
          <div>(${totalprice.toFixed(2)})</div>
          <div>BIDDER NAME</div>
        </div>
      </div>
      <SinglePanel issingle={issingle} isconnected={isconnected} updateBid={(eth, price) => updateBid(eth, price)} />
      <div className="records">
        {issingle && <RecordPanel isconnected={isconnected} data={records} switchbid={(id) => SwitchBid(id)} />}
      </div>
    </div>
  )
}

export default BidSection
