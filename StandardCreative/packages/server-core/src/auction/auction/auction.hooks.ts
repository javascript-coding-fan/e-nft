import { HookContext } from '@feathersjs/feathers'
import { disallow } from 'feathers-hooks-common'
import logger from '../../logger'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context: HookContext): Promise<HookContext> => {
        try {
          const command = context.arguments[0]?.command
          const auction = context.result.id
          command.forEach(async (element: any) => {
            await context.app.service('auction').create({
              name: element.name,
              description: element.description,
              auctionId: auction
            })
          })
          return context
        } catch (error) {
          logger.error('AUCTION AFTER CREATE ERROR')
          logger.error(error)
        }
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
} as any
