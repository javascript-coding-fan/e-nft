export default {
  definitions: {
    auction: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: ''
        },
        locationId: {
          type: 'string',
          description: ''
        },
        userId: {
          type: 'string'
        }
      }
    },
    auction_list: {
      type: 'array',
      items: { $ref: '#/definitions/auction' }
    }
  }
  // securities: ['create', 'update', 'patch', 'remove'],
  // operations: {
  //   find: {
  //     security: [
  //       { bearer: [] }
  //     ]
  //   }
  // }
}
