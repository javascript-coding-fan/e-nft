import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AuctionHeader from '../components/Auction/header'
import TopBar from '../components/Auction/topbar'
import Gallery from '../components/Auction/gallery'
import BidSection from '../components/Auction/bidsection'
import ImageViewer from '../components/Auction/imageviewer'
import '../components/Auction/style.scss'
import { LeftImage } from '../components/Auction/images'
import { getAuction } from '../services/oneOfOne'
import { get_auction } from '../store/actions'
import { useParams } from 'react-router-dom'

const Auction = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [viewimage, setViewimage] = useState(false)
	let auctionData = useSelector((state: any) => state.currentAuction)
	let finished = auctionData ? auctionData.auction.finished : null
	useEffect(async () => {
		const res = await getAuction(id)
		if (res) {
			const auctiondata = {
				nftContract: res.nftContract,
				creatorAddress: res.creatorAddress,
				creatorShare: res.creatorShare,
				openEditionPrice: res.openEditionPrice,
				minBidIncrement: res.minBidIncrement,
				duration: res.duration,
				durationIncrement: res.durationIncrement,
				startTime: res.startTime,
				topBidAmount: res.topBidAmount,
				topBidAddress: res.topBidAddress,
				totalOpenEditionBids: res.totalOpenEditionBids,
				finished: res.finished
			}
			dispatch(get_auction(auctiondata))
		}
	}, [])
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
				{/* {!finished ? (
          <>
            <Gallery open={() => setViewimage(true)} />
            <BidSection id={id} />
          </>
        ) : (
          <div className="end-auction">
            <img src={LeftImage} />
          </div>
        )} */}

				<Gallery open={() => setViewimage(true)} />
				<BidSection id={id} />
			</div>
			{viewimage ? <ImageViewer show={viewimage} close={() => setViewimage(false)} /> : <></>}
		</div>
	)
}

export default Auction
