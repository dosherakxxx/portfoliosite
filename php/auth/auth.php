<?php
session_start();

function register($username, $email, $password) {
    global $pdo;
    
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashed_password]);
        return true;
    } catch(PDOException $e) {
        return false;
    }
}

function login($email, $password) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
            return true;
        }
        return false;
    } catch(PDOException $e) {
        return false;
    }
}

function logout() {
    session_start();
    session_destroy();
    header("Location: /index.html");
    exit();
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}
?>
