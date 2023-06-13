

export default class LogExtractor {
    constructor(req) {        
        this.date = Date.now()        
        this.url = req.url
        this.headers = req.headers
        this.address = req.socket.address()
    }
}