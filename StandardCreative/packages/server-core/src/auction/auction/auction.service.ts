import { Application } from '../../../declarations'
import { Auction } from './auction.class'
import createModel from './auction.model'
import hooks from './auction.hooks'
import docs from './auction.docs'

declare module '../../../declarations' {
  interface ServiceTypes {
    auction: Auction
  }
}

export default (app: Application): void => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  const event = new Auction(options, app)
  event.docs = docs
  app.use('auction', event)

  const service = app.service('auction')

  service.hooks(hooks)
}
