import { auctionCreated, createBid, auctionFinished } from './eventListeners'

export const handleListener = () => {
  return {
    auctionCreated,
    createBid,
    auctionFinished
  }
}
