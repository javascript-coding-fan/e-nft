import GlobalStyle from '@standardcreative/client-core/src/util/GlobalStyle'
import React, { useEffect, useCallback } from 'react'
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
// import { useDispatch } from '@standardcreative/client-core/src/store'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import './styles.scss'
import { AuthAction } from '@standardcreative/client-core/src/user/state/AuthAction'
import RouterComp from '../router'

import Web3 from 'web3'
import { ethers } from 'ethers'
import AUCTION_ABI from '../abi/auction.json'
import { AUCTION_CONTRACT } from '../common/constant'
import { getInprogressAuctions, getFinishedAuctions } from '../services/api'
import { getFinishedAuctionList, getInprogressAuctionList, get_auction } from '../store/actions'
import { getAuction } from '../services/oneOfOne'

let listener = window.ethereum
let walletProvider
let AuctionContract
if (listener) {
	walletProvider = new ethers.providers.Web3Provider(listener)
	AuctionContract = new ethers.Contract(AUCTION_CONTRACT, AUCTION_ABI, walletProvider.getSigner())
} else {
	console.log("Please install metamask.")
}
// import store from '../store'
// const store = configureStore(window.__INITIAL_STATE__);

const App = (): any => {
	const dispatch = useDispatch()

	const initApp = useCallback(() => {
		if (process.env && process.env.NODE_CONFIG) {
			; (window as any).env = process.env.NODE_CONFIG
		} else {
			; (window as any).env = ''
		}

		dispatch(AuthAction.restoreAuth())

		// initGA()

		// logPageView()
	}, [])
	const handleFinishAction = async () => {
		const data1 = await getInprogressAuctions()
		dispatch(getInprogressAuctionList(data1))
		const data2 = await getFinishedAuctions()
		dispatch(getFinishedAuctionList(data2))
	}

	const reInitAuction = async (id: number) => {
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
			console.log('reinit time')
		}
	}
	useEffect(initApp, [])
	useEffect(() => {
		if (listener) {
			AuctionContract.on('AuctionCreated', (event) => {
				console.log('Event : ', event);  //Event object
				handleFinishAction()
			});
			AuctionContract.on('AuctionBid', (event) => {
				console.log('Event : ', event);  //Event object
				reInitAuction(event.toString())
			});
			AuctionContract.on('AuctionFinished', (event) => {
				console.log('Event : ', event);  //Event object
				handleFinishAction()
			});
		}
	}, [])

	return (
		<>
			<Helmet>
				<title>CREATOR</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
				/>
			</Helmet>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<RouterComp />
			</ThemeProvider>
		</>
	)
}

const AppPage = () => {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
}

export default AppPage
