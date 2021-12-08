import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEthPrice } from '../../services/api'
import { placeBid } from '../../services/oneOfOne'
import MultiPanel from './multipanel'
import RecordPanel from './recordpanel'
import BaseModal from '../../pages/baseModal'
import './style.scss'

const MultiBid = (props) => {
	const { id, issingle, setIssingle, switcheth } = props
	const isconnected = useSelector((state: any) => state.user.walletConnected)
	const address = useSelector((state: any) => state.user.userAddress)
	const [ethprice, setEthprice] = useState(0)
	const [records, setRecords] = useState([])
	const [totaleth, setTotaleth] = useState(0)
	const [totalprice, setTotalprice] = useState(0)
	const [totaledition, setTotaledition] = useState(0)
	const [isError, setIsError] = useState(false)
	const [errMsg, setErrMsg] = useState('')

	const closeModal = () => {
		setIsError(false);
	}
	const auctionData = useSelector((state: any) => state.currentAuction)
	const totalOpenEditionBids = auctionData ? parseInt(auctionData.auction.totalOpenEditionBids, 10) / Math.pow(10, 18) : null
	const openEditionPrice = auctionData ? parseInt(auctionData.auction.openEditionPrice, 10) / Math.pow(10, 18) : null
	console.log(auctionData, openEditionPrice)
	const updateBid = async (eth, price, quantity) => {
		const res = await placeBid(id, eth, false, address)
		if (res) {
			let errmsg = res.error.message
			if (errmsg.indexOf('Already top bidder') > 0) {
				setErrMsg('Already top bidder')
			} else if (errmsg.indexOf('insufficient') > 0) {
				setErrMsg('insufficient funds')
			} else if (errmsg.indexOf('Auction ended') > 0) {
				setErrMsg('Auction ended')
			} else if (errmsg.indexOf('Bid is too low') > 0) {
				setErrMsg('Bid is too low')
			} else {
				console.log('---', errmsg.indexOf('insufficient'))
				setErrMsg('Something went wrong')
			}
			setIsError(true);
		} else {
			setTotalprice(totalprice + price)
			setTotaleth(totaleth + eth)
			setTotaledition(totaledition + quantity)
		}
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
		<>
			<div className="bid-multi">
				<div onClick={() => setIssingle()}>
					<div className="bid-type">COLLECTIBLES</div>
					<div className="bid-view">
						<div>TOTAL BID</div>
						<div>
							<span>Ξ</span>
							{totalOpenEditionBids ? totalOpenEditionBids.toFixed(5) : 0}
						</div>
						<div>(${(totalOpenEditionBids * ethprice).toFixed(2)})</div>
						<div>{(totalOpenEditionBids / openEditionPrice).toFixed(1)} EDITIONS</div>
					</div>
				</div>
				<MultiPanel
					issingle={issingle}
					isconnected={isconnected}
					updateBid={(eth, price, quantity) => updateBid(eth, price, quantity)}
				/>
				<div className="records">
					{/* {!issingle && <RecordPanel isconnected={isconnected} />} */}
				</div>
			</div>
			<BaseModal label="Notification" show={isError} closeModal={closeModal}>
				<h1 className="modal-title" >{errMsg}</h1>
			</BaseModal>
		</>
	)
}

export default MultiBid
