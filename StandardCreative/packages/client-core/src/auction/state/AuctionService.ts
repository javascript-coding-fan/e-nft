import { client } from '../../feathers'
import { store, useDispatch } from '../../store'
import { AuctionParams } from '@standardcreative/client/src/utils/types'
import { AlertService } from '../../common/state/AlertService'
import { AuctionAction } from './AuctionAction'

export const AuctionService = {
  createAuction: async (auctionParams: AuctionParams) => {
    const dispatch = useDispatch()
    {
      dispatch(AuctionAction.actionProcessing(true))
      client
        .service('create-auction')
        .create({
          ...auctionParams
        })
        .then((res: any) => {
          console.log(res)
          AlertService.dispatchAlertSuccess("Created an auction successfully!")
          
          return Promise.resolve(res)
        })
        .catch((err: any) => {
          console.log(err)
          AlertService.dispatchAlertError(err.message)
        })
        .finally(() => dispatch(AuctionAction.actionProcessing(false)))
    }
  }
}