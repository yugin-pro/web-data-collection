import http from 'node:http'
import AppLoger from './classes/AppLoger.js'
import AppConfigurator from './classes/AppConfigurator.js'
import ApiRouter from './classes/ApiRouter.js'
import path from 'node:path'
import { accessSync, constants, readFileSync  } from 'fs'; 

const app = new AppLoger('app-config.json')
const server = http.createServer((req, res) => {

  if (
    req.url.indexOf(app.serverUrlRoot + '/dev') === 0 || 
    req.url.indexOf(app.serverUrlRoot + '/api') === 0
  
  ) {
    try {
      new ApiRouter(req, res, app)
      .validate()
      .execute()
    } catch (error) {
      console.log(error);
      res.statusCode = 404
      res.end()
    }
    return
  } else if ( 
    req.method = 'GET' && req.url.indexOf(app.serverUrlRoot + '/demo') === 0
    ) {
      try {
        let file = path.relative(app.serverUrlRoot, req.url)
        accessSync(file, constants.F_OK)
        res.statusCode = 200
        res.end(readFileSync(file))
        return
      } catch (error) {
        res.statusCode = 404
        res.end(JSON.stringify(error))
        return
      }
  } else if (req.method = 'GET' && req.url  === app.serverUrlRoot ||  req.url  === app.serverUrlRoot + '/') {

    res.writeHead(302, {
      'Location':'/web-data-collection/demo/parallax-template/index.html'
    })
    res.end()
    return
  }
  res.statusCode = 404
  res.end('404')
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(app.port);
