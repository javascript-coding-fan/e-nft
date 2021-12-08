import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuctionHeader from '../../components/Auction/header'
import InProgressAList from './inProgress'
import FinishedAList from './finished'
import './auctions.scss'

const Auctions = () => {
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTab1 = () => {
    setActiveTab('tab1')
  }
  const handleTab2 = () => {
    setActiveTab('tab2')
  }

  return (
    <div className="container">
      <AuctionHeader />
      <div className="main">
        <div className="gotolist">
            <Link to="/create-auction">
              <button className="goback" >Create Auction</button>
            </Link>
        </div>
        <h1 className="header-title">AUCTIONS</h1>
        <div className="Tabs">
          <ul className="nav">
            <li className={activeTab === 'tab1' ? 'active' : ''} onClick={handleTab1}>
              in Progress
            </li>
            <li className={activeTab === 'tab2' ? 'active' : ''} onClick={handleTab2}>
              Finished
            </li>
          </ul>
          <div className="outlet">{activeTab === 'tab1' ? <InProgressAList /> : <FinishedAList />}</div>
        </div>
      </div>
      
    </div>
  )
}

export default Auctions
