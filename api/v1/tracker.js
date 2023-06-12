import { readFileSync } from 'node:fs'


export function handling(req, res, app) {
  let data = readFileSync('tracker.js')
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
          return
  }