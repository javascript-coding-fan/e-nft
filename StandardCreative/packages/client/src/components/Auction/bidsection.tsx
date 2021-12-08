import React, { useState } from 'react'
import SingleBid from './singlebid'
import MultiBid from './multibid'
import Time from './time'
import RecordPanel from './recordpanel'
import ControlPan from './controlpan'
import './style.scss'
import { finishAuction } from '../../services/oneOfOne'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

const BidSection = (props) => {
	const { id } = props
	let history = useHistory();
	const [issingle, setIssingle] = useState(true)
	const [finished, setFinished] = useState(false)
	const [switcheth, setSwitcheth] = useState(0)
	const auctionData = useSelector((state: any) => state.currentAuction)
	const winner = auctionData ? auctionData.auction.topBidAddress.toLowerCase() : null
	const address = useSelector((state: any) => state.user.userAddress).toLowerCase()
	const _finishAuction = async () => {
		await finishAuction(id)
		history.push('/auctions')
	}
	return (
		<div className="bid-container">
			<SingleBid
				id={id}
				issingle={issingle}
				setIssingle={() => setIssingle(true)}
				handleswitch={(value) => setSwitcheth(value)}
			/>
			<div className="controll-wrapper">
				<Time handleFinish={() => setFinished(true)} id={id} />
				<ControlPan />
				{finished &&
					<button className="end-btn" onClick={() => _finishAuction()}>
						End Auction
					</button>
				}
			</div>
			<MultiBid id={id} issingle={issingle} setIssingle={() => setIssingle(false)} switcheth={switcheth} />
		</div>
	)
}

export default BidSection
