import { readFileSync } from 'node:fs'
import LogExtractor from "../../classes/LogExtractor.js";


export function handling(req, res, app) {
        app.log(new LogExtractor(req))
  let data = readFileSync('tracker.js')
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
          return
  }