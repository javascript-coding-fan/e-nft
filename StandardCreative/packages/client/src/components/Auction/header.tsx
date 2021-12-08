import React from 'react'
import logo from '../../assets/images/static-logo.png'
import { Link } from 'react-router-dom'
import './style.scss'

const AuctionHeader = () => {
	return (
		<div className="header">
			<img src={logo} className="logo" alt="logo" />
			<div className="gotolist">
				<Link to="/auctions">
					<button className="goback" >Go to List</button>
				</Link>
			</div>
		</div>
	)
}

export default AuctionHeader
