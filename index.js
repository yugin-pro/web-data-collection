import http from 'node:http'
import { readFileSync  } from 'node:fs'
import { MongoClient } from 'mongodb'

function main() {
  const app = new AppConfigurator()
  const client = new MongoClient(app.config.database.url);
  const database = client.db(app.config.database.name);
  const logCollection = database.collection(app.config.database.table);


  const server = http.createServer((req, res) => {  
          if (req.url.match(/web-data-collection\/tracker\.js/)) {
            let headerLog = new AnalyticalLog(req)
            logCollection.insertOne(headerLog)
            let data = readFileSync('tracker.js')
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
            return
          }
          if (req.url.match(/web-data-collection/)) {
            let headerLog = new AnalyticalLog(req)
            logCollection.insertOne(headerLog)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(headerLog));
            return
          }
          res.writeHead(200, { 'Content-Type': 'html' });
          res.end(readFileSync('tmp.html'))
    });

  server.listen(app.config.port);
}

 
class AnalyticalLog {

  constructor(req) {
      this.headers = req.headers
      this.date = Date.now()
      this.address = req.socket.address()
      this.url = req.url
      this.trailers = req.trailers
  }

}

class AppConfigurator {
  constructor() {
    if (AppConfigurator._instance) {
      return AppConfigurator._instance
    }
    AppConfigurator._instance = this;
  }
  get config() {
    return JSON.parse(readFileSync('app-config.json','utf8'))
  }
}
  
main()