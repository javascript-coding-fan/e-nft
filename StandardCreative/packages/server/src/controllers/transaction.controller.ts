// @ts-ignore
import { Auction } from '../database/models'
// @ts-ignore
import { transactions } from '../database/models'
var Sequelize = require('sequelize')

export const transactionController = () => {
	const createTransaction = async (req, res, next) => {
		const { auctionId, bidAmount, bidder } = req.body

		try {
			const data = await transactions.create({
				auctionId: auctionId,
				bidAmount: bidAmount,
				bidder: bidder
			})
			if (res.status(200).json({ success: true, data })) {
				res.send(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const getWinner = async (req, res, next) => {
		const auctionId = req.body.auctionId
		const auctionId_exist = await transactions.findOne({
			where: { auctionId: auctionId }
		})
		if (!auctionId_exist) {
			res.send(`Auction ID ${auctionId} doesn't exist in transaction.`)
		}
		try {
			const maxAmount = await transactions.findOne({
				attributes: [[Sequelize.fn('max', Sequelize.col('bidAmount')), 'amount']],
				raw: true,
				where: { auctionId: auctionId }
			})

			const maxInAuction = maxAmount.amount

			const winner = await transactions.findOne({
				where: {
					auctionId: auctionId
				},
				order: [['bidAmount', 'desc']],
			})
			const winner_wallet = winner.bidder
			const isOneOfOne = winner.isOneOfOne

			if (
				res.status(200).json({ success: true, winner: winner_wallet, amount: maxInAuction, isOneOfOne: isOneOfOne })
			) {
				res.send(winner_wallet)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const getTransactionsById = async (req, res, next) => {
		const auctionId = req.body.auctionId
		const auctionId_exist = await transactions.findOne({
			where: { auctionId: auctionId }
		})
		if (!auctionId_exist) {
			res.send(`Auction ID ${auctionId} doesn't exist in transaction.`)
		}
		try {
			const data = await transactions.findAll({
				where: {
					auctionId: auctionId,
					isOneOfOne: true
				}
			})
			if (res.status(200).json({ success: true, data })) {
				res.send(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const getTransactionsByType = async (req, res, next) => {
		const auctionType = req.body.isOneofOne
		try {
			const data = await transactions.findAll({
				where: {
					isOneofOne: auctionType
				}
			})
			if (res.status(200).json({ success: true, data })) {
				res.send(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const isGetPaid = async (req, res, next) => {
		const auctionId = req.body.auctionId
		const bidder = req.body.bidder
		try {
			const data = await transactions.update(
				{
					isGetPaid: true
				},
				{
					where: {
						auctionId: auctionId,
						bidder: bidder
					}
				}
			)
			if (res.status(200).json({ success: true, data })) {
				res.send(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const switchBid = async (req, res, next) => {
		const auctionId = req.body.auctionId
		const bidder = req.body.bidder
		try {
			const data = await transactions.update(
				{
					isOneOfOne: false
				},
				{
					where: {
						auctionId: auctionId,
						bidder: bidder
					}
				}
			)
			if (res.status(200).json({ success: true, data })) {
				res.send(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return { createTransaction, getWinner, getTransactionsById, getTransactionsByType, isGetPaid, switchBid }
}
