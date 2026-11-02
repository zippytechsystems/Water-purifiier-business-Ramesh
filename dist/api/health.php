<?php
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

sendJsonResponse('ok', [
    'app'          => "Priya's AquaFresh – Lasya Water Purifier",
    'php_version'  => PHP_VERSION,
    'server_time'  => date('Y-m-d H:i:s T'),
    'db_connected' => $dbConnected,
    'db_tables'    => $tables,
    'endpoints'    => [
        'POST /api/bookings.php'  => 'Create doorstep service booking',
        'GET  /api/bookings.php'  => 'List service bookings',
        'POST /api/enquiries.php' => 'Submit customer enquiry',
        'GET  /api/enquiries.php' => 'List enquiries',
        'POST /api/reviews.php'   => 'Submit customer review & rating',
        'GET  /api/reviews.php'   => 'Retrieve approved customer reviews',
        'GET  /api/health.php'    => 'System diagnostics & MySQL status'
    ]
], $dbConnected ? 'Hostinger MySQL database connected and operational' : 'PHP server active; MySQL database pending configuration in config.php');
