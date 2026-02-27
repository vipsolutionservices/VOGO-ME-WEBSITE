<?php
/**
 * AJAX handler for activate-plan contact flow.
 */

add_action('wp_ajax_nopriv_vogo_activate_plan', 'vogo_activate_plan_handler');
add_action('wp_ajax_vogo_activate_plan', 'vogo_activate_plan_handler');

function vogo_activate_plan_handler()
{
    if (!empty($_POST['company_site'])) {
        wp_send_json(['ok' => false, 'error' => 'blocked']);
    }

    $token  = isset($_POST['captcha_token']) ? (string) $_POST['captcha_token'] : '';
    $answer = isset($_POST['captcha_answer']) ? (string) $_POST['captcha_answer'] : '';

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

    $expected = (int) $parts[2];
    if ((int) $answer !== $expected) {
        wp_send_json(['ok' => false, 'error' => 'captcha_failed']);
    }

    $company_name = sanitize_text_field($_POST['company_name'] ?? '');
    $website      = sanitize_text_field($_POST['website'] ?? '');
    $fiscal_code  = sanitize_text_field($_POST['fiscal_code'] ?? '');
    $phone        = sanitize_text_field($_POST['phone'] ?? '');
    $email        = sanitize_email($_POST['email'] ?? '');
    $special      = sanitize_textarea_field($_POST['special_requests'] ?? '');

    if (!$company_name || !$website || !$fiscal_code || !$phone || !$email) {
        wp_send_json(['ok' => false, 'error' => 'missing_fields']);
    }

    $to      = 'adrian@vogo.family';
    $subject = 'VOGO Activate plan request';

    $message =
        "Activate plan request\n" .
        "--------------------\n" .
        "Company name: {$company_name}\n" .
        "Website: {$website}\n" .
        "Fiscal code: {$fiscal_code}\n" .
        "Phone: {$phone}\n" .
        "Email: {$email}\n\n" .
        "Special requests:\n" .
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
