<?php
/**
 * Inject VOGO header only on bbPress pages.
 */

add_action('wp_body_open', function () {
    if (!function_exists('is_bbpress') || !is_bbpress()) {
        return;
    }

    echo '<div id="vogo-header"></div>';
}, 1);

add_action('wp_footer', function () {
    if (!function_exists('is_bbpress') || !is_bbpress()) {
        return;
    }
    ?>
    <script>
    (function(){
      var host = document.getElementById('vogo-header');
      if(!host || host.dataset.loaded) return;

      fetch('/wp-content/uploads/vogo-header.html', { cache: 'no-store' })
        .then(function(r){ return r.text(); })
        .then(function(html){
          host.innerHTML = html;
          host.dataset.loaded = '1';

          host.querySelectorAll('script').forEach(function(s){
            var n = document.createElement('script');
            if (s.src) { n.src = s.src; }
            else { n.textContent = s.textContent; }
            document.body.appendChild(n);
            s.remove();
          });
        })
        .catch(function(){});
    })();
    </script>
    <?php
}, 99);
