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

    $customer_name   = trim($input['customer_name'] ?? '');
    $mobile_number   = trim($input['mobile_number'] ?? '');
    $interest        = trim($input['product_or_service_interest'] ?? 'General Enquiry');
    $village_town    = trim($input['village_town'] ?? 'Raghunathpally');
    $message         = trim($input['message'] ?? '');
    $enquiry_ref     = 'ENQ-' . date('Y') . '-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));

    if (empty($customer_name) || empty($mobile_number)) {
        http_response_code(400);
        sendJsonResponse('error', null, 'Customer name and mobile number are required');
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO `customer_enquiries` 
                (`enquiry_reference`, `customer_name`, `mobile_number`, `product_or_service_interest`, `village_town`, `message`, `source_channel`, `status`)
                VALUES 
                (:ref, :name, :phone, :interest, :village, :msg, 'Website Form', 'New')
            ");

            $stmt->execute([
                ':ref'      => $enquiry_ref,
                ':name'     => $customer_name,
                ':phone'    => $mobile_number,
                ':interest' => $interest,
                ':village'  => $village_town,
                ':msg'      => $message
            ]);

            http_response_code(201);
            sendJsonResponse('success', [
                'enquiry_reference' => $enquiry_ref,
                'db_persisted'      => true
            ], 'Enquiry stored in database successfully');
        } catch (Exception $e) {
            sendJsonResponse('success', [
                'enquiry_reference' => $enquiry_ref,
                'db_persisted'      => false,
                'note'              => $e->getMessage()
            ], 'Enquiry processed');
        }
    } else {
        sendJsonResponse('success', [
            'enquiry_reference' => $enquiry_ref,
            'db_persisted'      => false
        ], 'Enquiry processed (Awaiting MySQL setup)');
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM `customer_enquiries` ORDER BY `id` DESC LIMIT 50");
            $rows = $stmt->fetchAll();
            sendJsonResponse('success', $rows, 'Enquiries retrieved');
        } catch (Exception $e) {
            sendJsonResponse('error', [], $e->getMessage());
        }
    } else {
        sendJsonResponse('success', [], 'Database not connected');
    }
}
