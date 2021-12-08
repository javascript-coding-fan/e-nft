export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const GET_AUCTION = 'GET_AUCTION'

export const GET_TRANSACTION = 'GET_TRANSACTION'

export const AUCTION_CREATE = 'AUCTION_CREATE'
export interface AuctionData {
  creatorAddress: string
  creatorShare: number
  openEditionPrice: number
  minBidIncrement: number
  duration: number
  durationIncrement: number
  img: string
}
export interface CURRENT_AUCTION {
  nftContract: string
  creatorAddress: string
  creatorShare: number
  openEditionPrice: number
  minBidIncrement: number
  duration: number
  durationIncrement: number
  startTime: number
  topBidAmount: number
  topBidAddress: number
  totalOpenEditionBids: number
  finished: boolean
}

export const INPROGRESS_LIST_SUCCESS = 'INPROGRESS_LIST_SUCCESS'
export const INPROGRESS_LIST_FAILURE = 'INPROGRESS_LIST_FAILURE'

export const FINISHED_LIST_SUCCESS = 'FINISHED_LIST_SUCCESS'
export const FINISHED_LIST_FAILURE = 'FINISHED_LIST_FAILURE'

export const ADDNFT_REQUEST = 'ADDNFT_REQUEST'
export const ADDNFT_SUCCESS = 'ADDNFT_SUCCESS'
export const ADDNFT_FAILURE = 'ADDNFT_FAILURE'

export const GET_NFTS = 'GET_NFTS'
export const GET_ONE_NFTS = 'GET_ONE_NFTS'
