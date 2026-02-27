<?php
/**
 * Plugin Name: VOGO Utils
 * Description: Custom utility functions for VOGO (contact form handler, etc).
 * Version: 1.0
 * Author: VOGO
 */

add_action('wp_ajax_vogo_contact_submit', 'vogo_contact_submit');
add_action('wp_ajax_nopriv_vogo_contact_submit', 'vogo_contact_submit');

function vogo_contact_submit(){
  // log început cerere
  error_log('--- VOGO contact form triggered ---');
  error_log(print_r($_POST, true));

  $requestValue = sanitize_text_field($_POST['requestValue'] ?? '');
  $requestLabel = sanitize_text_field($_POST['requestLabel'] ?? '');
  $email       = sanitize_email($_POST['email'] ?? '');
  $phone       = sanitize_text_field($_POST['phone'] ?? '');
  $detailsHtml = wp_kses_post($_POST['details_html'] ?? '');
  $detailsText = sanitize_textarea_field($_POST['details_text'] ?? '');

$country  = sanitize_text_field($_POST['country'] ?? '');
$city     = sanitize_text_field($_POST['city'] ?? '');
$interest = sanitize_text_field($_POST['interest'] ?? '');  

  if (!is_email($email) || strlen($detailsText) < 50){
    error_log('Validation failed: ' . $email);
    wp_send_json_error('Validation failed', 400);
  }

  $subject = 'Request submitted || ' . $requestLabel;

  ob_start(); ?>
  <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#0f172a">
    <h2 style="color:#0f6d47;margin:0 0 8px 0">Hello,</h2>
    <p>Your request was submitted. Our team will respond within 24 hours.</p>
    <table style="width:100%;border-collapse:collapse;margin-top:10px">
      <tr><td><strong>Request</strong></td><td><?php echo esc_html($requestLabel); ?></td></tr>
      <tr><td><strong>Email</strong></td><td><?php echo esc_html($email); ?></td></tr>
      <tr><td><strong>Phone</strong></td><td><?php echo esc_html($phone); ?></td></tr>
<tr><td><strong>Country</strong></td><td><?php echo esc_html($country ?: '—'); ?></td></tr>
<tr><td><strong>City</strong></td><td><?php echo esc_html($city ?: '—'); ?></td></tr>
<tr><td><strong>Interest</strong></td><td><?php echo esc_html($interest ?: '—'); ?></td></tr>

      <tr><td><strong>Details</strong></td><td><?php echo wp_kses_post($detailsHtml); ?></td></tr>
    </table>
    <p style="margin-top:18px">Kind regards,<br>VOGO Team<br>
      <a href="https://vogo.me" style="color:#0f6d47;text-decoration:none">vogo.me</a> |
      <a href="mailto:info@vogo.family" style="color:#0f6d47;text-decoration:none">info@vogo.family</a>
    </p>
  </div>
  <?php
  $body = ob_get_clean();

  $headers = [
    'Content-Type: text/html; charset=UTF-8',
    'Cc: info@vogo.family',
    'From: VOGO <no-reply@vogo.me>'
  ];

  $sent = wp_mail($email, $subject, $body, $headers);

  if ($sent){
    error_log("Email sent successfully to {$email}");
    wp_send_json_success(['ok'=>true]);
  } else {
    error_log("Mail send failed for {$email}");
    wp_send_json_error('Mail send failed', 500);
  }
}
