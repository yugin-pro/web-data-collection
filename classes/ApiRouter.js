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
        return path.join('/api/', this.urlLevelList.slice(2, 4).join('/') +  '.js')
    }

    get moduleUrl() {
        return '../api/' + this.urlLevelList.slice(2, 4).join('/') +  '.js'
    }

    getAvailableApiPathnameList() {
        return this.app.apiUrlList.map(url => path.join(url))
    }

    validate() {
       
        if ( this.getAvailableApiPathnameList().indexOf(this.modulePath) > -1) {
            return this
        } else {
            throw new Error(`Not valid path for routing ${this.modulePath}`)
        }
        
    }

    async execute() {
        let routeModule = await import(this.moduleUrl)
        routeModule.handling(this.req, this.res, this.app)

    }

}