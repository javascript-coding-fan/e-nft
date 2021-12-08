import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTransactions } from '../../services/api'
import { get_transactions } from '../../store/actions'
import { SwitchIcon } from './images'
import './style.scss'

const RecordPanel = (props) => {
	const { records, auctionId, switchbid } = props
	const dispatch = useDispatch()
	const isconnected = useSelector((state: any) => state.user.walletConnected)
	const address = useSelector((state: any) => state.user.userAddress)
	const Transaction = useSelector((state: any) => state.transactions)
	const TransactionData = Transaction ? Transaction.data : []
	const [transactiondata, setTransactiondata] = useState([])
	const handleSwitch = () => {
		switchbid()
	}
	useEffect(async () => {
		const transactiondatas = await getTransactions(auctionId)
		// dispatch(get_transactions(transactiondatas))
		setTransactiondata(transactiondatas)
	}, [])
	const getData = async () => {
		const transactiondatas = await getTransactions(auctionId)
		setTransactiondata(transactiondatas)
	}
	useEffect(() => {
		let myInterval
		myInterval = setInterval(() => {
			getData()
		}, 2000)
		return () => {
			clearInterval(myInterval)
		}
	})
	return (
		<div>
			{isconnected && transactiondata && (
				<>
					{transactiondata.map((item, index) => (
						// .sort((a, b) => a.amount < b.amount ? 1 : -1)
						// .map((item, index) => (

						<div key={index} className="item {item.bidder.toLowerCase() == address.toLowerCase() ? 'active' : ''}">
							<div className="item-amount">{item.bidAmount / Math.pow(10, 18)}</div>
							<div className="item-name">
								{item.bidder.toLowerCase() !== address.toLowerCase() ? (
									<span>{item.bidder.replace(item.bidder.substring(5, 39), ".....")}</span>
								) : (
									<button className="switch-btn" onClick={() => handleSwitch()}>
										switch bid
									</button>
								)}
							</div>
							{item.bidder == 'certainxp' && <div className="item-tip">Mint {item.amount / 0.2} Collectibles</div>}
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default RecordPanel
