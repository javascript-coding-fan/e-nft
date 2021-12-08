// import * as dotenv from 'dotenv'
// dotenv.config({ path: __dirname + './env' })
require('dotenv').config()

module.exports = {
	development: {
		url: process.env.TEST_DATABASE_URL,
		dialect: 'mysql'
	},
	test: {
		url: process.env.TEST_DATABASE_URL,
		dialect: 'mysql'
	},
	staging: {
		url: process.env.TEST_DATABASE_URL,
		dialect: 'mysql'
	},
	production: {
		url: process.env.DATABASE_URL,
		dialect: 'mysql'
	}
}
