<?php
require_once '../config/db.php';
require_once 'auth.php';

if (!isLoggedIn()) {
    header('Location: /login.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $current_password = $_POST['current_password'];
    $new_password = $_POST['new_password'];
    
    try {
        // Verify current password
        $stmt = $pdo->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch();
        
        if (password_verify($current_password, $user['password'])) {
            // Update password
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->execute([$hashed_password, $user_id]);
            
            $_SESSION['success_message'] = 'Пароль успешно обновлен!';
        } else {
            $_SESSION['error'] = 'Неверный текущий пароль';
        }
        
        header('Location: /dashboard.php');
        exit();
    } catch(PDOException $e) {
        $_SESSION['error'] = 'Ошибка при обновлении пароля';
        header('Location: /dashboard.php');
        exit();
    }
}
