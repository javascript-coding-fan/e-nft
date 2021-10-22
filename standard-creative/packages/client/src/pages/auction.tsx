import React, { useState } from 'react'
import AuctionHeader from '../components/Auction/header'
import TopBar from '../components/Auction/topbar'
import Gallery from '../components/Auction/gallery'
import BidSection from '../components/Auction/bidsection'
import ImageViewer from '../components/Auction/imageviewer'
import Wallet from '../components/Auction/wallet'
import '../components/Auction/style.scss'
import { LeftImage } from '../components/Auction/images'

const Auction = () => {
  const [connectwallet, setConnectwallet] = useState(false)
  const [finished, setFinished] = useState(false)
  const [viewimage, setViewimage] = useState(false)
  const handlewallet = () => {
    setConnectwallet(!connectwallet)
  }
  return (
    <div className="container">
      <AuctionHeader />
      <div className="main">
        <TopBar />
        <div className="description">
          “Life is not about finding yourself. Life is about creating yourself.” - George Bernard Shaw* “I saw the angel
          trapped in the stone, and I carved until I set it free.” - Michaelangelo* “I chipped away every piece that
          wasn’t David.” - Michaelangelo*
        </div>
        {!finished ? (
          <>
            <Gallery open={() => setViewimage(true)} />
            <BidSection handle={() => handlewallet()} />
            <div className="end-btn" onClick={() => setFinished(true)}>
              (End Auction)
            </div>
          </>
        ) : (
          <div className="end-auction">
            <img src={LeftImage} />
          </div>
        )}
      </div>
      {connectwallet ? (
        <Wallet show={connectwallet}>
          <div>Metamask</div>
          <div>Wallet Connect?</div>
        </Wallet>
      ) : (
        <></>
      )}
      {viewimage ? <ImageViewer show={viewimage} close={() => setViewimage(false)} /> : <></>}
    </div>
  )
}

export default Auction
