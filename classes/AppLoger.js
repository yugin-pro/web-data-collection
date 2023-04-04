import { readFileSync } from 'node:fs'
import { appendFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { MongoClient } from 'mongodb'

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
        // const client = new MongoClient(app.config.database.url);
        // const database = client.db(app.config.database.name);
        // const logCollection = database.collection(app.config.database.table);
    }
    get pixel() {
        return Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjuP2f4T8AB20C2vgNEPMAAAAASUVORK5CYII=','base64')
    }
    get port() {
        return this.config.port
    }
}