import http from 'node:http'
import { readFileSync  } from 'node:fs'
import { MongoClient } from 'mongodb'

function main() {
  const app = new AppConfigurator()
  const client = new MongoClient(app.config.database.url);
  const database = client.db("raw_analytics");
  const logCollection = database.collection("log");


  const server = http.createServer((req, res) => {  
          if (req.url.match(/web-data-collection/)) {
            let headerLog = new AnalyticalLog(req)
            logCollection.insertOne(headerLog)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(headerLog));
          }
          res.end()
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