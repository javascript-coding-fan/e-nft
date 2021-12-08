import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import SinglePanel from './singlepanel'
import RecordPanel from './recordpanel'
import { getAuction, placeBid, switchTopBidToOpenEdition } from '../../services/oneOfOne'
import './style.scss'
import { get_transactions, get_auction } from '../../store/actions'
import BaseModal from '../../pages/baseModal'

const APP_URL = 'https://252e-23-227-186-130.ngrok.io/api'
import { getEthPrice, getTransactions, switchUpdate } from '../../services/api'
const zero_address = '0x0000000000000000000000000000000000000000'


const SingleBid = (props) => {
	const { id } = props
	const dispatch = useDispatch()

	const [isError, setIsError] = useState(false)
	const [errMsg, setErrMsg] = useState('')
	const [isAmount, setIsAmount] = useState(false)

	const closeModal = () => {
		setIsError(false);
		setIsAmount(false);
	}


	const initTransactions = async () => {
		const initialtransactions = await getTransactions(id)
		dispatch(get_transactions(initialtransactions))
	}

	const { handleswitch, issingle, setIssingle } = props
	const [ethprice, setEthprice] = useState(0)
	const [totaleth, setTotaleth] = useState(0)
	const [totalprice, setTotalprice] = useState(0)
	const [records, setRecords] = useState([])
	const address = useSelector((state: any) => state.user.userAddress)
	const auctionData = useSelector((state: any) => state.currentAuction)
	const transaction = useSelector((state: any) => state.transactions)
	const transactiondata = transaction ? transaction.data : []
	const topBidAmount = auctionData ? parseInt(auctionData.auction.topBidAmount, 10) / Math.pow(10, 18) : null
	const topBidAddress = auctionData ? auctionData.auction.topBidAddress : null
	const updateBid = async (eth, price) => {
		if (eth > topBidAmount) {
			const res = await placeBid(id, eth, true, address)
			//   const { data } = await axios.post(`${APP_URL}/create-transaction`, {
			//     auctionId: id,
			//     bidAmount: eth,
			//     bidder: address
			//   })
			if (res) {
				let errmsg = res.error.message
				if (errmsg.indexOf('Already top bidder') > 0) {
					setErrMsg('Already top bidder')
				} else if (errmsg.indexOf('insufficient') > 0) {
					setErrMsg('insufficient funds')
				} else if (errmsg.indexOf('Auction ended') > 0) {
					setErrMsg('Auction ended')
				} else {
					console.log('---', errmsg.indexOf('insufficient'))
					setErrMsg('Something went wrong')
				}
				setIsError(true);
			} else {
				reInitAuction()
				setTotalprice(totalprice + price)
				const newValue = totaleth + Number(eth)
				setTotaleth(newValue)
			}
		} else {
			console.log(eth, ' is less than topBidAmount', topBidAmount)
			setIsAmount(true);
		}
	}
	const reInitAuction = async () => {
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
			const transactiondata = await getTransactions(id)
			setRecords(transactiondata)
			dispatch(get_transactions(transactiondata))
		}
	}
	const initEthPrice = async () => {
		let res = await getEthPrice()
		let price = res.data.ethereum.usd
		setEthprice(price)
	}
	useEffect(() => {
		initTransactions()
		initEthPrice()
	}, [])
	const SwitchBid = async () => {
		const res = await switchTopBidToOpenEdition(id)
		if (res == 'Success') {
			reInitAuction()
			await switchUpdate(id, address)
		} else {
			let errmsg = res.error.message
			if (errmsg.indexOf('Already top bidder') > 0) {
				setErrMsg('Already top bidder')
			} else if (errmsg.indexOf('insufficient') > 0) {
				setErrMsg('insufficient funds')
			} else if (errmsg.indexOf('Auction ended') > 0) {
				setErrMsg('Auction ended')
			} else if (errmsg.indexOf('Bid is too low') > 0) {
				setErrMsg('Bid is too low')
			} else if (errmsg.indexOf('Not top bidder') > 0) {
				setErrMsg('Not top bidder')
			} else {
				console.log('---', errmsg.indexOf('insufficient'))
				setErrMsg('Something went wrong')
			}
			setIsError(true);
		}
	}
	return (
		<>
			<div className="bid-single">
				<div onClick={() => setIssingle()}>
					<div className="bid-type">1/1</div>
					<div className="bid-view">
						<div>TOP BID</div>
						<div>
							<span>Ξ</span>
							{topBidAmount ? topBidAmount : 0}
						</div>
						<div>(${(topBidAmount * ethprice).toFixed(2)})</div>
						<div>{topBidAddress != zero_address ? topBidAddress : 'BIDDER NAME'}</div>
					</div>
				</div>
				<SinglePanel issingle={issingle} updateBid={(eth, price) => updateBid(eth, price)} />
				<div className="records">{issingle && <RecordPanel records={records} auctionId={id} switchbid={() => SwitchBid()} />}</div>
			</div>
			<BaseModal label="Notification" show={isError} closeModal={closeModal}>
				<h1 className="modal-title" >{errMsg}</h1>
			</BaseModal>
		</>
	)
}

export default SingleBid
