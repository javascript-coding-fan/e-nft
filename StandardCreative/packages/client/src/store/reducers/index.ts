import { combineReducers } from 'redux'
import userReducer from './user.reducer'
import { getAuctionReducer, getTransactionReducer } from './auction.reducer'
import { inprogressListReducer, finishedListReducer } from './auction.list'
import nftReducer from './addNft.reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  currentAuction: getAuctionReducer,
  inprogressList: inprogressListReducer,
  finishedList: finishedListReducer,
  transactions: getTransactionReducer,
  nftReducer: nftReducer
})
