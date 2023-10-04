import {IncomingMessage} from 'http'
import util from 'util'
//const finished = util.promisify(IncomingMessage.complete);

export default class LogExtractor {
    constructor(req) {
        this.date = Date.now()
        this.url = req.url
        this.headers = req.headers
        this.address = req.socket.address()
        this.data = {}
    }

    addData(data) {
        const isNotEmpty = (obj) => {

            for (const prop in obj) {
                if (Object.hasOwn(obj, prop)) {
                    return true;
                }
            }
            return false;

        }
        if (typeof data === 'object' && isNotEmpty(data)) {
            this.data = data
        }

    }
}

