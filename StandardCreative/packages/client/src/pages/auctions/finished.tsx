import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './auctions.scss'
import Thumbnail from '../../assets/images/image-1.png'
import { finishedAuctionList } from '../../store/selector'
import { getFinishedAuctionList } from '../../store/actions'
import { getFinishedAuctions } from '../../services/api'
import loadingJpg from '../../assets/spinner.jpeg'

const APP_URL = 'https://252e-23-227-186-130.ngrok.io/api'

const FinishedAList = () => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)

	const getFinishedList = useSelector(finishedAuctionList)
	console.log(getFinishedList)
	const fetchData = async () => {
		const data = await getFinishedAuctions()
		dispatch(getFinishedAuctionList(data))
		setIsLoading(false);
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className="gallery-container">
				<div className="gallery-list">
					{getFinishedList.map((info, i) => (
						<Link key={i} to={`/finished-auction/${info.auctionId}`} className="gallery-item">
							<img src={Thumbnail} />
							<p className="title">{info.auctionId}</p>
						</Link>
					))}
				</div>
			</div>
			<div className="loading-screen" style={{ display: isLoading ? 'block' : 'none' }} >
				<img src={loadingJpg} />
			</div>
		</>
	)
}
export default FinishedAList
