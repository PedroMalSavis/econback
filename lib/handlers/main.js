let handlers = {}

handlers.pageNotFound = (data, callback) => {
  callback(404)
}
handlers.sample = (data, callback) => {
  callback(301, {'sample': 'hello world!'})
}

module.exports = handlers
