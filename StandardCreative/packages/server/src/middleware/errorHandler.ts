import jwt from 'jsonwebtoken'

import { logger } from '../utils'
import { errorCodes } from '../constants/errors'

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  logger.info(err)
  const errorBody = { code: err.status, message: err.message }

  // process JWT token error
  if (err instanceof jwt.JsonWebTokenError) {
    errorBody.code = errorCodes.AUTH_FAILED
  }

  // process validation(express-validator) error
  if (err.errors && err.errors.length > 0) {
    if (err.errors[0].msg) {
      const uniqueErrors = err.errors.filter(
        (elem, pos) => pos === err.errors.findIndex((value) => value.param === elem.param)
      )

      errorBody.code = errorCodes.INPUT_VALIDATION_FAILED
      // @ts-ignore
      errorBody.errors = uniqueErrors
    }
  }
  res.status(200)
  res.json({ error: errorBody, success: false })
}
