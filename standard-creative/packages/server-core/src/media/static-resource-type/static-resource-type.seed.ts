import config from '../../appconfig'

export const staticResourceTypeSeed = {
  path: 'static-resource-type',
  randomize: false,
  templates: [
    { type: 'image' },
    { type: 'video' }, // parse metadata for video staticResourceType (eg 360-eac)
    { type: 'audio' },
    { type: 'model3d' },
    { type: 'script' },
    { type: 'json' }, // JSON data
    { type: 'avatar' }, // User Avatar 3d model
    { type: 'user-thumbnail' }, // User avatar profile thumbnail
    { type: 'data' } // arbitrary data of any other type
  ]
}
