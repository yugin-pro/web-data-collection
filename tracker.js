'use strict'

if (document.readyState == 'complete') {
  // ещё загружается, ждём события
  work();
} else {
  // DOM готов!
  document.addEventListener('DOMContentLoaded', work);
  
}

async function work() { 
    
    let options = {
        headers: {
            'X-track-type': 'page_view'
        }
    }
    let resp = await fetch('/web-data-collection', options)
}