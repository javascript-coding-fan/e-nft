import { ethers } from 'ethers'

export interface AuctionParams {
  nftAddr: string;
  userAddr: string;
  creatorSharePercent: number;
  fixedPriceForOpenEdition: ethers.BigNumber;
  minimumBidIncrementFor1of1: number;
  auctionLength: number;
  auctionIncrementLength: number
}