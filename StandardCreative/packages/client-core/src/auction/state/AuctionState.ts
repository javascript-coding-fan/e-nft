import { createState, DevTools, useState, none, Downgraded } from '@hookstate/core'
import { AuctionActionType } from './AuctionAction'
const state = createState({
  isProcessing: false,
  createdAuction: false,
  error: '',
})

export const receptor = (action: AuctionActionType): void => {
  state.batch((s) => {
    switch (action.type) {
      case 'ACTION_PROCESSING':
        return s.merge({ isProcessing: action.processing, error: '' })
    }
  }, action.type)
}

export const useAuctionState = () => useState(state) as any as typeof state as typeof state