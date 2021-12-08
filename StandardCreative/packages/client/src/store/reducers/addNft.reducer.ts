import { ADDNFT_SUCCESS, ADDNFT_FAILURE } from '../constant'
import { NftState } from '../state.types'

const initialState: NftState = {
  data: [],
  error: "",
  isAdded: false
}

export default function nftReducer(state = initialState, action: any) {
  switch (action.type) {
    
    case ADDNFT_SUCCESS:
      return {
        ...state,
        isAdded: true,
        error: ""
      }
    case ADDNFT_FAILURE:
      return {
        ...state,
        isAdded: false,
        error: action.payload.message
      }
    
    default:
      return state
  }
}