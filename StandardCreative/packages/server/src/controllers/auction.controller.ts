// @ts-ignore
import { auctions } from '../database/models'
// @ts-ignore
import { Transaction } from '../database/models'

export const auctionController = () => {
  const createAuction = async (req, res, next) => {
    const {
      auctionId,
      nftContract,
      tokenId,
      creatorAddress,
      creatorShare,
      openEditionPrice,
      minBidIncrement,
      duration,
      durationIncrement
    } = req.body

    try {
      const data = await auctions.create({
        auctionId: auctionId,
        nftContract: nftContract,
        tokenId: tokenId,
        creatorAddress: creatorAddress,
        creatorShare: creatorShare,
        openEditionPrice: openEditionPrice,
        minBidIncrement: minBidIncrement,
        duration: duration,
        durationIncrement: durationIncrement,
        status: 'InProgress'
      })
      if (res.status(200).json({ success: true, data })) {
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateAuction = async (req, res, next) => {
    const { auctionId } = req.body

    try {
      const data = await auctions.update(
        {
          status: 'Finished'
        },
        {
          where: { auctionId: auctionId }
        }
      )
      if (res.status(200).json({ success: true, data })) {
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getAuctions = async (req, res, next) => {
    try {
      const data = await auctions.findAll()
      if (res.status(200).json({ success: true, data })) {
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getAuction = async (req, res, next) => {
    const id = req.body.id
    try {
      const data = await auctions.findOne({
        where: {
          id: id
        }
      })
      if (res.status(200).json({ success: true, data })) {
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

	const getAuctionsByStatus = async (req, res, next) => {
	  const status = req.body.status
    try {
      const data = await auctions.findAll({
        where: {
          status: status
        }
      })
      if (res.status(200).json({ success: true, data })) {
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return {
    createAuction,
    updateAuction,
    getAuctions,
    getAuction,
    getAuctionsByStatus
  }
}
