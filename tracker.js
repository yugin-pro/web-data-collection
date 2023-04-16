'use strict'
class WebTracker {
  constructor() {
    if (WebTracker._instance) {
      return WebTracker._instance
    }
    WebTracker._instance = this;
    this.id = Math.random().toString(16).slice(2) + '.' + Date.now()
  }

  load() {
    let options = {
      headers: {
        'X-track-type': 'load',
        'X-track-id': this.id + '.' + Date.now() ,
      }
    }
    this.collect(options)
  }

  view(target) {
    let elemPos = window.pageYOffset + target.getBoundingClientRect().bottom
    let windowPos = window.pageYOffset + document.documentElement.clientHeight
    let options = {
      headers: {
        'X-track-type': 'view',
        'X-track-id': this.id + '.' + Date.now() ,
      }
    }
    if (elemPos <= windowPos ) {
      this.collect(options)
    }
    
  }

  interaction() {
    let options = {
      headers: {
        'X-track-type': 'interaction',
        'X-track-id': this.id + '.' + Date.now() ,
      }
    }
    this.collect(options)
  }

  record() {
    let options = {
      headers: {
        'X-track-type': 'interaction',
        'X-track-id': this.id + '.' + Date.now() ,
      }
    }
    this.collect(options)    
  }

  async collect(options) {
    console.log(options)
    let resp = await fetch('/web-data-collection', options)
  }
}

const ypro = new WebTracker()

if (document.readyState == 'complete') {
  // ещё загружается, ждём события
  ypro.load()
  ypro.view(document.querySelector('#view_test'))
} else {
  // DOM готов!
  document.addEventListener('DOMContentLoaded', (() => ypro.load()));
  window.addEventListener('load', (() => {
    ypro.view(document.querySelector('#view_test'))

    window.addEventListener('scroll', function() {
      ypro.view(document.querySelector('#view_test'))
    });

  }));
}

