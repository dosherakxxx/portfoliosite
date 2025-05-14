<?php
require_once 'php/config/db.php';
require_once 'php/auth/auth.php';

if (!isLoggedIn()) {
    header('Location: /index.html');
    exit();
}

$user_id = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT * FROM user_profiles WHERE user_id = ?");
$stmt->execute([$user_id]);
$profile = $stmt->fetch();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет - ByteNest</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="dashboard-container">
        <h1>Личный кабинет</h1>
        <div class="profile-section">
            <h2>Мой профиль</h2>
            <form id="profileForm">
                <div class="form-group">
                    <label>Полное имя</label>
                    <input type="text" name="full_name" value="<?php echo htmlspecialchars($profile['full_name'] ?? ''); ?>">
                </div>
                <div class="form-group">
                    <label>Телефон</label>
                    <input type="tel" name="phone" value="<?php echo htmlspecialchars($profile['phone'] ?? ''); ?>">
                </div>
                <div class="form-group">
                    <label>Компания</label>
                    <input type="text" name="company" value="<?php echo htmlspecialchars($profile['company'] ?? ''); ?>">
                </div>
                <button type="submit" class="btn btn-primary">Сохранить</button>
            </form>
        </div>
        <a href="/php/auth/logout.php" class="btn btn-outline">Выйти</a>
    </div>
</body>
</html>
