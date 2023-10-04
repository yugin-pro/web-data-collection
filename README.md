# web-data-collection

url decoding

/[web data collection server path]/[api version]/[method name]


# install
<!-- Yugin-pro tracker -->
<script src="/web-data-collection/tracker.js"></script>
<noscript><div><img src="/web-data-collection/params?noscript=1" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- Yugin-pro tracker -->

# start

const ypro = new yproTracker()


if (document.readyState == 'complete') {
  // ещё загружается, ждём события
  ypro.event('complete')
} else {
  // DOM готов!
  document.addEventListener('DOMContentLoaded', ypro);

}

