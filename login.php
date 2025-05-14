<?php
require_once 'php/config/db.php';
require_once 'php/auth/auth.php';

if (isLoggedIn()) {
    header('Location: index.html');
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
            <form id="loginForm" class="auth-form" method="POST" onsubmit="return handleLogin(event)">
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

<script>
async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append('action', 'login');

    try {
        const response = await fetch('php/auth/process.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        
        if (data.success) {
            window.location.href = data.redirect || 'dashboard.php';
        } else {
            alert(data.message || 'Неверный email или пароль');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при входе');
    }
    return false;
}
</script>
</body>
</html>
