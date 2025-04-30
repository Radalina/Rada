// Validare email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validare parolă
function validatePassword(password) {
    // Parola trebuie să conțină cel puțin 5 caractere, o literă mică și o literă mare
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return passwordRegex.test(password);
}

// Funcția principală pentru autentificare
async function lroginUse() {
    console.log('Funcția lroginUse a fost apelată.');
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMessage = document.getElementById('login-error');
    const successMessage = document.getElementById('login-success');

    // Resetăm mesajele de eroare și succes
    errorMessage.textContent = '';
    successMessage.textContent = '';

    // Validare câmpuri goale
    if (!email || !password) {
        errorMessage.textContent = 'Te rugăm să completezi toate câmpurile!';
        return;
    }

    // Validare email
    if (!validateEmail(email)) {
        errorMessage.textContent = 'Email invalid!';
        return;
    }

    // Validare parolă
    if (!validatePassword(password)) {
        errorMessage.textContent = 'Parola trebuie să conțină cel puțin 5 caractere, o literă mică și o literă mare!';
        return;
    }

    try {
        console.log('Încercăm să citim fișierul users.json...');
        const response = await fetch('../data/users.json'); // Verificăm calea către fișier
        if (!response.ok) {
            throw new Error('Fișierul users.json nu a fost găsit!');
        }

        const users = await response.json();
        console.log('Users din JSON:', users);

        // Căutăm utilizatorul în lista de utilizatori
        const matchedUser = users.find(user => user.email === email && user.password === password);
        console.log('User găsit:', matchedUser);

        if (matchedUser) {
            successMessage.textContent = 'Autentificare reușită!';
            document.getElementById('login').reset();
            setTimeout(() => {
                console.log('Redirecționare către cv-builder.html...');
                window.location.href = '../cv-builder/cv-builder.html'; // Redirecționare către pagina de CV
            }, 1000);
        } else {
            errorMessage.textContent = 'Email sau parolă incorecte!';
        }
    } catch (error) {
        console.error('Eroare la citirea users.json:', error);
        errorMessage.textContent = 'Eroare la conectarea cu baza de date!';
    }
}