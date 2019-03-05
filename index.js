const http = require('http')
const url = require('url')
const stringDecoder = require('string_decoder').StringDecoder

//local libraries
const handlers = require('./lib/handlers/main')

http.createServer((req, res) => {
  unisonServer(req, res)
}).listen(3000, ()=>{
  console.log('server is listening to 3000')
})



const unisonServer = (req, res) => {
  //instance for data, headers, and method handling
  const parseURL = url.parse(req.url, true)
  const path = parseURL.pathname
  const trimpath = path.replace(/^\/+|\/+$/g, '')
  const queryStringObj = parseURL.query
  const method = req.method.toLowerCase()
  const headers = req.headers
  const decoder = new stringDecoder('utf-8')

  //instance for handling body-data
  let buffer = ''

  //request for data
  req.on('data', (data) => {
    buffer += decoder.write(data)
  })

  //request for end
  req.on('end', () => {
    buffer += decoder.end()
    const chosenHandler = typeof(router[trimpath]) !== 'undefined' ? router[trimpath] : handlers.pageNotFound
    const data = {
      trimpath,
      method,
      queryStringObj,
      headers,
      'payload': buffer
    }

    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200
      payload = typeof(payload) == 'object' ? payload : {}
      const payloadString = JSON.stringify(payload)
      res.setHeader('Content-type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)
      console.log('return this response', statusCode, payloadString)
    })
  })
}

const router = {
  'sample' : handlers.sample
}
