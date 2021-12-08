// @ts-ignore
import { Tags } from '../database/models'

export const tagsController = () => {
  const createTag = async (req, res, next) => {
    // const nftInfo = req.body;
    const { name } = req.body

    try {
      const data = await Tags.create({
        name: name
      })
      if (res.status(200).json({ success: true, data })) {
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return { createTag }
}
