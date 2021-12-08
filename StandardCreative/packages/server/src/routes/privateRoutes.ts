import { cache } from 'ejs'
import express from 'express'
import { tagsController } from '../controllers'
import * as settings from '../settings'

const privateRoutes = express.Router()

privateRoutes.post('/update-user')

export { privateRoutes }
