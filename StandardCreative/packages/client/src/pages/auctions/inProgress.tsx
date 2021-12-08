import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './auctions.scss'
import Thumbnail from '../../assets/images/image-1.png'
import { inprogressAuctionList } from '../../store/selector'
import { getInprogressAuctionList } from '../../store/actions'
import { getInprogressAuctions } from '../../services/api'
import loadingJpg from '../../assets/spinner.jpeg'

const InProgressAList = () => {
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)

	const getInprogressList = useSelector(inprogressAuctionList)
	const fetchData = async () => {
		const data = await getInprogressAuctions()
		dispatch(getInprogressAuctionList(data))
		setIsLoading(false);
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<div className="gallery-container">
				<div className="gallery-list">
					{getInprogressList.map((info, i) => (
						<Link key={i} to={`/auction/${info.auctionId}`} className="gallery-item">
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
export default InProgressAList
