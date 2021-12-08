/* eslint-disable global-require */
import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize' // @ts-ignore
import envConfigs from '../config/config'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = envConfigs[env]
const db = {}

let sequelize
if (config.url) {
  sequelize = new Sequelize(config.url, config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts')
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    // @ts-ignore
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)

    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})
// @ts-ignore
db.sequelize = sequelize // @ts-ignore
db.Sequelize = Sequelize

module.exports = db
