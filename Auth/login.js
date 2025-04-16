function loginUser() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const loginForm = document.getElementById('login');

    const errorElement = document.getElementById('login-error');
    const successElement = document.getElementById('login-success');

    // Reset mesaje
    errorElement.textContent = '';
    successElement.textContent = '';

    // Validare câmpuri goale
    if (!email || !password) {
        errorElement.textContent = 'Toate câmpurile sunt obligatorii!';
        return;
    }

    // Validare email
    if (!validateEmail(email)) {
        errorElement.textContent = 'Vă rugăm introduceți un email valid!';
        return;
    }

    // Verificare dacă utilizatorul există
    const users = JSON.parse(localStorage.getItem('cv-users')) || [];
    const user = users.find(user => user.email === email && user.password === hashPassword(password));

    if (!user) {
        errorElement.textContent = 'Email sau parolă incorecte!';
        return;
    }

    // Setăm userul curent ca logat
    localStorage.setItem('currentUser', user.id);

    // Curățare formular
    loginForm.reset();

    // Redirecționare directă către pagina CV
    window.location.href = '../cv-builder/text.html'; // schimbă dacă ai altă locație
}

// Funcție pentru validarea email-ului
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Simulare hash parolă (doar pt demo, nu e securizat)
function hashPassword(password) {
    // Nu folosi în producție! Aici doar o conversie basic pt exemplu.
    return btoa(password);
}
