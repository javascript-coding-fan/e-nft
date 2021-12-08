import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAuction, getAuctionEndTime } from '../../services/oneOfOne'
import { get_auction } from '../../store/actions'
import './style.scss'

const Time = (props) => {
	const { id, handleFinish } = props
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)
	const [leftTime, setLeftTime] = useState(0)
	const dispatch = useDispatch()
	const isconnected = useSelector((state: any) => state.user.walletConnected)
	const auctionData = useSelector((state: any) => state.currentAuction)
	const startTime = auctionData ? parseInt(auctionData.auction.startTime, 10) : null
	const extendtime = auctionData ? Math.floor(parseInt(auctionData.auction.durationIncrement, 10) / 60) : null

	const setTimeCounter = async () => {
		console.log('time start')
		const res = await getAuctionEndTime(id)
		const lefttime = res - Math.floor(Date.now() / 1000)
		if (lefttime > 0) {
			const mins = Math.floor(lefttime / 60)
			const secs = lefttime % 60
			setMinutes(mins)
			setSeconds(secs)
		}
	}
	const getauction = async () => {
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
	}
	useEffect(() => {
		if (startTime) {
			setTimeCounter()
		}
	}, [startTime, auctionData])
	useEffect(() => {
		let myInterval
		if (startTime) {
			myInterval = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1)
				}
				if (seconds === 0) {
					if (minutes === 0) {
						handleFinish()
						// getauction()
						clearInterval(myInterval)
					} else {
						setMinutes(minutes - 1)
						setSeconds(59)
					}
				}
			}, 1000)
		}
		return () => {
			clearInterval(myInterval)
		}
	})
	return (
		<div className="time">
			<div>TIME REMAINING:</div>
			<div>
				{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
			</div>
			<div>(each bid extends auction {extendtime}min)</div>
		</div>
	)
}

export default Time
