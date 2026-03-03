<?php
/**
 * AJAX handler for enterprise contact section from /ro/index.html.
 */

add_action('wp_ajax_nopriv_vogo_enterprise_contact_submit', 'vogo_enterprise_contact_submit');
add_action('wp_ajax_vogo_enterprise_contact_submit', 'vogo_enterprise_contact_submit');

function vogo_enterprise_contact_submit()
{
    if (!empty($_POST['_ajax_nonce']) && !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['_ajax_nonce'])), 'vogo_contact_nonce')) {
        wp_send_json_error(['error' => 'invalid_nonce', 'error_message' => 'Sesiune expirată. Reîncarcă pagina și încearcă din nou.'], 403);
    }

    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $phone   = sanitize_text_field($_POST['phone'] ?? '');
    $company = sanitize_text_field($_POST['company'] ?? '');
    $project = sanitize_textarea_field($_POST['project'] ?? '');

    if (!$name || !$company || !$phone || !$project || !is_email($email) || wp_strlen($project) < 20) {
        wp_send_json_error(['error' => 'validation_failed', 'error_message' => 'Te rugăm să completezi toate câmpurile obligatorii corect.'], 400);
    }

    $subject = sprintf('Solicitare enterprise VOGO • %s', $company);

    $rows = [
        'Nume' => $name,
        'Email business' => $email,
        'Telefon' => $phone,
        'Companie' => $company,
        'Descriere proiect' => $project,
        'Pagină' => home_url('/ro/#enterprise'),
    ];

    $plain_lines = [];
    foreach ($rows as $label => $value) {
        $plain_lines[] = $label . ': ' . $value;
    }
    $plain_message = implode("\n", $plain_lines) . "\n";

    // Keep headers minimal for maximum compatibility with restrictive hosts.
    $internal_headers = [];
    if (is_email($email)) {
        $internal_headers[] = 'Reply-To: ' . $email;
    }

    $internal_sent = wp_mail('adrian@viptess.com', $subject, $plain_message, $internal_headers);

    if (!$internal_sent) {
        // Secondary fallback recipient used elsewhere in project.
        $internal_sent = wp_mail('adrian@vogo.family', $subject, $plain_message, $internal_headers);
    }

    if (!$internal_sent) {
        error_log('VOGO enterprise contact: internal wp_mail failed.');
        wp_send_json_error([
            'error' => 'mail_failed',
            'error_message' => 'Nu am putut livra solicitarea prin email acum. Te rugăm să ne scrii direct la adrian@vogo.family.',
        ], 500);
    }

    // Best-effort customer confirmation in plain text (no custom From header).
    $confirmation_message =
        "Salut, {$name}!\n\n" .
        "Am primit solicitarea ta pentru VOGO Enterprise și revenim în cel mai scurt timp.\n\n" .
        "Rezumat:\n" .
        $plain_message .
        "\nMulțumim,\nEchipa VOGO\n";

    $business_sent = wp_mail($email, $subject, $confirmation_message);

    wp_send_json_success([
        'ok' => true,
        'message' => 'Solicitarea a fost trimisă cu succes.',
        'business_confirmation_sent' => (bool) $business_sent,
    ]);
}
