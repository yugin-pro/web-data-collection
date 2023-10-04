
import LogExtractor from "../../classes/LogExtractor.js";
import Utils from "../../classes/Utils.js";


export async function handling(req, res, app) {
  let cookieId = Utils.getCookie( req.headers.cookie, 'ypro') || Math.random().toString(16).slice(2)
  let cookieArray = ['ypro=' + cookieId + '; path=/; max-age=' + app.cookieSessionTimeout]
  res.setHeader('Set-Cookie', cookieArray)


  if (req.method === 'GET') {
    app.log(new LogExtractor(req))    
    res.end(app.pixel)
    return
  } else if (req.method === 'POST') {
    const parsedLog = new LogExtractor(req)
    let rawData = '';

    req.on('data', (chunk) => { rawData += chunk; });
    req.on('end', () => {   
      try {
        parsedLog.addData(JSON.parse(rawData));
        app.log(parsedLog)
      } catch (e) {
        res.end(e.message);
        return
      }
      res.end(app.pixel)
    });
  } else {
    res.end(app.pixel)
    return
  }
}


