class yproTracker {
  #apiUrl
  #id
    constructor(configuration) {
      if (!yproTracker._instance) {
        this.apiUrl = '/web-data-collection/v1/collect'
        this.id = this.getTrackerId() || Math.random().toString(16).slice(2)
        this.setCookieId()
        yproTracker._instance = this;
      }
      return yproTracker._instance;

    }
    handleEvent(event) {
       this.event(event.type)
    }
    
    setCookieId() {
      this.setCookie('ypro', this.id, {secure: true, 'max-age': 7776000})
    }

    getTrackerId() {
      return this.getCookie('ypro')
    }

    getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie(name, value, options = {}) {
      options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
      };
    
      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }
    
      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    
      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }
    
      document.cookie = updatedCookie;
    }

    get currentId() {
      return this.id + '.' + Date.now()
    }

    get windowInfo() {
          let browserWindowInfo = {}
          let browserWindowPropsList = ['innerHeight','innerWidth','outerHeight','outerWidth', 'pageXOffset','pageYOffset','scrollX', 'scrollY']
          browserWindowPropsList.forEach(elem => browserWindowInfo[elem] = window[elem])
          browserWindowInfo.statusbar = window.statusbar.visible || undefined
          browserWindowInfo.toolbar = window.toolbar.visible || undefined
          browserWindowInfo.styleMedia = window.styleMedia.visible || undefined
          browserWindowInfo.scrollbars = window.scrollbars.visible || undefined
          browserWindowInfo.personalbar = window.personalbar.visible || undefined
          browserWindowInfo.performance = window.performance.timing
          return JSON.stringify(browserWindowInfo)
      }
    //https://developers.google.com/tag-platform/gtagjs/reference?hl=ru
    event(eventName, eventNameParameters = {} ) {
      fetch(this.apiUrl,{
        method: 'POST',
        headers: {
          'X-track-event': eventName,
          'X-track-id': this.currentId ,
          'X-track-winfo': this.windowInfo ,
        },
        body: JSON.stringify(eventNameParameters)
      })
    }
  }

