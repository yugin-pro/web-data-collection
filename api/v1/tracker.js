import { readFileSync } from 'node:fs'
import path from 'node:path';
import LogExtractor from "../../classes/LogExtractor.js";
import Utils from "../../classes/Utils.js";

export function handling(req, res, app) {
        
  let cookieId = Utils.getCookie( req.headers.cookie, 'ypro') || Math.random().toString(16).slice(2)
  let cookieArray = ['ypro=' + cookieId + '; path=/; max-age=' + app.cookieSessionTimeout]
  res.setHeader('Set-Cookie', cookieArray)


  app.log(new LogExtractor(req))
  let data = readFileSync(path.resolve('api/v1/assets/tracker_bundl.js'))
          res.writeHead(200, { 'Content-Type': 'application/javascript' });
          res.end(data);
          return
  }