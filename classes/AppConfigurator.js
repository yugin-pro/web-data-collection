import { writeFile } from 'node:fs/promises'

export default class AppConfigurator {
    constructor() {
      if (AppConfigurator._instance) {
        return AppConfigurator._instance
      }
      AppConfigurator._instance = this;
    }
    get config() {
      return JSON.parse(readFileSync('app-config.json','utf8'))
    }
    saveConfig() {
        return writeFile(this.path)
    }
  }