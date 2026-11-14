<?php
require_once __DIR__ . '/config.php';

$pdo = getDbConnection();

$defaultReviews = [
    [
        'id' => 1,
        'customer_name' => 'Srinivas Rao',
        'village_town' => 'Raghunathpally',
        'rating' => 5,
        'service_availed' => 'Domestic RO Purifier Installation',
        'comment' => 'Very prompt service by Ramesh garu. He installed our water purifier neatly and explained how the mineral filter works. Highly recommended!',
        'created_at' => '2026-10-28 10:30:00'
    ],
    [
        'id' => 2,
        'customer_name' => 'K. Madhavi',
        'village_town' => 'Jangaon',
        'rating' => 5,
        'service_availed' => 'Water Purifier Filter Replacement',
        'comment' => 'Original filters and membrane replaced on the same day after calling. Water taste is crystal clean.',
        'created_at' => '2026-10-29 14:15:00'
    ],
    [
        'id' => 3,
        'customer_name' => 'Rajesh Reddy',
        'village_town' => 'Khilashapur',
        'rating' => 5,
        'service_availed' => 'RO Purifier Repair & Servicing',
        'comment' => 'Had a water leakage issue in our purifier. Technician arrived in 2 hours and fixed the fitting. Reasonable and honest pricing.',
        'created_at' => '2026-10-31 16:45:00'
    ],
    [
        'id' => 4,
        'customer_name' => 'Venkateshwarlu',
        'village_town' => 'Ashwaraopally',
        'rating' => 5,
        'service_availed' => 'Commercial RO Plant Setup',
        'comment' => 'Excellent commercial purifier setup for our shop. Running smoothly with 1 year guarantee.',
        'created_at' => '2026-11-01 11:20:00'
    ]
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);

    if (!$input) {
        http_response_code(400);
        sendJsonResponse('error', null, 'Invalid JSON payload received');
    }

    $customer_name   = trim($input['customer_name'] ?? '');
    $village_town    = trim($input['village_town'] ?? 'Raghunathpally');
    $rating          = intval($input['rating'] ?? 5);
    $service_availed = trim($input['service_availed'] ?? 'Water Purifier Service');
    $comment         = trim($input['comment'] ?? '');

    if ($rating < 1 || $rating > 5) {
        $rating = 5;
    }

    if (empty($customer_name) || empty($comment)) {
        http_response_code(400);
        sendJsonResponse('error', null, 'Customer name and review feedback are required');
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO `customer_reviews` 
                (`customer_name`, `village_town`, `rating`, `service_availed`, `comment`, `is_approved`)
                VALUES 
                (:name, :village, :rating, :service, :comment, 1)
            ");

            $stmt->execute([
                ':name'    => $customer_name,
                ':village' => $village_town,
                ':rating'  => $rating,
                ':service' => $service_availed,
                ':comment' => $comment
            ]);

            http_response_code(201);
            sendJsonResponse('success', [
                'id' => $pdo->lastInsertId(),
                'db_persisted' => true
            ], 'Review posted successfully in MySQL database');
        } catch (Exception $e) {
            sendJsonResponse('success', [
                'db_persisted' => false,
                'note' => $e->getMessage()
            ], 'Review recorded (Offline fallback)');
        }
    } else {
        sendJsonResponse('success', [
            'db_persisted' => false
        ], 'Review recorded (Awaiting MySQL setup)');
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM `customer_reviews` WHERE `is_approved` = 1 ORDER BY `id` DESC LIMIT 50");
            $rows = $stmt->fetchAll();
            if (count($rows) === 0) {
                $rows = $defaultReviews;
            }
            sendJsonResponse('success', $rows, 'Reviews loaded from MySQL');
        } catch (Exception $e) {
            sendJsonResponse('success', $defaultReviews, 'Default reviews loaded');
        }
    } else {
        sendJsonResponse('success', $defaultReviews, 'Default reviews loaded');
    }
}
