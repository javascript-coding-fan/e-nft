import express from 'express'
import { auctionController, transactionController, addnftController } from '../controllers'

const publicRoutes = express.Router()
publicRoutes.get('/test', (req, res) => {
  res.json({ message: 'Welcome to backend application.' })
})
publicRoutes.post('/create-auction', auctionController().createAuction)
publicRoutes.post('/create-transaction', transactionController().createTransaction)
publicRoutes.post('/update-auction', auctionController().updateAuction)
publicRoutes.post('/get-auction', auctionController().getAuction)
publicRoutes.post('/get-auctions', auctionController().getAuctions)
publicRoutes.post('/get-auctions-status', auctionController().getAuctionsByStatus)
publicRoutes.post('/get-winner', transactionController().getWinner)
publicRoutes.post('/get-transactions-auctionid', transactionController().getTransactionsById)
publicRoutes.post('/get-transactions-auctiontype', transactionController().getTransactionsByType)
publicRoutes.post('/addnft', addnftController().createAddNFT)
publicRoutes.post('/getnftdata', addnftController().getNFTData)
publicRoutes.post('/get-onenft', addnftController().getOneNFT)

publicRoutes.post('/is-get-paid', transactionController().isGetPaid)
publicRoutes.post('/switch-bid', transactionController().switchBid)

export { publicRoutes }
