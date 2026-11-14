<?php
/**
 * Priya's AquaFresh – Lasya Water Purifier Sales & Services
 * Hostinger / cPanel MySQL Database Configuration, Debugging & Error Logging
 */

// Debugging & Error Logging Configuration:
// Logs all notices, warnings, and errors to a private file without breaking JSON outputs or showing raw stack traces to users.
ini_set('display_errors', '0');
ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/error.log');
error_reporting(E_ALL);

// Allow cross-origin requests & standard JSON headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials (Set for Hostinger cPanel / MySQL)
// Update these with your Hostinger MySQL details from hPanel -> Databases
$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_PORT = getenv('DB_PORT') ?: '3306';
$DB_NAME = getenv('DB_NAME') ?: 'lasya_water_purifier';
$DB_USER = getenv('DB_USER') ?: 'root';
$DB_PASS = getenv('DB_PASS') ?: '';

function getDbConnection() {
    global $DB_HOST, $DB_PORT, $DB_NAME, $DB_USER, $DB_PASS;
    
    try {
        $dsn = "mysql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_TIMEOUT            => 3, // 3-second timeout to prevent server hanging
        ];
        return new PDO($dsn, $DB_USER, $DB_PASS, $options);
    } catch (PDOException $e) {
        // Record debug reason in private error.log without crashing application
        error_log("[DB Warning] Could not connect to MySQL: " . $e->getMessage());
        return null;
    }
}

function sendJsonResponse($status, $data = [], $message = '') {
    $payload = [
        'status' => $status,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('c')
    ];

    if ($status === 'error') {
        error_log("[API Error Response] " . $message . " | Payload: " . json_encode($data));
    }

    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
