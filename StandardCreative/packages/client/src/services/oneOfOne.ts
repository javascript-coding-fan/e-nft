import Web3 from 'web3'
import { ethers } from 'ethers'
import AUCTION_ABI from '../abi/auction.json'
import { AUCTION_CONTRACT } from '../common/constant'
import { parseUnits } from '../libs'

let walletProvider

export const placeBid = async (auctionId: Number, amount: Number, isoneOfOne: Boolean, sender: string) => {
  let listener = window.ethereum
  walletProvider = new ethers.providers.Web3Provider(listener)
  const AuctionContract = new ethers.Contract(AUCTION_CONTRACT, AUCTION_ABI, walletProvider.getSigner())
  console.log(amount, parseUnits(amount, 18))
  try {
      const txHash = await AuctionContract.createBid(auctionId, isoneOfOne, { value: parseUnits(amount, 18) })
  } catch (e) {
	  console.log('error on bidding', e)
	  return e
  }
}

export const getAuction = async (auctionId: Number) => {
  let listener = window.ethereum
  walletProvider = new ethers.providers.Web3Provider(listener)
  const AuctionContract = new ethers.Contract(AUCTION_CONTRACT, AUCTION_ABI, walletProvider.getSigner())
  try {
    const res = await AuctionContract.getAuction(auctionId)
    return res
  } catch (e) {
    console.log('error on bidding', e)
  }
}

export const getAuctionEndTime = async (auctionId: Number) => {
  let listener = window.ethereum
  walletProvider = new ethers.providers.Web3Provider(listener)
  const AuctionContract = new ethers.Contract(AUCTION_CONTRACT, AUCTION_ABI, walletProvider.getSigner())
  try {
    const res = await AuctionContract.getAuctionEndTime(auctionId)
    return res
  } catch (e) {
    console.log('error on bidding', e)
  }
}

export const finishAuction = async (auctionId: Number) => {
  let listener = window.ethereum
  walletProvider = new ethers.providers.Web3Provider(listener)
  const AuctionContract = new ethers.Contract(AUCTION_CONTRACT, AUCTION_ABI, walletProvider.getSigner())
  try {
    const res = await AuctionContract.finishAuction(auctionId)
    return res
  } catch (e) {
    console.log('error on bidding', e)
  }
}

export const switchTopBidToOpenEdition = async (auctionId: Number) => {
  let listener = window.ethereum
  walletProvider = new ethers.providers.Web3Provider(listener)
  const AuctionContract = new ethers.Contract(AUCTION_CONTRACT, AUCTION_ABI, walletProvider.getSigner())
  try {
	  const res = await AuctionContract.switchTopBidToOpenEdition(auctionId)
	  return 'Success'
  } catch (e) {
	  console.log('error on bidding', e)
	  return e
  }
}
