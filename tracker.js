'use strict'
class WebTracker {
  constructor() {
    if (WebTracker._instance) {
      return WebTracker._instance
    }
    WebTracker._instance = this;
  }

  pageView() {
    let options = {
      headers: {
        'X-track-type': 'page_view'
      }
    }
    this.collect(options)
  }

  screenView() {
    let options = {
      headers: {
        'X-track-type': 'screen_view'
      }
    }
    this.collect(options)
  }

  async collect(options) {
    let resp = await fetch('/web-data-collection', options)
  }
}

const ypro = new WebTracker()

if (document.readyState == 'complete') {
  // ещё загружается, ждём события
  pV();
  sV();
} else {
  // DOM готов!
  document.addEventListener('DOMContentLoaded', pV);
  window.addEventListener('load', sV);
}

function pV() {
  ypro.pageView()
}

function sV() {
  ypro.screenView()
}

