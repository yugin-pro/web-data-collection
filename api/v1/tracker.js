import { readFileSync } from 'node:fs'
import path from 'node:path';
import LogExtractor from "../../classes/LogExtractor.js";

export function handling(req, res, app) {
        app.log(new LogExtractor(req))
  let data = readFileSync(path.resolve('api/v1/assets/tracker_bundl.js'))
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
          return
  }