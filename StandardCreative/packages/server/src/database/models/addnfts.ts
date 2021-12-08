import { Model } from 'sequelize'

module.exports = (sequelize, DataTypes) => {
  class addnfts extends Model {
  }
  addnfts.init(
    {
      contractAddress: DataTypes.STRING,
      tokenId: DataTypes.STRING,
      route: DataTypes.STRING,
      displayName: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'addnfts',
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          fields: ['tokenId'],
        },
      ],
    }
  );
  return addnfts;
};