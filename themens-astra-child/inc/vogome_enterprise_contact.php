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
        'Nume'           => $name,
        'Email business' => $email,
        'Telefon'        => $phone,
        'Companie'       => $company,
        'Descriere proiect' => nl2br(esc_html($project)),
    ];

    ob_start();
    ?>
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.55;color:#0f172a;background:#f8fafc;padding:18px;">
      <table role="presentation" style="max-width:720px;width:100%;margin:0 auto;background:#ffffff;border:1px solid #d7e2ea;border-radius:12px;border-collapse:separate;overflow:hidden;">
        <tr>
          <td style="background:linear-gradient(90deg,#0f7b65,#0f6d47);padding:16px 18px;color:#fff;">
            <h2 style="margin:0;font-size:20px;">Solicitare nouă • VOGO Enterprise</h2>
            <p style="margin:6px 0 0;opacity:.92;">Formular transmis din pagina /ro/vogo-products/</p>
          </td>
        </tr>
        <tr>
          <td style="padding:18px;">
            <table role="presentation" style="width:100%;border-collapse:collapse;">
              <?php foreach ($rows as $label => $value): ?>
                <tr>
                  <td style="width:200px;padding:10px;border-bottom:1px solid #edf2f7;font-weight:700;color:#0f6d47;vertical-align:top;"><?php echo esc_html($label); ?></td>
                  <td style="padding:10px;border-bottom:1px solid #edf2f7;vertical-align:top;"><?php echo wp_kses_post($value); ?></td>
                </tr>
              <?php endforeach; ?>
            </table>
            <p style="margin:14px 0 0;color:#64748b;font-size:12px;">Acest mesaj a fost trimis automat din formularul de contact enterprise VOGO.</p>
          </td>
        </tr>
      </table>
    </div>
    <?php
    $message = ob_get_clean();

    $headers = [
        'Content-Type: text/html; charset=UTF-8',
        'From: VOGO <no-reply@vogo.me>',
        'Reply-To: ' . $name . ' <' . $email . '>',
    ];

    $internal_sent = wp_mail('adrian@viptess.com', $subject, $message, $headers);
    $business_sent = wp_mail($email, $subject, $message, $headers);

    if (!$internal_sent || !$business_sent) {
        wp_send_json_error(['error' => 'mail_failed', 'error_message' => 'Eroare la trimiterea emailului. Te rugăm să încerci din nou.'], 500);
    }

    wp_send_json_success(['ok' => true, 'message' => 'Email trimis cu succes.']);
}
