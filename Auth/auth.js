// User database simulation (in a real app, this would be server-side)
const users = JSON.parse(localStorage.getItem('cv-users')) || [];
let currentUser = null;

// Register a new user
function registerUser() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    const errorElement = document.getElementById('register-error');
    const successElement = document.getElementById('register-success');
    
    errorElement.textContent = '';
    successElement.textContent = '';
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        errorElement.textContent = 'Toate câmpurile sunt obligatorii!';
        return;
    }
    
    if (password !== confirmPassword) {
        errorElement.textContent = 'Parolele nu coincid!';
        return;
    }
    
    if (password.length < 6) {
        errorElement.textContent = 'Parola trebuie să aibă minim 6 caractere!';
        return;
    }
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        errorElement.textContent = 'Acest email este deja înregistrat!';
        return;
    }
    
    // Add new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        cvData: {}
    };
    
    users.push(newUser);
    localStorage.setItem('cv-users', JSON.stringify(users));
    
    successElement.textContent = 'Cont creat cu succes! Vă puteți autentifica acum.';
    
    // Clear form
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
}

// Login user
function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const errorElement = document.getElementById('login-error');
    errorElement.textContent = '';
    
    // Validation
    if (!email || !password) {
        errorElement.textContent = 'Email și parolă sunt obligatorii!';
        return;
    }
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorElement.textContent = 'Email sau parolă incorectă!';
        return;
    }
    
    // Login successful
    currentUser = user;
    localStorage.setItem('cv-current-user', JSON.stringify(user));
    
    // Redirect to main page
    window.location.href = '../cv-builder/text.html';
}

// Check if user is already logged in
function checkLoggedIn() {
    const storedUser = localStorage.getItem('cv-current-user');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        document.getElementById('logout-link').style.display = 'block';
    }
}

// Logout user
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('cv-current-user');
    window.location.href = 'login.html';
}

// Initialize the app
window.onload = function() {
    checkLoggedIn();
    
    // Add logout event listener
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
};