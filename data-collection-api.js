import http from 'node:http'
import AppLoger from './classes/AppLoger.js'
import AppConfigurator from './classes/AppConfigurator.js'
import ApiRouter from './classes/ApiRouter.js'

const app = new AppLoger('app-config.json')
const server = http.createServer((req, res) => {
  try {
    new ApiRouter(req, res, app)
    .validate()
    .execute()
  } catch (error) {
    console.log(error);
    res.statusCode = 404
    res.end()
  }
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(app.port);
