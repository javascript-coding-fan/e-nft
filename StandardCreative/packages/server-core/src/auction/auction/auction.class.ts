import { Service, SequelizeServiceOptions } from 'feathers-sequelize'
import { Application } from '../../../declarations'
import { Params } from '@feathersjs/feathers'
export class Auction extends Service {
  app: Application
  docs: any

  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  async find(params: Params): Promise<any> {
    const auctions = await (this.app.service('auction') as any).Model.findAll({
    })
    return {
      data: auctions
    }
  }
}
