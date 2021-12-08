import { ADDNFT_SUCCESS, GET_NFTS, GET_ONE_NFTS } from '../constant'

export const add_nft = (data: any) => {
  try {
    return {
      type: ADDNFT_SUCCESS,
      payload: data
    }
  } catch (e) {
    console.log('error for request of the add nft')
  }
}

export const get_nftList = (data: any) => {
  return {
    type: GET_NFTS,
    payload: data
  }
}

export const get_onenftList = (data: any) => {
  return {
    type: GET_ONE_NFTS,
    payload: data
  }
}


