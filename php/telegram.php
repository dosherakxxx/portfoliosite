<?php
header('Content-Type: application/json');

$token = '7921213339:AAG13NxWY3ds9TBTmrMjf6sq34t5vPTXaqU';
$chat_id = '7520366041';

$data = json_decode(file_get_contents('php://input'), true);
$message = $data['message'];

$url = "https://api.telegram.org/bot{$token}/sendMessage";
$params = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo json_encode(['success' => true]);
?>
