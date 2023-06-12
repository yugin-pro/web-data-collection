import http from 'node:http'
import { readFileSync, existsSync, Dirent } from 'node:fs'
import path from 'node:path'
import { URL } from 'node:url'
import AppLoger from './classes/AppLoger.js'
import LogExtractor from './classes/LogExtractor.js'
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
/*

const app = new AppLoger('app-config.json')
const server = http.createServer((req, res) => {  
        if (req.url.match(/tracker\.js/)) {
          app.log(new LogExtractor(req))

          let data = readFileSync('tracker.js')
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
          return
        }
        if (req.url.match(/web-data-collection/)) {
          app.log(new LogExtractor(req))
          res.end(app.pixel);
          return
        }
        if (req.url.match(/web-data-collection\/config/)) {
          new AppConfigurator()
          res.end(app.pixel);
          return
        }

        let myURL = new URL(req.url,`http://${req.headers.host}`)
        let myPath = path.relative('/', myURL.pathname)
        if (path.extname(myPath) === '') {
          myPath = path.join(myPath, 'index.html')
        }
        if (existsSync(myPath)) {
          res.end(readFileSync(myPath))
          return
        }
        res.writeHead(404, { 'Content-Type': 'html' });
        res.end(`<h1>404 no such page</h1>`)

  });

server.listen(app.port);

*/