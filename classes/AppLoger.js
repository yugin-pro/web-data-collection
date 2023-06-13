import { readFileSync } from 'node:fs'
import { appendFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'

const client = createClient({
    host: process.env.CLICKHOUSE_HOST ?? 'http://localhost:8123',
    username: process.env.CLICKHOUSE_USER ?? 'default',
    password: process.env.CLICKHOUSE_PASSWORD ?? '',
  })

export default class AppLoger {
    constructor(path_to_config) {
        if (!AppLoger._instance) {
            this.config = JSON.parse(readFileSync(path_to_config,'utf8'))
            AppLoger._instance = this;
          }
          return AppLoger._instance;
    }
    async log(logData){
        return appendFile('./log/data.json',JSON.stringify(logData)+'\n')
    }
    get pixel() {
        return Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjuP2f4T8AB20C2vgNEPMAAAAASUVORK5CYII=','base64')
    }
    get port() {
        return this.config.port
    }
}