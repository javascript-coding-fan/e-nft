import { INPROGRESS_LIST_SUCCESS, INPROGRESS_LIST_FAILURE } from '../constant'
import { FINISHED_LIST_SUCCESS, FINISHED_LIST_FAILURE } from '../constant'

const initialInprogressList = {
  nftList: []
}
const initialFinishedList = {
  nftList: []
}

export function inprogressListReducer(state = initialInprogressList, action: any) {
  switch (action.type) {
    case INPROGRESS_LIST_SUCCESS:
      return {
        ...state,
        nftList: action.payload
      }
    default:
      return state
  }
}

export function finishedListReducer(state = initialFinishedList, action: any) {
  switch (action.type) {
    case FINISHED_LIST_SUCCESS:
      return {
        ...state,
        nftList: action.payload
      }
    default:
      return state
  }
}

