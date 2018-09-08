'use strict'

module.exports = ({ body, secrets, storage }, cb) => {
  const { get, set } = storage
  const { DEBUG } = secrets
  // TODO: match referer to make sure this service isn't DDoS'ed

  const { return_url, email, service } = body

  storage.get((err, data) => {
    if (err) return console.error(err)
    if (! data) data = {}
    if (! data[service]) data[service] = []
    data[service].push(email)
    storage.set(data, err => {
      if (err) return console.log(err)
      cb(DEBUG, 'Got it!')
    })
  })
}
