export const AuctionAction = {
  actionProcessing: (processing: boolean) => {
    return {
      type: 'ACTION_PROCESSING' as const,
      processing
    }
  }
}

export type AuctionActionType = ReturnType<typeof AuctionAction[keyof typeof AuctionAction]>