import i18n from 'i18next'
import axios from 'axios'
import { ajaxPost } from '@standardcreative/client-core/src/service.common'
import { Config } from '@standardcreative/common/src/config'

const serverURL = Config.publicRuntimeConfig.apiServer

function eventToMessage(event) {
  if (!event) return ''
  if (event.message) return event.message
  const target = event.target
  if (target) {
    if (event.target.error && event.target.error.message) return target.error.message
    if (event.target.src) return `Failed to load "${target.src}"`
    if (target instanceof XMLHttpRequest) {
      return `Network Error: ${target.status || 'Unknown Status.'} ${
        target.statusText || 'Unknown Error. Possibly a CORS error.'
      }`
    }
    return `Unknown error on ${target}.`
  }
  return `Unknown error: "${JSON.stringify(event)}"`
}

class BaseError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}
// Override the message of an error but append the existing stack trace.
class RethrownError extends BaseError {
  originalError
  constructor(message, error) {
    super(`${message}:\n  Cause:\n    ${eventToMessage(error).replace(/\n/g, '\n    ')}`)
    this.originalError = error
    this.stack += '\n' + error.stack
  }
}

const getToken = (): string => {
  const token = localStorage.getItem(Config.publicRuntimeConfig.feathersStoreKey)

  if (token == null || token.length === 0) {
    throw new Error(i18n.t('editor:errors.notAuthenticated'))
  }

  return token
}

export const getInprogressAuctions = async () => {
	const { data } = await axios.post(`${serverURL}/get-auctions-status`, {
		status: 'InProgress'
	})
	const auctions = data.data
	return auctions
}
export const getFinishedAuctions = async () => {
	const { data } = await axios.post(`${serverURL}/get-auctions-status`, {
		status: 'Finished'
	})
	const auctions = data.data
	return auctions
}

export const getTransactions = async (id: number) => {
	const { data } = await axios.post(`${serverURL}/get-transactions-auctionid`, {
		auctionId: id
	})
	const transactions = data.data
	return transactions
}

export const getEthPrice = async () => {
	const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
	return res
}
export const addnft = async (contractAddress: string, tokenId: string, route: string, displayName: string, imgUrl: string) => {
	const { data } = await axios.post(`${serverURL}/addnft`, {
		contractAddress: contractAddress,
		tokenId: tokenId,
		route: route,
		displayName: displayName,
		imgUrl: imgUrl
	})
	return data.data
}


export const fetchNFT = async (displayName) => {
	const { data } = await axios.post(`${serverURL}/get-onenft`, {
		displayName: displayName
	})
	return data
}

export const getNftData = async () => {
	const { data } = await axios.post(`${serverURL}/getnftdata`, {}, false, false)
	const nftData = data.data
	return nftData
}

export const getWinner = async (id: number) => {
	const { data } = await axios.post(`${serverURL}/get-winner`, {
		auctionId: id
	})
	const res = data
	return res
}

export const switchUpdate = async (id: number, bidder: string) => {
	const { data } = await axios.post(`${serverURL}/switch-bid`, {
		auctionId: id,
		bidder: bidder
	})
	const res = data
	return res
}



