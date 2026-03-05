<?php
/**
 * Country-based homepage redirect to Romanian landing page.
 */

/**
 * Redirect root requests from Romanian IPs to /ro.
 */
function vogome_redirect_romanian_traffic_to_ro() {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST)) {
        return;
    }

    $request_uri = isset($_SERVER['REQUEST_URI']) ? (string) $_SERVER['REQUEST_URI'] : '';
    $request_path = parse_url($request_uri, PHP_URL_PATH);

    if (!is_string($request_path) || ($request_path !== '/' && $request_path !== '')) {
        return;
    }

    $country_sources = [
        isset($_SERVER['HTTP_CF_IPCOUNTRY']) ? $_SERVER['HTTP_CF_IPCOUNTRY'] : '',
        isset($_SERVER['GEOIP_COUNTRY_CODE']) ? $_SERVER['GEOIP_COUNTRY_CODE'] : '',
        isset($_SERVER['HTTP_X_COUNTRY_CODE']) ? $_SERVER['HTTP_X_COUNTRY_CODE'] : '',
    ];

    foreach ($country_sources as $country_code) {
        if (strtoupper(trim((string) $country_code)) === 'RO') {
            wp_safe_redirect(home_url('/ro/'), 302);
            exit;
        }
    }
}
add_action('template_redirect', 'vogome_redirect_romanian_traffic_to_ro');
