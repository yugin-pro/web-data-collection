
import LogExtractor from "../../classes/LogExtractor.js";

export function handling(req, res, app) {
    app.log(new LogExtractor(req))
  res.end(app.pixel)
  }