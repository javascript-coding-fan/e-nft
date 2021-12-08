// import { token } from 'morgan';
// @ts-ignore
import { auctions } from '../database/models'
// @ts-ignore
import { transactions } from '../database/models'

const auction_abi = require('../../abis/auction.json')
const auction_addr = '0xcff934358f74DAD3a82fa96A1a79915271bfdDb0'

const Web3 = require('web3')
const web3 = new Web3('wss://rinkeby-light.eth.linkpool.io/ws')

const auction_instance = new web3.eth.Contract(auction_abi, auction_addr)

export const auctionCreated = async () => {
  auction_instance.events.allEvents().on('data', async (e) => {
    if (e.event === 'AuctionCreated') {
      console.log('here -------')
      const auctionId = e.returnValues.id
      const nftContract = e.returnValues.nftContract
      const creatorAddress = e.returnValues.creatorAddress
      const creatorShare = e.returnValues.creatorShare
      const openEditionPrice = e.returnValues.openEditionPrice
      const minBidIncrement = e.returnValues.minBidIncrement
      const duration = e.returnValues.duration
      const durationIncrement = e.returnValues.durationIncrement

      try {
        const data = await auctions.create({
          auctionId: auctionId,
          nftContract: nftContract,
          creatorAddress: creatorAddress,
          creatorShare: creatorShare,
          openEditionPrice: openEditionPrice,
          minBidIncrement: minBidIncrement,
          duration: duration,
          durationIncrement: durationIncrement,
          status: 'InProgress'
		})
		  console.log('store data <<<<<<<<', data)
      } catch (err) {
        console.log(err)
      }
    }
  })
}

export const createBid = async () => {
  auction_instance.events.allEvents().on('data', async (e) => {
    if (e.event === 'AuctionBid') {
      	console.log(e)
      	const auctionId = e.returnValues.id
      	const bidAmount = e.returnValues.amount
      	const bidder = e.returnValues.bidder
      	const isOneOfOne = e.returnValues.oneOfOne
	  	const duration = e.returnValues.duration

		const bidder_exists = await transactions.findOne({
			where: {
				bidder: bidder,
				auctionId: auctionId
			}
		});
		console.log("BBB>>>", bidder_exists)

		try {
			if (!bidder_exists) {
				const data = await transactions.create({
					auctionId: auctionId,
					bidAmount: bidAmount,
					bidder: bidder,
					isOneOfOne: isOneOfOne
				})
			}
			else {
				const data = await transactions.update({
					bidAmount: bidAmount
				},{
						where: {
							bidder: bidder,
							auctionId: auctionId
					}
				})
			}
      } catch (err) {
        console.log(err)
      }
    }
  })
}

export const auctionFinished = async () => {
  auction_instance.events.allEvents().on('data', async (e) => {
    if (e.event === 'AuctionFinished') {
      console.log(e)
      const auctionId = e.returnValues.id

      try {
        const data = await auctions.update(
          {
            status: 'Finished'
          },
          {
            where: { auctionId: auctionId }
          }
        )
      } catch (err) {
        console.log(err)
      }
    }
  })
}
