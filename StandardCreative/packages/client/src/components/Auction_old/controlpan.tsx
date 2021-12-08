import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import ConnectModal from './ConnectModal'
import './style.scss'

const ControlPan = ( props ) => {
  const { isconnected, handleConnect } = props
  const [connect, setConnect] = useState(false)
  return (
    <div className="control-btns">
      {!isconnected ? (
        <button className="connect-btn" onClick={() => setConnect(true)}>
          CONNECT WALLET
        </button>
      ) : (
        <button className="logout-btn" onClick={() => handleConnect(false)}>
          <span>certainxp</span>
          LOGOUT
        </button>
      )}
      <ConnectModal show={connect} />
    </div>
  )
}

export default ControlPan
