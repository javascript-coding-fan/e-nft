import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {}
  transactions.init(
    {
      auctionId: DataTypes.INTEGER,
      bidAmount: DataTypes.FLOAT,
      bidder: DataTypes.STRING,
      isOneOfOne: DataTypes.BOOLEAN,
      isGetPaid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'transactions',
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
  return transactions
}
