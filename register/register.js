function registerUser() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const registerForm = document.getElementById('register');

    const errorElement = document.getElementById('register-error');
    const successElement = document.getElementById('register-success');

    // Reset mesaje
    errorElement.textContent = '';
    successElement.textContent = '';

    // Validare câmpuri goale
    if (!name || !email || !password || !confirmPassword) {
        errorElement.textContent = 'Toate câmpurile sunt obligatorii!';
        return;
    }

    // Validare email
    if (!validateEmail(email)) {
        errorElement.textContent = 'Vă rugăm introduceți un email valid!';
        return;
    }

    // Verificare parole
    if (password !== confirmPassword) {
        errorElement.textContent = 'Parolele nu coincid!';
        return;
    }

    // Lungime parolă
    if (password.length < 8) {
        errorElement.textContent = 'Parola trebuie să aibă minim 8 caractere!';
        return;
    }

    // Verificare complexitate parolă
    if (!hasNumber(password) || !hasUpperCase(password)) {
        errorElement.textContent = 'Parola trebuie să conțină cel puțin o cifră și o literă mare!';
        return;
    }

    // Verificare email deja înregistrat
    const users = JSON.parse(localStorage.getItem('cv-users')) || [];
    if (users.some(user => user.email === email)) {
        errorElement.textContent = 'Acest email este deja înregistrat!';
        return;
    }

    // Creare user nou
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashPassword(password), // simulare hash
        cvData: {},
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('cv-users', JSON.stringify(users));

    // Setăm userul curent ca logat
    localStorage.setItem('currentUser', newUser.id);

    // Curățare formular
    registerForm.reset();

    // Redirecționare directă către pagina CV
    window.location.href = '../Auth/login.html'; // schimbă dacă ai altă locație
}

// Funcție pentru validarea email-ului
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        return false;
    }

    // Validare domenii .com, .ro, .ru, etc.
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'mail.ru']; // Am adăugat mail.ru
    const domain = email.split('@')[1]; // Extrage domeniul din email

    // Verificăm dacă domeniul există în lista validă și nu conține litere sau cifre
    if (validDomains.includes(domain)) {
        // Verificăm dacă domeniul conține caractere care nu sunt permise (ex: cifre sau litere)
        const domainPattern = /^[a-z]+\.[a-z]+$/;
        if (!domainPattern.test(domain)) {
            return false;
        }
    } else {
        return false;
    }

    return true;
}

// Verifică dacă parola are cifră
function hasNumber(str) {
    return /\d/.test(str);
}

// Verifică dacă parola are literă mare
function hasUpperCase(str) {
    return /[A-Z]/.test(str);
}

// Simulare hash parolă (doar pt demo, nu e securizat)
function hashPassword(password) {
    // Nu folosi în producție! Aici doar o conversie basic pt exemplu.
    return btoa(password);
}
