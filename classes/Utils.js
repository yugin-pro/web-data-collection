import {IncomingMessage} from 'http'
import util from 'util'
//const finished = util.promisify(IncomingMessage.complete);

export default class Utils {

    static getCookie(cookie = '', name) {
        let matches = cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}