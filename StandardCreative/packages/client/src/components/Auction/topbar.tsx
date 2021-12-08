import React, { useState } from 'react'
import './style.scss'
import { ShareIcon1, ShareIcon2 } from './images'

const TopBar = (props) => {
  return (
    <div className="topbar">
      <div className="topbar-title">
        IDLE IDOL <span>BY</span> <span>RONEN V</span> <span>STUDIO</span>
      </div>
      <div className="share-btn">
        <div>
          <img src={ShareIcon1} />
          <img src={ShareIcon2} />
        </div>
        SHARE
      </div>
    </div>
  )
}

export default TopBar
