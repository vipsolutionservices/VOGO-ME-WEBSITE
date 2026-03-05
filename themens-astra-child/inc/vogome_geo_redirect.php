<?php
/**
 * Country-based homepage redirect to Romanian landing page.
 */

/**
 * Resolve visitor country code from validated server sources.
 *
 * @return string Two-letter country code or empty string.
 */
function vogome_get_request_country_code() {
    $server_country_headers = [
        'HTTP_CF_IPCOUNTRY',
        'HTTP_GEOIP_COUNTRY_CODE',
        'GEOIP_COUNTRY_CODE',
        'MM_COUNTRY_CODE',
        'HTTP_X_COUNTRY_CODE',
        'HTTP_X_APPENGINE_COUNTRY',
    ];

    foreach ($server_country_headers as $header_key) {
        if (!empty($_SERVER[$header_key])) {
            return strtoupper(trim((string) $_SERVER[$header_key]));
        }
    }

    if (class_exists('WC_Geolocation')) {
        $customer_ip = WC_Geolocation::get_ip_address();
        $geolocation = WC_Geolocation::geolocate_ip($customer_ip, true, false);

        if (!empty($geolocation['country'])) {
            return strtoupper(trim((string) $geolocation['country']));
        }
    }

    return '';
}

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

    if (vogome_get_request_country_code() !== 'RO') {
        return;
    }

    wp_safe_redirect(home_url('/ro/'), 302);
    exit;
}
add_action('template_redirect', 'vogome_redirect_romanian_traffic_to_ro');
