function initAuth() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const dashboardBtn = document.getElementById('dashboardBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    // Check auth status
    fetch('/php/auth/check_auth.php')
        .then(response => response.json())
        .then(data => {
            if (data.isLoggedIn) {
                loginBtn.style.display = 'none';
                registerBtn.style.display = 'none';
                dashboardBtn.style.display = 'inline-block';
            }
        });

    // Login form handling
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('action', 'login');

        try {
            const response = await fetch('/php/auth/process.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                location.reload();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Register form handling
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('action', 'register');

        try {
            const response = await fetch('/php/auth/process.php', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                alert('Registration successful! Please login.');
                closeModal(registerModal);
                openModal(loginModal);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', initAuth);
