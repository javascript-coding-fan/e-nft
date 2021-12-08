import { RootState } from './state.types'
import { InprogressListType } from './state.types'
import { FinishedListType } from './state.types'
import { BidHistoryType } from './state.types'

export const finishedAuctionHistory = (state: RootState) => state.finishedAuction ? state.finishedAuction.bidHistory : []
export const inprogressAuctionList = (state: InprogressListType) => state.inprogressList.nftList
export const finishedAuctionList = (state: FinishedListType) => state.finishedList.nftList
export const selectNfts = (state: RootState) => state.nftReducer.data;

