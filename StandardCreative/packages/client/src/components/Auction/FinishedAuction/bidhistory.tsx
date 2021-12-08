import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import BidHistoryPanel from './bidhistorypanel'
import '../style.scss'
import './bidhistorystyle.scss'
import { finishedAuctionHistory } from '../../../store/selector'
import { getEthPrice, getTransactions, getWinner } from '../../../services/api'

const BidHistory = (props) => {
	const { id } = useParams()
	const [transactiondata, setTransactiondata] = useState([])
	const [winner, setWinner] = useState('')
	const [topbidamount, setTopbidamount] = useState(0)
	const [ethprice, setEthprice] = useState(0)
	const getHistory = useSelector(finishedAuctionHistory)
	const initialValue = getHistory
	const [records, setRecords] = useState([])
	const [totaleth, setTotaleth] = useState(10)
	const [totalprice, setTotalprice] = useState(0)
	const updateBid = (eth, price) => {
		setTotalprice(totalprice + price)
		const newValue = totaleth + eth
		setTotaleth(newValue)
		const newElement = { bidder: 'certainxp', amount: newValue }
		setRecords((records) => [...records, newElement])
	}
	const fetchdata = async () => {
		const transactiondatas = await getTransactions(id)
		const res = await getWinner(id)
		const eth = await getEthPrice()
		console.log(res)
		setWinner(res ? res.winner : '')
		setTopbidamount(res ? res.amount / Math.pow(10, 18) : 0)
		setEthprice(eth ? eth.data.ethereum.usd : 0)
		// dispatch(get_transactions(transactiondata))
		setTransactiondata(transactiondatas)
	}
	useEffect(() => {
		fetchdata()
	}, [])
	return (
		<div className="bid-single">
			<div>
				<div className="bid-type">1/1 Auction History</div>
				<div className="bid-view winner-view">
					<div>
						WINNER INFO
						<div className="winner-name">
							Winner Address: <span>{winner}</span>
						</div>
					</div>
					<div>
						<span>Ξ</span>
						{topbidamount}
					</div>
					<div>(${totaleth ? (totaleth * ethprice).toFixed(2) : 0.0})</div>
					<div className="win-date">
						Win Date: <span>Mon, 21th, Oct 2021</span>
					</div>
				</div>
			</div>
			<div className="records bid-history">
				<div>Bid History</div>
				{<BidHistoryPanel data={transactiondata} />}
			</div>
		</div>
	)
}

export default BidHistory
