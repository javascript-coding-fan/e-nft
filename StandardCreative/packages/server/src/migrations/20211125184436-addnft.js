'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Addnft', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            contractAddress: {
                type: Sequelize.STRING,
            },
            tokenId: {
                type: Sequelize.STRING,
            },
            route: {
                type: Sequelize.STRING,
            },
            displayName: {
                type: Sequelize.STRING,
                unique: true,
            },
            imgUrl: {
                type: Sequelize.STRING,
            },
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Addnft');
    }
};