import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AUCTION_ABI from '../abi/auction.json'
import { AUCTION_CONTRACT, NFT_CONTRACT, SERVER_HOST } from '../common/constant'
import { parseUnits } from '../libs'
import { client } from '@standardcreative/client-core/src/feathers'
import BaseModal from './baseModal'
import CreateAuctionNotifModal from './createAuctionModal'
import WaittingModal from './waittingModal'
import AuctionHeader from '../components/Auction/header'
import { AuctionService } from '@standardcreative/client-core/src/auction/state/AuctionService'
import { AuctionParams } from '@standardcreative/client/src/utils/types'

let walletProvider

const CreateAuction = () => {
	// const dispatch = useDispatch()
	const [creatorSharePercent, setCreatorSharePercent] = useState(1)
	const [fixedPriceForOpenEdition, setFixedPriceForOpenEdition] = useState(0.25) // ETH
	const [minimumBidIncrementFor1of1, setMinimumBidIncrementFor1of1] = useState(10) // as percent
	const [auctionLength, setAuctionLength] = useState(120) // seconds
	const [auctionIncrementLength, setAuctionIncrementLength] = useState(15) // seconds
	const [selectedFile, setSelectedFile] = useState() // image
	const [nftAddr, setNftAddr] = useState('0x5B37ea930fe0dEeFa2798Bd8C4552f42F71a903f')
	const [address, setAddress] = useState('')

	const [show, setShow] = useState(false)
	const [wait, setWait] = useState(false)
	const closeModal = () => {
		setShow(false)
		setWait(false)
	}

	let listener = window.ethereum
	useEffect(() => {
		if (listener._state.accounts.length > 0) {
			setAddress(listener._state.accounts[0])
		}
	}, [])

	const changeHandler = (event: any) => {
		setSelectedFile(event.target.files[0])
	}

	const handleUpload = () => { }

	const handleCreatorShare = (percent: number) => {
		if (percent < 1) {
			percent = 1
		} else if (percent > 100) {
			percent = 100
		}
		setCreatorSharePercent(percent)
	}

	const createAuction = async () => {
		const server_url = 'https://252e-23-227-186-130.ngrok.io/api'
		walletProvider = new ethers.providers.Web3Provider(listener)
		const AuctionContract = new ethers.Contract(AUCTION_CONTRACT, AUCTION_ABI, walletProvider.getSigner())
		const price = ethers.utils.parseUnits(`${fixedPriceForOpenEdition}`, 'ether');

		try {
			const txHash = await AuctionContract.createAuction(
				nftAddr,
				listener._state.accounts[0],
				creatorSharePercent,
				parseUnits(fixedPriceForOpenEdition, 16),
				minimumBidIncrementFor1of1,
				auctionLength,
				auctionIncrementLength
			)
			setWait(true)
			const result = await txHash.wait()
			AuctionContract.on('AuctionCreated', (auctionId, nftContract) => {
				console.log('auctionId---', auctionId)
			})
			if (result) {
				console.log('Created auction successfully!')
			}

			// const auctionParams = {
			//   nftAddr: nftAddr,
			//   userAddr: listener._state.accounts[0],
			//   creatorSharePercent: creatorSharePercent,
			//   fixedPriceForOpenEdition: parseUnits(fixedPriceForOpenEdition, 16),
			//   minimumBidIncrementFor1of1: minimumBidIncrementFor1of1,
			//   auctionLength: auctionLength,
			//   auctionIncrementLength: auctionIncrementLength
			// };

			// AuctionService.createAuction(auctionParams)

			setWait(false)
			setShow(true)
			// } catch (e) {
			// 	console.log('Failed to create an auction', e)
			// }
		} catch (e) {

		}
	}

	const connectWallet = async () => {
		if (window.ethereum) {
			try {
				const addressArray = await window.ethereum.request({
					method: 'eth_requestAccounts'
				})
				if (addressArray) {
					setAddress(addressArray[0])
				}
			} catch (e) {
				console.log('denied', e)
				return false
			}
		} else {
			alert('You have to install MetaMask !')
			return false
		}
	}
	return (
		<>
			<div className="container">
				<AuctionHeader />
				<div className="page-wrapper">
					<div className="page-inner">
						<h1 className="header-title">Create Auction</h1>
						<div className="gotolist">
							<Link to="/auctions">
								<button className="goback" >Auction List</button>
							</Link>
						</div>
						<div className="createauctionform">
							<div className="form-item">
								<label>NFT Contract Address</label>
								<input
									type="input"
									placeholder="0xd80Fc1179C61e9bC35beD34a6c53c128E25165a5"
									onChange={(e) => setNftAddr(e.target.value)}
									value={nftAddr}
								/>
							</div>
							<div className="form-item">
								<label>Creator share</label>
								<input
									type="number"
									onChange={(e) => handleCreatorShare(Number(e.target.value))}
									value={creatorSharePercent}
								/>
							</div>
							<div className="form-item">
								<label>Price for Open Edition (ETH)</label>
								<input
									type="number"
									onChange={(e) => setFixedPriceForOpenEdition(Number(e.target.value))}
									value={fixedPriceForOpenEdition}
								/>
							</div>
							<div className="form-item">
								<label>Minimum Bid Increment for 1 of 1 (Percentage)</label>
								<input
									type="number"
									onChange={(e) => setMinimumBidIncrementFor1of1(Number(e.target.value))}
									value={minimumBidIncrementFor1of1}
								/>
							</div>
							<div className="form-item">
								<label>Initial Auction Length (Seconds)</label>
								<input type="number" onChange={(e) => setAuctionLength(Number(e.target.value))} value={auctionLength} />
							</div>
							<div className="form-item">
								<label>Auction Increment Length (Seconds)</label>
								<input
									type="number"
									onChange={(e) => setAuctionIncrementLength(Number(e.target.value))}
									value={auctionIncrementLength}
								/>
							</div>
							<div className="form-item">
								<label>Auction Image</label>
								<input type="file" name="file" onChange={changeHandler} />
								{/* <button onClick={handleUpload}>Submit</button> */}
							</div>
							{address !== '' ? (
								<button onClick={createAuction}>Create Auction</button>
							) : (
								<button onClick={connectWallet}>Connect Wallet</button>
							)}
							{/* @ts-ignore */}
							<style jsx>{`
            .page-wrapper {
              // width: 100vw;
              overflow: hidden;
            }
            .page-inner {
              width: 600px;
              margin: 20px auto;
            }
            .createauctionform {
              border-radius: 12px;
              border: 1px solid #333;
              padding: 30px 30px;
              text-align: center;
            }
            .form-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 25px;
            }
            .form-item label {
              font-size: 16px;
              line-height: 1.2;
            }
            .form-item input {
              width: 40%;
              background: transparent;
              font-style: normal;
              font-weight: normal;
              border: 1px solid #333;
              box-sizing: border-box;
              border-radius: 6px;
              padding: 8px 12px;
              font-size: 16px;
              line-height: 16px;
              letter-spacing: 0.01em;
              color: #1a2f34;
              transition: 300ms all;
            }
            button {
              width: 80%;
              height: 56px;
              background: #ffffff;
              border: 1.5px solid #202020;
              box-sizing: border-box;
              border-radius: 8px;
              font-style: normal;
              font-weight: normal;
              font-size: 18px;
              line-height: 24px;
              color: #202020;
              cursor: pointer;
              margin-top: 30px;
              transition: 300ms all;
            }
            button:hover {
              background: #a4a4a4;
              border: 1px solid #a4a4a4;
            }
            input::placeholder {
              opacity: 0.5;
            }
            .gotolist{
              position: absolute;
              top: 0;
              right:15px;

            }
            button.goback {
              width: 100%;
              height: 45px;
              padding: 0 17px;
            }
            .header-title{
              font-size: 40px;
              text-align: center;
              margin-bottom: 20px;
            }
          `}</style>
						</div>
					</div>
					<BaseModal label="Notification" show={show} closeModal={closeModal}>
						<CreateAuctionNotifModal closeModal={closeModal} />
					</BaseModal>
					<BaseModal label="" show={wait} closeModal={closeModal}>
						<WaittingModal closeModal={closeModal} />
					</BaseModal>
				</div>
			</div>
		</>
	)
}

export default CreateAuction
