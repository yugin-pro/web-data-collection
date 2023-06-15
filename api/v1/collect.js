
import LogExtractor from "../../classes/LogExtractor.js";


export async function handling(req, res, app) {

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
      }
      res.end(app.pixel)
    });
  } else {
    res.end(app.pixel)
    return
  }
}