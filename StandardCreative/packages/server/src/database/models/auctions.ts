import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class auctions extends Model {}
  auctions.init(
    {
      auctionId: DataTypes.INTEGER,
      nftContract: DataTypes.STRING,
      creatorAddress: DataTypes.STRING,
      creatorShare: DataTypes.FLOAT,
      openEditionPrice: DataTypes.FLOAT,
      minBidIncrement: DataTypes.FLOAT,
      duration: DataTypes.INTEGER,
      durationIncrement: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'auctions',
      paranoid: true, // @ts-ignore
      timestamp: true,
      indexes: [
        {
          unique: true,
          fields: ['auctionId']
        }
      ]
    }
  )
  return auctions
}
