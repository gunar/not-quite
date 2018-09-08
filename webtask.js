'use strict'


module.exports = async ({ secrets, headers, storage, query }, req, res) => {
  const { get, set } = storage
  const { DEBUG } = secrets
  const { return_url, email, service } = query

  storage.get((err, data) => {
    if (err) return console.error(err)
    if (! data) data = {}
    if (! data[service]) data[service] = []
    data[service].push(email)
    storage.set(data, err => {
      if (err) return console.log(err)
      if (DEBUG) res.writeHead(200, { 'Content-Type': 'text/plain' })
      else res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(`<h1>Got it! Redirecting...</h1><script>document.setTimeout(() => {document.location='${query.return_url}'}, 1000)</script>`)
    })
  })

}
