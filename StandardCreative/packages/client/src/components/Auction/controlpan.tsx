import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ConnectModal from './ConnectModal'
import './style.scss'
import { login, logout } from '../../store/actions'
import { RootState } from '../../store/state.types'
import web3 from 'web3'

const ControlPan = (props) => {
	const dispatch = useDispatch()
	const userInfo = useSelector((state: any) => state.user)
	const [connected, isConnected] = useState(false)
	const loginMetamask = async () => {
		if (window.ethereum) {
			try {
				const addressArray = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				if (addressArray) {
					dispatch(login(addressArray[0], 'metamask'))
				}
			} catch (e) {
				console.log('denied', e)
			}
		} else {
			alert('You have to install MetaMask !')
		}
	}
	const checkloggedin = async () => {
		// if (window.ethereum) {
		// 	await window.ethereum.enable();
		// 	const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		// 	if (accounts.length > 0) {
		// 		isConnected(true)
		// 	}
		// }
	}
	const handleLogout = async () => {
		dispatch(logout())
	}
	useEffect(() => {
		checkloggedin()
	}, [])
	return (
		<div className="control-btns">
			{!userInfo.walletConnected ? (
				<button className="connect-btn" onClick={() => loginMetamask()}>
					CONNECT WALLET
				</button>
			) : (
				<button className="logout-btn" onClick={() => handleLogout()}>
					<span>{userInfo.userAddress.replace(userInfo.userAddress.substring(5, 39), ".....")}</span>
					LOGOUT
				</button>
			)}
		</div>
	)
}

export default ControlPan
