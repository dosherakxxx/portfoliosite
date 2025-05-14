<?php
require_once 'php/config/db.php';
require_once 'php/auth/auth.php';

if (!isLoggedIn()) {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'];
$email = $_SESSION['email'];
$avatar_letter = strtoupper(substr($username, 0, 1));

// Get success message if exists
$success_message = isset($_SESSION['success_message']) ? $_SESSION['success_message'] : '';
unset($_SESSION['success_message']);
?>

<!DOCTYPE html>
<html lang="ru" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет | ByteNest</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/dashboard.css">
</head>
<body>
    <div class="dashboard-container">
        <?php if ($success_message): ?>
            <div class="success-message"><?php echo htmlspecialchars($success_message); ?></div>
        <?php endif; ?>

        <div class="dashboard-header">
            <div class="user-welcome">
                <div class="avatar-container">
                    <?php if (isset($_SESSION['avatar']) && $_SESSION['avatar']): ?>
                        <img src="uploads/avatars/<?php echo htmlspecialchars($_SESSION['avatar']); ?>" alt="Avatar" class="user-avatar">
                    <?php else: ?>
                        <div class="user-avatar"><?php echo strtoupper(substr($_SESSION['username'], 0, 1)); ?></div>
                    <?php endif; ?>
                    <form id="avatarForm" action="php/auth/update_avatar.php" method="POST" enctype="multipart/form-data">
                        <label for="avatar" class="avatar-upload">
                            <i class="fas fa-camera"></i>
                        </label>
                        <input type="file" id="avatar" name="avatar" accept="image/*" style="display: none;">
                    </form>
                </div>
                <div class="user-info">
                    <h2>Добро пожаловать, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h2>
                    <p><?php echo htmlspecialchars($_SESSION['email']); ?></p>
                </div>
            </div>
            <div class="dashboard-actions">
                <a href="/" class="btn btn-outline">На главную</a>
                <a href="php/auth/logout.php" class="btn btn-danger">Выйти</a>
            </div>
        </div>

        <div class="dashboard-sections">
            <div class="dashboard-card">
                <h3>Изменить профиль</h3>
                <form id="profileForm" action="php/auth/update_profile.php" method="POST">
                    <div class="form-group">
                        <label for="username">Имя пользователя</label>
                        <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($username); ?>" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($email); ?>" required>
                    </div>
                    <button type="submit" class="btn-update">Обновить профиль</button>
                </form>
            </div>

            <div class="dashboard-card">
                <h3>Изменить пароль</h3>
                <form id="passwordForm" action="php/auth/update_password.php" method="POST">
                    <div class="form-group">
                        <label for="current_password">Текущий пароль</label>
                        <input type="password" id="current_password" name="current_password" required>
                    </div>
                    <div class="form-group">
                        <label for="new_password">Новый пароль</label>
                        <input type="password" id="new_password" name="new_password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm_password">Подтвердите новый пароль</label>
                        <input type="password" id="confirm_password" name="confirm_password" required>
                    </div>
                    <button type="submit" class="btn-update">Обновить пароль</button>
                </form>
            </div>
        </div>
    </div>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Password form validation
        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            const newPass = document.getElementById('new_password').value;
            const confirmPass = document.getElementById('confirm_password').value;

            if (newPass !== confirmPass) {
                e.preventDefault();
                alert('Пароли не совпадают!');
            }
        });

        // Auto-submit avatar form when file is selected
        document.getElementById('avatar').addEventListener('change', function() {
            document.getElementById('avatarForm').submit();
        });
    });
    </script>
</body>
</html>
