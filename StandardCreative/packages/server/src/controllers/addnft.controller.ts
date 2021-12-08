// @ts-ignore
import { addnfts } from '../database/models'

export const addnftController = () => {
  const createAddNFT = async (req, res, next) => {
    // const nftInfo = req.body;
    const { contractAddress, tokenId, route, displayName, imgUrl } = req.body

    try {
      const data = await addnfts.create({
        contractAddress: contractAddress,
        tokenId: tokenId,
        route: route,
        displayName: displayName,
        imgUrl: imgUrl
      })
      if (res.status(200).json({ success: true, data })) {
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getNFTData = async (req, res, next) => {
    try {
      const data = await addnfts.findAll()
      res.status(200).json({ success: true, data: data })
    } catch (err) {
      console.log(err)
    }
  }

  const getOneNFT = async (req, res, next) => {
    const displayName = req.body.displayName
    console.log('displayname', displayName)
    try {
      const data = await addnfts.findOne({
        where: {
          displayName: displayName
        }
      })
      console.log('data type', typeof data)
      console.log('data', data)
      res.status(200).json({ success: true, data: data })
    } catch (err) {
      console.log(err)
    }
  }

  return { createAddNFT, getNFTData, getOneNFT }
}
