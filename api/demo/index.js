
import http from 'node:http'
import { readFileSync, existsSync, Dirent } from 'node:fs'
import path from 'node:path'
import { URL } from 'node:url'


export function handling(req, res) {
  let myURL = new URL(req.url,`http://${req.headers.host}`)
  let myPath = path.relative('/', myURL.pathname).replace('web-data-collection\\', '')
  if (path.extname(myPath) === '') {
    myPath = path.join(myPath, 'index.html')
  }
  if (existsSync(myPath)) {
    res.end(readFileSync(myPath))
    return
  }
  res.writeHead(404, { 'Content-Type': 'html' });
  res.end(`<h1>404 no such page</h1>${myPath}`)
  }