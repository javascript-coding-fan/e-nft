export interface RootState {
  user: User
  finishedAuction: BidHistoryType
  nftReducer: NftState
}

export interface AuctionType {
  id: number
  nftId: string
  name: string
  createdTime: number
}

export interface AuctionHistoryType {
  id: number
  nftId: string
  name: string
  createdTime: number
  bidHistory: BidRecordType[]
}
export interface BidRecordType {
  id: number
  bidder: string
  amount: number
  bidTime: number
}
export interface BidHistoryType {
  bidHistory: BidRecordType[]
}

export interface User {
  walletConnected: boolean
  userAddress: string
  network: string
  ethBalance: number
}

export interface InprogressListType {
  inprogressList: NftList
}

export interface FinishedListType {
  finishedList: NftList
}
export interface NftList {
  nftList: NFTType[]
}

export interface NFTType {
  auctionId: number
  nftAddress: string
  creatorAddress: string
  creatorShare: number
  openEditionPrice: number
  minBidIncrement: number
  duration: number
  durationIncrement: number
}

export interface NftData {
  id?: number;
  contractAddress: string;
  tokenId: string;
  route: string;
  displayName: string;
  imgUrl: string;
}

export interface NftState {
  data: NftData[];
  isAdded: boolean;
  error: string;  
}
