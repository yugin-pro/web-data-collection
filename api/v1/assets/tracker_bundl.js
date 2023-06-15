class yproTracker {
  constructor() {
    this.apiUrl = '/web-data-collection/v1/collect'
    this.id = Math.random().toString(16).slice(2) + '.' + Date.now()
  }
  handleEvent(event) {
    this.event(event.type)
  }

  get windowInfo() {
    let winfo = {}
    let prList = ['outerHeight', 'outerWidth']
    prList.forEach(elem => winfo[elem] = window[elem])
    return JSON.stringify(winfo)
  }
  //https://developers.google.com/tag-platform/gtagjs/reference?hl=ru
  event(eventName, eventNameParameters = undefined) {
    if (typeof eventNameParameters == 'object') {
      fetch('/web-data-collection/dev/collect', {
        method: 'POST',
        headers: {
          'X-track-type': eventName,
          'X-track-id': this.id + '.' + Date.now(),
          'X-track-winfo': this.windowInfo,
        },
        body: JSON.stringify(eventNameParameters)
      })
      return
    }
    fetch('/web-data-collection/dev/collect', {
      headers: {
        'X-track-type': eventName,
        'X-track-id': this.id + '.' + Date.now(),
        'X-track-winfo': this.windowInfo,
      }
    })
  }
}

const ypro = new yproTracker()


if (document.readyState == 'complete') {
  // ещё загружается, ждём события
  ypro.event('complete')
} else {
  // DOM готов!
  document.addEventListener('DOMContentLoaded', ypro);

}


 //https://developers.google.com/tag-platform/gtagjs/reference?hl=ru
