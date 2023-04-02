import http from 'node:http'
import { readFileSync } from 'node:fs'
import AppLoger from './classes/AppLoger.js'
import LogExtractor from './classes/LogExtractor.js';
import AppConfigurator from './classes/AppConfigurator.js';


const app = new AppLoger('app-config.json')
const server = http.createServer((req, res) => {  
        if (req.url.match(/web-data-collection\/tracker\.js/)) {
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
        res.writeHead(200, { 'Content-Type': 'html' });
        res.end(readFileSync('tmp.html'))
  });

server.listen(app.port);

  
