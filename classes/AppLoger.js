import { readFileSync } from 'node:fs'
import { appendFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'
import { createClient } from '@clickhouse/client'
import { randomUUID } from 'crypto'

export default class AppLoger {
    constructor(path_to_config) {
        if (!AppLoger._instance) {
            this.config = JSON.parse(readFileSync(path_to_config,'utf8'))
            this.createClickhouseClient()
            AppLoger._instance = this;
          }
          return AppLoger._instance;
    }
    async log(logData){
        this.insert(logData)
        return appendFile('./log/data.json',JSON.stringify(logData)+'\n')
    }
    get pixel() {
        return Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjuP2f4T8AB20C2vgNEPMAAAAASUVORK5CYII=','base64')
    }
    get port() {
        return this.config.port
    }
    get clickhouse() {
        return this.config.clickhouse
    }
    get apiUrlList() {
        return this.config.apiUrlList
    }
    get serverUrlRoot() {
        return this.config.serverUrlRoot
    }
        
    createClickhouseClient() {
        this.clickhouseClient =  createClient({
            host: this.clickhouse.HOST ?? 'http://localhost:8123',
            username: this.clickhouse.USER ?? 'default',
            password: this.clickhouse.PASSWORD ?? '',
          })
        
    }

    insert(js_object, tableName = this.clickhouse.TABLE) {
        this.clickhouseClient.insert({
            table: tableName,
            // structure should match the desired format, JSONEachRow in this example
            values: [
                [
                    js_object, randomUUID(), Date.now()
                ]
            ],
            //format: 'JSONEachRow',
          })
    }
    insertStream(stream, tableName = this.clickhouse.TABLE) {
        this.clickhouseClient.insert({
            table: tableName,
            values: stream,
            format: 'JSONEachRow',
          })
    }
}