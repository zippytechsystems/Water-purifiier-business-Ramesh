<?php
/**
 * Priya's AquaFresh – Lasya Water Purifier
 * System Diagnostics, Server Health & MySQL Status Check
 */

require_once __DIR__ . '/config.php';

$pdo = getDbConnection();
$dbConnected = ($pdo !== null);
$tables = [];

if ($dbConnected) {
    try {
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    } catch (Exception $e) {
        $tables = ['error' => $e->getMessage()];
    }
}

// System Diagnostic Metrics
$diagnostics = [
    'app'                 => "Priya's AquaFresh – Lasya Water Purifier",
    'status'              => 'operational',
    'php_version'         => PHP_VERSION,
    'server_software'     => $_SERVER['SERVER_SOFTWARE'] ?? 'Hostinger Apache / LiteSpeed',
    'server_time'         => date('Y-m-d H:i:s T'),
    'database'            => [
        'connected' => $dbConnected,
        'host'      => $DB_HOST,
        'database'  => $DB_NAME,
        'tables'    => $tables
    ],
    'extensions_loaded'   => [
        'pdo'       => extension_loaded('pdo'),
        'pdo_mysql' => extension_loaded('pdo_mysql'),
        'json'      => extension_loaded('json'),
        'mbstring'  => extension_loaded('mbstring')
    ],
    'writable_log'        => is_writable(__DIR__),
    'endpoints'           => [
        'POST /api/bookings.php'  => 'Create doorstep service booking',
        'GET  /api/bookings.php'  => 'List service bookings',
        'POST /api/enquiries.php' => 'Submit customer enquiry',
        'GET  /api/enquiries.php' => 'List enquiries',
        'POST /api/reviews.php'   => 'Submit customer review & rating',
        'GET  /api/reviews.php'   => 'Retrieve approved customer reviews',
        'GET  /api/health.php'    => 'System diagnostics & MySQL status'
    ]
];

$message = $dbConnected 
    ? 'All systems operational. Hostinger MySQL database connected.' 
    : 'PHP server active and healthy. MySQL database configuration pending in api/config.php (fallback mode active).';

sendJsonResponse('ok', $diagnostics, $message);
