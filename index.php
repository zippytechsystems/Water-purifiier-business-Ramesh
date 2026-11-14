<?php
/**
 * Lasya Water Purifier – Native PHP Production Web Application Entry Point
 * 
 * Works 100% on standard PHP web hosting (Hostinger, cPanel, Apache, LiteSpeed).
 * Consumes 0 Node.js Web App slots!
 */

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Prevent caching of entry point so users always get the freshest live version
header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');

// Serve the compiled high-performance frontend
$htmlFile = __DIR__ . '/index.html';
if (file_exists($htmlFile)) {
    readfile($htmlFile);
    exit;
}

// Fallback message if index.html is missing
http_response_code(200);
echo '<!DOCTYPE html><html><head><title>Lasya Water Purifier</title></head><body><h1>Lasya Water Purifier</h1><p>Doorstep RO Service & Water Purifier Sales in Raghunathpally & Jangaon. Helpline: 9014357848</p></body></html>';
