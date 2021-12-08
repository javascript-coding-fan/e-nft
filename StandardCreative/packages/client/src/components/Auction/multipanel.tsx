import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEthPrice } from '../../services/api'
import './style.scss'

const MultiPanel = (props) => {
	const { isconnected, issingle, updateBid } = props
	const [quantity, setQuantity] = useState(0)
	const [ethprice, setEthprice] = useState(0)
	const address = useSelector((state: any) => state.user.userAddress)
	const auctionData = useSelector((state: any) => state.currentAuction)
	const price = auctionData ? parseInt(auctionData.auction.topBidAmount, 10) / Math.pow(10, 18) : null
	const placeBid = () => {
		updateBid(price * quantity, price * ethprice * quantity, quantity)
		setQuantity(0)
	}
	const updateQty = (e) => {
		setQuantity(e.target.value)
	}
	const initEthPrice = async () => {
		let res = await getEthPrice()
		let price = res.data.ethereum.usd
		setEthprice(price)
	}
	useEffect(() => {
		initEthPrice()
	}, [])
	return (
		<div className="bid-detail">
			{isconnected && !issingle && (
				<>
					<div className="multi-bid-input">
						<input type="number" onChange={(e) => updateQty(e)} />
						<span>{price}Ξ/${price * ethprice} EACH</span>
					</div>
					<div className="multi-bid-btn">
						<span>
							{quantity ? (price * quantity).toFixed(1) : 0}Ξ/${quantity ? (price * ethprice * quantity).toFixed(3) : 0}
						</span>
						<span onClick={() => placeBid()}>Bid to Mint</span>
					</div>
				</>
			)}
		</div>
	)
}

export default MultiPanel