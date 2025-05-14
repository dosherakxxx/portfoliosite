<?php
require_once '../config/db.php';
require_once 'auth.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];
        
        if ($action == 'register') {
            $username = $_POST['username'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            
            if (register($username, $email, $password)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Registration failed']);
            }
        }
        
        elseif ($action == 'login') {
            $email = $_POST['email'];
            $password = $_POST['password'];
            
            if (login($email, $password)) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
            }
        }
        
        elseif ($action == 'logout') {
            logout();
            echo json_encode(['success' => true]);
        }
    }
}
?>
