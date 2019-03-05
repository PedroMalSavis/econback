const http = require('http')
const url = require('url')
const {StringDecoder} = require('string_decoder')

console.log({...stringDecoder})
const server = http.createServer((req, res) => {
  //parse the url
  const parseurl = url.parse(req.url, true)
  const pathname = parseurl.pathname.replace(/^\/+|\/+$/g, '')
  //get its method
  const method = req.method.toLowerCase()
  //get its query
  const queryString = req.pathname.query
  //get its headers
  const headers = req.headers
  //get payload
  let buff = ''
  const pay = new StringDecoder('utf8')
  res.on('data', (data) => {
    buff += pay.write(data)
  })
  res.on('end', () => {
    buff += pay.end()

    //route handling 
    const chosenroute = typeof(router[pathname]) !== 'undefind' ? router[pathname] : handlers.pageNotFound

    chosenroute(data, (statusCode, payload)) => {

    }

  })
})

server.listen(3000, ()=>{
  console.log('server is listening to 3000')
})
