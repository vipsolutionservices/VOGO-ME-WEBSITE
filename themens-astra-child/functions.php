<?php
/**
 * Astra Child - forum customizations
 */

/* 1) Cache-bust child CSS */
add_action('wp_enqueue_scripts', function () {
  $css_file = get_stylesheet_directory() . '/style.css';
  $ver = file_exists($css_file) ? filemtime($css_file) : time();

  wp_enqueue_style('astra-child-style', get_stylesheet_uri(), [], $ver);
}, 20);

/* 2) VOGO header injection ONLY on bbPress pages - VALID HTML (BODY) */
add_action('wp_body_open', function () {
  if (!function_exists('is_bbpress') || !is_bbpress()) return;
  echo '<div id="vogo-header"></div>';
}, 1);

add_action('wp_footer', function () {
  if (!function_exists('is_bbpress') || !is_bbpress()) return;
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

/* 3) Topbar on SINGLE TOPIC: Home Forum + Search + Next Topic (same forum) */
add_action('bbp_before_main_content', function () {

  if (!is_singular('topic')) return;
  if (!function_exists('bbp_get_topic_forum_id')) return;

  $home_forum_url = home_url('/forum/');

  $topic_id = get_the_ID();
  $forum_id = bbp_get_topic_forum_id($topic_id);

  $current_date = get_post_field('post_date', $topic_id);

  $q = new WP_Query([
    'post_type'      => 'topic',
    'post_status'    => 'publish',
    'posts_per_page' => 1,
    'orderby'        => 'date',
    'order'          => 'ASC',
    'post_parent'    => (int)$forum_id,
    'date_query'     => [[ 'after' => $current_date, 'inclusive' => false ]],
    'no_found_rows'  => true,
  ]);

  $next_url = ($q->have_posts()) ? get_permalink($q->posts[0]->ID) : '';
  wp_reset_postdata();

  echo '<div class="vogo-topic-topbar">';
    echo '<div class="vogo-topic-topbar-left">';
      echo '<a class="vogo-topic-home" href="' . esc_url($home_forum_url) . '">Home Forum</a>';
    echo '</div>';

    echo '<div class="vogo-topic-topbar-right">';
      ob_start();
      if (function_exists('bbp_get_search_form')) { bbp_get_search_form(); }
      echo ob_get_clean();

      if (!empty($next_url)) {
        echo '<a class="vogo-topic-next" href="' . esc_url($next_url) . '" rel="next">Next Topic</a>';
      }
    echo '</div>';
  echo '</div>';

}, 5);


// Add "Forum home" next to the pagination count (topic + forum pages)
add_filter('bbp_get_topic_pagination_count', function ($count) {
  return $count . ' <a class="vogo-forum-home-link" href="https://vogo.me/forums/">Forum home</a>';
}, 20);

add_filter('bbp_get_forum_pagination_count', function ($count) {
  return $count . ' <a class="vogo-forum-home-link" href="https://vogo.me/forums/">Forum home</a>';
}, 20);

// send email
add_action('wp_ajax_nopriv_vogo_activate_plan', 'vogo_activate_plan_handler');
add_action('wp_ajax_vogo_activate_plan', 'vogo_activate_plan_handler');

function vogo_activate_plan_handler() {

  // Honeypot
  if (!empty($_POST['company_site'])) {
    wp_send_json(['ok' => false, 'error' => 'blocked']);
  }

  // CAPTCHA (server-side)
  $token  = isset($_POST['captcha_token']) ? (string)$_POST['captcha_token'] : '';
  $answer = isset($_POST['captcha_answer']) ? (string)$_POST['captcha_answer'] : '';

  if ($token === '' || $answer === '') {
    wp_send_json(['ok' => false, 'error' => 'captcha_missing']);
  }

  $decoded = base64_decode($token, true);
  if ($decoded === false) {
    wp_send_json(['ok' => false, 'error' => 'captcha_invalid']);
  }

  $parts = explode('|', $decoded);
  if (count($parts) !== 3) {
    wp_send_json(['ok' => false, 'error' => 'captcha_invalid']);
  }

  $expected = intval($parts[2]);
  if (intval($answer) !== $expected) {
    wp_send_json(['ok' => false, 'error' => 'captcha_failed']);
  }

  // Fields (website = text, no URL validation)
  $company_name = sanitize_text_field($_POST['company_name'] ?? '');
  $website      = sanitize_text_field($_POST['website'] ?? '');
  $fiscal_code  = sanitize_text_field($_POST['fiscal_code'] ?? '');
  $phone        = sanitize_text_field($_POST['phone'] ?? '');
  $email        = sanitize_email($_POST['email'] ?? '');
  $special      = sanitize_textarea_field($_POST['special_requests'] ?? '');

  if (!$company_name || !$website || !$fiscal_code || !$phone || !$email) {
    wp_send_json(['ok' => false, 'error' => 'missing_fields']);
  }

  $to = 'adrian@vogo.family';
  $subject = 'VOGO Activate plan request';

  $message =
    "Activate plan request\n".
    "--------------------\n".
    "Company name: {$company_name}\n".
    "Website: {$website}\n".
    "Fiscal code: {$fiscal_code}\n".
    "Phone: {$phone}\n".
    "Email: {$email}\n\n".
    "Special requests:\n".
    ($special ? $special : '-') . "\n";

  $headers = [
    'Content-Type: text/plain; charset=UTF-8',
    'Reply-To: ' . $email,
  ];

  $sent = wp_mail($to, $subject, $message, $headers);

  if (!$sent) {
    wp_send_json(['ok' => false, 'error' => 'mail_failed']);
  }

  wp_send_json(['ok' => true]);
}
