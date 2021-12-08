module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('transactions', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
				autoIncrement: true
			},
			auctionId: {
				type: Sequelize.INTEGER
			},
			bidAmount: {
				type: Sequelize.FLOAT
			},
			bidder: {
				type: Sequelize.STRING,
			},
			isOneOfOne: {
				type: Sequelize.BOOLEAN,
			},
			isGetPaid: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				type: Sequelize.DATE
			},
			updatedAt: {
				type: Sequelize.DATE
			},
			deletedAt: {
				type: Sequelize.DATE,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('transactions')
	}
}
