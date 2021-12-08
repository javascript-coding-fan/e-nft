module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('auctions', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true
			},
			auctionId: {
				type: Sequelize.INTEGER,
				unique: true
			},
			nftContract: {
				type: Sequelize.STRING
			},
			creatorAddress: {
				type: Sequelize.STRING
			},
			creatorShare: {
				type: Sequelize.FLOAT
			},
			openEditionPrice: {
				type: Sequelize.FLOAT
			},
			minBidIncrement: {
				type: Sequelize.FLOAT
			},
			duration: {
				type: Sequelize.INTEGER
			},
			durationIncrement: {
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.STRING
			},
			createdAt: {
				type: Sequelize.DATE
			},
			updatedAt: {
				type: Sequelize.DATE
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				unique: false
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('auctions')
	}
}
