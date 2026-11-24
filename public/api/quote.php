<?php
declare(strict_types=1);

@ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, no-cache, must-revalidate');

const RECIPIENT_EMAIL = 'info@usizolethu.co.za';
const SENDER_EMAIL = 'info@usizolethu.co.za';
const MAX_BODY_BYTES = 32768;
const RATE_WINDOW_SECONDS = 600;
const RATE_MAX_REQUESTS = 5;

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function cleanHeaderField(string $value): string
{
    $cleaned = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value);
    return trim($cleaned ?? '');
}

function stringLength(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function checkRateLimit(string $clientIp): bool
{
    $tempDir = sys_get_temp_dir();
    if ($tempDir === '' || !is_writable($tempDir)) {
        return true;
    }

    $rateFile = rtrim($tempDir, DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . 'usizolethu_quote_rl_'
        . hash('sha256', $clientIp)
        . '.json';

    $handle = @fopen($rateFile, 'c+');
    if ($handle === false) {
        return true;
    }

    $allowed = true;
    if (flock($handle, LOCK_EX)) {
        $raw = stream_get_contents($handle);
        $now = time();
        $timestamps = [];

        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                foreach ($decoded as $ts) {
                    if (is_int($ts) && ($now - $ts) < RATE_WINDOW_SECONDS) {
                        $timestamps[] = $ts;
                    }
                }
            }
        }

        if (count($timestamps) >= RATE_MAX_REQUESTS) {
            $allowed = false;
        } else {
            $timestamps[] = $now;
            ftruncate($handle, 0);
            rewind($handle);
            fwrite($handle, json_encode($timestamps));
        }

        fflush($handle);
        flock($handle, LOCK_UN);
    }

    fclose($handle);
    return $allowed;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') === false) {
    respond(415, ['ok' => false, 'error' => 'Content-Type must be application/json.']);
}

$clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!checkRateLimit($clientIp)) {
    respond(429, [
        'ok' => false,
        'error' => 'Too many quote requests sent from this connection. Please wait a few minutes and try again.',
    ]);
}

$rawBody = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($rawBody === false || $rawBody === '') {
    respond(400, ['ok' => false, 'error' => 'Request body is empty.']);
}
if (strlen($rawBody) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'error' => 'Request payload exceeds size limit.']);
}

$data = json_decode($rawBody, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid JSON request body.']);
}

// Honeypot check: quietly discard automated bot submissions
if (isset($data['website']) && is_string($data['website']) && trim($data['website']) !== '') {
    respond(200, ['ok' => true, 'message' => 'Your quote request has been received.']);
}

$fullName = isset($data['fullName']) && is_string($data['fullName']) ? cleanHeaderField($data['fullName']) : '';
$company  = isset($data['company']) && is_string($data['company']) ? cleanHeaderField($data['company']) : '';
$email    = isset($data['email']) && is_string($data['email']) ? trim($data['email']) : '';
$phone    = isset($data['phone']) && is_string($data['phone']) ? cleanHeaderField($data['phone']) : '';
$service  = isset($data['service']) && is_string($data['service']) ? cleanHeaderField($data['service']) : '';
$detailsRaw = isset($data['details']) && is_string($data['details']) ? $data['details'] : '';
$details  = trim(str_replace(["\0", "\r\n", "\r"], ['', "\n", "\n"], $detailsRaw));

if ($fullName === '' || stringLength($fullName) > 120) {
    respond(400, ['ok' => false, 'error' => 'Please enter a valid full name (max 120 characters).']);
}

if (stringLength($company) > 150) {
    respond(400, ['ok' => false, 'error' => 'Organization name must be 150 characters or fewer.']);
}

if (
    $email === '' ||
    strlen($email) > 254 ||
    preg_match('/[\r\n\0,;]/', $email) === 1 ||
    filter_var($email, FILTER_VALIDATE_EMAIL) === false
) {
    respond(400, ['ok' => false, 'error' => 'Please provide a valid email address.']);
}

$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if ($phone === '' || stringLength($phone) > 40 || strlen($phoneDigits) < 9) {
    respond(400, ['ok' => false, 'error' => 'Please provide a valid contact number.']);
}

if ($service === '' || stringLength($service) > 160) {
    respond(400, ['ok' => false, 'error' => 'Please select a valid supply or service category.']);
}

$detailsLen = stringLength($details);
if ($detailsLen < 10 || $detailsLen > 4000) {
    respond(400, ['ok' => false, 'error' => 'Please provide project specifications between 10 and 4000 characters.']);
}

$subjectLabel = $company !== '' ? $company : $fullName;
$subjectPlain = "Quote Request: {$service} - {$subjectLabel}";
$encodedSubject = '=?UTF-8?B?' . base64_encode($subjectPlain) . '?=';

$orgDisplay = $company !== '' ? $company : 'Individual / Not specified';
$bodyLines = [
    'New Quote & Specification Request — Usizolethu Technologies (Pty) Ltd',
    '======================================================================',
    '',
    "Full Name:        {$fullName}",
    "Organization:     {$orgDisplay}",
    "Email Address:    {$email}",
    "Telephone:        {$phone}",
    "Service Category: {$service}",
    '',
    'Project Specifications & Delivery Location:',
    '----------------------------------------------------------------------',
    $details,
    '',
    '----------------------------------------------------------------------',
    'Sent from https://usizolethu.co.za/',
];
$body = implode("\r\n", $bodyLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Usizolethu Technologies <' . SENDER_EMAIL . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
];
$headerString = implode("\r\n", $headers);

$sent = @mail(RECIPIENT_EMAIL, $encodedSubject, $body, $headerString, '-f ' . SENDER_EMAIL);
if (!$sent) {
    $sent = @mail(RECIPIENT_EMAIL, $encodedSubject, $body, $headerString);
}

if (!$sent) {
    respond(502, [
        'ok' => false,
        'error' => 'Unable to send your request via the mail server right now. Please try again or email ' . RECIPIENT_EMAIL . '.',
    ]);
}

respond(200, [
    'ok' => true,
    'message' => 'Your quote request has been delivered to ' . RECIPIENT_EMAIL . '.',
]);
