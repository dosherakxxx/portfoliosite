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
    <title>Регистрация | ByteNest</title>
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
                <h1>Создать аккаунт</h1>
            </div>
            <form id="registerForm" class="auth-form" action="php/auth/process.php" method="POST">
                <input type="hidden" name="action" value="register">
                
                <div class="form-group">
                    <label for="username">Имя пользователя</label>
                    <input type="text" id="username" name="username" required>
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="form-group">
                    <label for="confirm_password">Подтвердите пароль</label>
                    <input type="password" id="confirm_password" name="confirm_password" required>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Зарегистрироваться</button>
            </form>
            <div class="auth-footer">
                <p>Уже есть аккаунт? <a href="login.php">Войти</a></p>
                <a href="/" class="back-home">Вернуться на главную</a>
            </div>
        </div>
    </div>
</body>
</html>
