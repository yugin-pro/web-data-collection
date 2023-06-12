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
        return [ path.join('/api/dev/parallax-template.js'), path.join('/api/v1/tracker.js'), path.join('/api/v1/collect.js')]
    }

    validate() {
       console.log(this.getAvailableApiPathnameList(),this.modulePath   );
       
        if ( this.getAvailableApiPathnameList().indexOf(this.modulePath) > -1) {
            return this
        } else {
            throw new Error(`Not valid path for routing ${this.modulePath}`)
        }
        
    }

    async execute() {
         console.log(this.moduleUrl, this.urlLevelList.slice(2, 4));
        let routeModule = await import(this.moduleUrl)
        routeModule.handling(this.req, this.res, this.app)

    }

}