<?php
require_once '../config/db.php';
require_once 'auth.php';

if (!isLoggedIn()) {
    header('Location: /login.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);

    try {
        $stmt = $pdo->prepare("UPDATE users SET username = ?, email = ? WHERE id = ?");
        $stmt->execute([$username, $email, $user_id]);
        
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
        $_SESSION['success_message'] = 'Профиль успешно обновлен!';
        
        header('Location: /dashboard.php');
        exit();
    } catch(PDOException $e) {
        $_SESSION['error'] = 'Ошибка при обновлении профиля';
        header('Location: /dashboard.php');
        exit();
    }
}
