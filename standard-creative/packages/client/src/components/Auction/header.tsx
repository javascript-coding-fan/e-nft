import React from 'react'
import logo from '../../assets/images/logo.gif'
import './style.scss'

const AuctionHeader = () => {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
    </div>
  )
}

export default AuctionHeader
