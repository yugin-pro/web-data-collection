import path from 'node:path'

export default class ApiRouter {
    constructor(req, res, app) {
        this.requestURL = new URL(req.url,`http://${req.headers.host}`)
        this.req = req
        this.res = res
        this.app = app
    }
    get urlLevelList() {
        return this.requestURL.pathname.split('/')
    }

    get urlFirstLevel() {
        return this.urlLevelList[0]
    }

    get modulePath() {
        return path.join('api/', this.urlLevelList.slice(2, 4).join('/') +  '.js')
    }

    validate() {
        let chekSettingsPath = (this.app.config.serverPathSetting === this.urlFirstLevel)
        let checkPathLevelCount = (this.urlLevelList.length >= 2)
        if ( checkPathLevelCount) {
            return this
        } else {
            throw new Error(`Not valid path for routing: chekSettingsPath ${chekSettingsPath} and checkPathLevelCount ${checkPathLevelCount}`)
        }
        
    }

    async execute() {
        // console.log(this.modulePath, this.urlLevelList.slice(2, 4));
    let module = await import( '../'+ this.modulePath)
    module.parse(this.req, this.res)

    }

}