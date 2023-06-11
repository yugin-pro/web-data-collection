'use strict'
class WebTracker {
  constructor() {
    if (WebTracker._instance) {
      return WebTracker._instance
    }
    WebTracker._instance = this;
    this.id = Math.random().toString(16).slice(2) + '.' + Date.now()
    this.limit = 1
    this.trackedElement = []
  }

  handleEvent(event) {
    event.type === 'DOMContentLoaded' ? this.init() : undefined
    event.type === 'scroll' ? this.view(document.body.children) : undefined
    event.type === 'click' ? this.interaction(event) : undefined
    //console.log(event);
  }

  init() {
    let options = {
      headers: {
        'X-track-type': 'init',
        'X-track-id': this.id + '.' + Date.now() ,
      }
    }
    this.collect(options)
  }

  view(htmlCollection) {

    for (let node of htmlCollection) {
      if (this.trackedElement.indexOf(node) >= 0) {
        // console.log(node);
        return undefined
      } 
      let elemTop = window.pageYOffset + node.getBoundingClientRect().top
      let elemBottom = window.pageYOffset + node.getBoundingClientRect().bottom
      let windowTop = window.pageYOffset + document.documentElement.clientTop
      let windowBottom = window.pageYOffset + document.documentElement.clientHeight
      let options = {
        headers: {
          'X-track-type': 'view',
          'X-track-id': this.id + '.' + Date.now(),
        }
      }
      if ( elemBottom <= windowBottom) {
        //this.collect(options)
        this.trackedElement.push(node)
        console.log(node);
      }
      return undefined
    }
  }

  interaction(event) {
    let options = {
      headers: {
        'X-track-type': 'interaction' + '_' + event.type,
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
  ypro.init()
  ypro.view(document.querySelector('#view_test'))
  document.addEventListener('click', ypro);
} else {
  // DOM готов!
  document.addEventListener('DOMContentLoaded', ypro);
  document.addEventListener('scroll', ypro);
  document.addEventListener('click', ypro);
//   window.addEventListener('load', (() => {
//     ypro.view(document.querySelector('#view_test'))

//     window.addEventListener('scroll', function() {
//       ypro.view(document.querySelector('#view_test'))
//     });

//   }));
}

