import { DataTypes, Sequelize } from 'sequelize'
import { Application } from '../../../declarations'

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const Auction = sequelizeClient.define(
    'auction',
    {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
        	primaryKey: true,
			autoIncrement: true,
      	},
      	auctionId: {
        	type: DataTypes.INTEGER,
        	allowNull: false
      	},
		nftContract: {
			type: DataTypes.STRING,
			allowNull: false
		},
		creatorAdress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		creatorShare: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		openEditionPrice: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		minBidIncrement: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false
		},
    },
    {
      hooks: {
        beforeCount(options: any): void {
          options.raw = true
        }
      }
    }
  )

  ;(Auction as any).associate = (models: any): void => {
    ;(Auction as any).belongsTo(models.location, { foreignKey: 'locationId' })
    ;(Auction as any).belongsTo(models.user, { foreignKey: 'userId' })
  }
  return Auction
}
