<?php
require_once 'php/config/db.php';
require_once 'php/auth/auth.php';

if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="ru" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход | ByteNest</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/auth.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-box">
            <div class="auth-header">
                <a href="/" class="logo-link">
                    <span class="logo-text">Byte<span class="accent">Nest</span></span>
                </a>
                <h1>Вход в аккаунт</h1>
            </div>
            <form id="loginForm" class="auth-form" action="php/auth/process.php" method="POST">
                <input type="hidden" name="action" value="login">
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Войти</button>
            </form>
            <div class="auth-footer">
                <p>Нет аккаунта? <a href="register.php">Зарегистрироваться</a></p>
                <a href="/" class="back-home">Вернуться на главную</a>
            </div>
        </div>
    </div>
</body>
</html>
