import { INPROGRESS_LIST_SUCCESS, INPROGRESS_LIST_FAILURE, FINISHED_LIST_SUCCESS, FINISHED_LIST_FAILURE } from '../constant'

export const getInprogressAuctionList = (data: any) => {
  try {
    return {
      type: INPROGRESS_LIST_SUCCESS,
      payload: data
    }
  } catch (e) {
    console.log('error for request of the inprogress auction list')
  }
}

export const getFinishedAuctionList = (data: any) => {
  try {
    return {
      type: FINISHED_LIST_SUCCESS,
      payload: data
    }
  } catch (e) {
    console.log('error for request of the finished auction list')
  }
}
