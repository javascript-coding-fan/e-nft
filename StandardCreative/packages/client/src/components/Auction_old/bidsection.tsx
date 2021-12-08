import React, { useState } from 'react'
import SingleBid from './singlebid'
import MultiBid from './multibid'
import Time from './time'
import RecordPanel from './recordpanel'
import ControlPan from './controlpan'
import './style.scss'

const BidSection = (props) => {
  const [isconnected, setIsconnected] = useState(false)
  const [issingle, setIssingle] = useState(false)
  const [switcheth, setSwitcheth] = useState(0)
  const handleconnect = (value) => {
    setIsconnected(value)
  }

  return (
    <div className="bid-container">
      <SingleBid
        issingle={issingle}
        setIssingle={() => setIssingle(true)}
        isconnected={isconnected}
        handleswitch={(value) => setSwitcheth(value)}
      />
      <div className="controll-wrapper">
        <Time />
        <ControlPan isconnected={isconnected} handleConnect={(value) => handleconnect(value)} />
      </div>
      <MultiBid
        issingle={issingle}
        setIssingle={() => setIssingle(false)}
        isconnected={isconnected}
        switcheth={switcheth}
      />

      {/* <RecordPanel isconnected={isconnected} /> */}
    </div>
  )
}

export default BidSection
