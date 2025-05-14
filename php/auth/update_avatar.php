<?php
require_once '../config/db.php';
require_once 'auth.php';

if (!isLoggedIn()) {
    header('Location: /login.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['avatar'])) {
    $file = $_FILES['avatar'];
    $allowed = ['image/jpeg', 'image/png', 'image/gif'];
    
    if (!in_array($file['type'], $allowed)) {
        $_SESSION['error'] = 'Разрешены только изображения (JPEG, PNG, GIF)';
        header('Location: /dashboard.php');
        exit();
    }

    $upload_dir = '../../uploads/avatars/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $filename = uniqid() . '_' . $file['name'];
    $filepath = $upload_dir . $filename;

    if (move_uploaded_file($file['tmp_name'], $filepath)) {
        try {
            $stmt = $pdo->prepare("UPDATE users SET avatar = ? WHERE id = ?");
            $stmt->execute([$filename, $_SESSION['user_id']]);
            $_SESSION['avatar'] = $filename;
            $_SESSION['success_message'] = 'Аватар успешно обновлен!';
        } catch(PDOException $e) {
            $_SESSION['error'] = 'Ошибка при обновлении аватара';
        }
    }

    header('Location: /dashboard.php');
    exit();
}
