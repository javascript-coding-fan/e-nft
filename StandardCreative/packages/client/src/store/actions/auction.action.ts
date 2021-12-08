import {
  AUCTION_CREATE,
  GET_AUCTION,
  AuctionData,
  CURRENT_AUCTION,
  FINISHED_AUCTIONN_SUCCESS,
	FINISHED_AUCTIONN_FAILURE,
  GET_TRANSACTION
} from '../constant'
import axios from 'axios'
import { BidHistoryType } from '../state.types'

const APP_URL = 'localhost:9000'

export const auction_create = (auctionData: AuctionData) => {
  return {
    type: AUCTION_CREATE,
    payload: auctionData
  }
}
export const get_auction = (auctionData: CURRENT_AUCTION) => {
  return {
    type: GET_AUCTION,
    payload: auctionData
  }
}
export const get_transactions = (transaction: BidHistoryType) => {
    return {
      type: GET_TRANSACTION,
      payload: transaction
    }
}
