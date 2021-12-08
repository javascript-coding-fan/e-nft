import React, { useState } from 'react'
import '../style.scss'

const BidHistoryPanel = (props) => {
	const { data } = props
	const items = data ? data : []
	const convertTimestamp = (timestamp) => {
		let unix_timestamp = timestamp
		var date = new Date(unix_timestamp);
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		var formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
		console.log(date)
		return formattedTime
	}
	return (
		<div>
			{true && (
				<>
					{items.map((item, index) => (
						// .sort((a, b) => a.amount < b.amount ? 1 : -1)
						// .map((item, index) => (

						<div key={index} className="item">
							<div>{item.bidAmount / Math.pow(10, 18)}</div>
							<div className="item-name">
								<span>{item.bidder}</span>
								{/* <span>{item.bidder.replace(item.bidder.substring(5, 39), ".....")}</span> */}
							</div>
							<div className="item-date">{convertTimestamp(item.createdAt)}</div>
						</div>
					))}
				</>
			)}
		</div>
	)
}

export default BidHistoryPanel
