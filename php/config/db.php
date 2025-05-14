<?php
$host = 'localhost:3306';
$dbname = 'p-349030_testuser';
$username = 'p-349030_user';
$password = 'dosherak2010';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
