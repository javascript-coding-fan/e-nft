import { GET_AUCTION, GET_TRANSACTION } from '../constant'

const initialState = {
  bidHistory: [
  ]
}
export const getAuctionReducer = (state: any = null, action: any) => {

  switch (action.type) {
    case GET_AUCTION:
      return {
        ...state,
        auction: action.payload
      }
    default:
      return state
  }
}
export const getTransactionReducer = (state: any = null, action: any) => {

  switch (action.type) {
    case GET_TRANSACTION:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}
