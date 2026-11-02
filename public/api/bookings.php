<?php
require_once __DIR__ . '/config.php';

$pdo = getDbConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!$input) {
        http_response_code(400);
        sendJsonResponse('error', null, 'Invalid JSON payload received');
    }

    $customer_name      = trim($input['customer_name'] ?? '');
    $mobile_number      = trim($input['mobile_number'] ?? '');
    $address            = trim($input['address'] ?? '');
    $village_town       = trim($input['village_town'] ?? 'Raghunathpally');
    $service_category   = trim($input['service_category'] ?? 'General Service');
    $product_type       = trim($input['product_type'] ?? 'Domestic RO');
    $problem_description = trim($input['problem_description'] ?? 'Customer request via web portal');
    $preferred_date     = trim($input['preferred_date'] ?? date('Y-m-d'));
    $preferred_time     = trim($input['preferred_time'] ?? '10:00 AM - 01:00 PM');
    $booking_reference  = trim($input['booking_reference'] ?? ('LWP-' . date('Y') . '-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5))));

    if (empty($customer_name) || empty($mobile_number)) {
        http_response_code(400);
        sendJsonResponse('error', null, 'Customer name and 10-digit mobile number are required');
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO `service_bookings` 
                (`booking_reference`, `customer_name`, `mobile_number`, `address`, `village_town`, `service_category`, `product_type`, `problem_description`, `preferred_date`, `preferred_time`, `booking_status`)
                VALUES 
                (:ref, :name, :phone, :addr, :village, :cat, :prod, :prob, :pdate, :ptime, 'New')
            ");

            $stmt->execute([
                ':ref'     => $booking_reference,
                ':name'    => $customer_name,
                ':phone'   => $mobile_number,
                ':addr'    => $address,
                ':village' => $village_town,
                ':cat'     => $service_category,
                ':prod'    => $product_type,
                ':prob'    => $problem_description,
                ':pdate'   => $preferred_date,
                ':ptime'   => $preferred_time,
            ]);

            http_response_code(201);
            sendJsonResponse('success', [
                'booking_reference' => $booking_reference,
                'db_persisted'      => true
            ], 'Booking successfully stored in MySQL database');
        } catch (Exception $e) {
            http_response_code(200);
            sendJsonResponse('success', [
                'booking_reference' => $booking_reference,
                'db_persisted'      => false,
                'note'              => $e->getMessage()
            ], 'Booking generated (Database error fallback)');
        }
    } else {
        // Fallback when MySQL is not yet configured on Hostinger
        http_response_code(200);
        sendJsonResponse('success', [
            'booking_reference' => $booking_reference,
            'db_persisted'      => false
        ], 'Booking generated successfully (Awaiting MySQL setup)');
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM `service_bookings` ORDER BY `id` DESC LIMIT 50");
            $rows = $stmt->fetchAll();
            sendJsonResponse('success', $rows, 'Bookings retrieved');
        } catch (Exception $e) {
            sendJsonResponse('error', [], $e->getMessage());
        }
    } else {
        sendJsonResponse('success', [], 'Database not connected');
    }
}
