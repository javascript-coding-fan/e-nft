import React, { useState } from 'react'
import AuctionHeader from '../components/Auction/header'
import TopBar from '../components/Auction/topbar'
import Gallery from '../components/Auction/gallery'
import FinishSection from '../components/Auction/FinishedAuction/finishsection'
import ImageViewer from '../components/Auction/imageviewer'
import '../components/Auction/style.scss'
import { LeftImage } from '../components/Auction/images'

const FinishedAuction = () => {
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
				<>
					<div className="end-auction">
						<img src={LeftImage} />
					</div>
					<FinishSection />
				</>
			</div>
			{viewimage ? <ImageViewer show={viewimage} close={() => setViewimage(false)} /> : <></>}
		</div>
	)
}

export default FinishedAuction
