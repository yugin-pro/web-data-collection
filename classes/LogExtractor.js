

export default class LogExtractor {
    constructor(req) {
        this.headers = req.headers
        this.date = Date.now()
        this.address = req.socket.address()
        this.url = req.url
        this.trailers = req.trailers
    }
}