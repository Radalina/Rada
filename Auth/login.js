async function lroginUse() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMessage = document.getElementById('login-error');
    const successMessage = document.getElementById('login-success');

    // Resetăm mesajele de eroare și succes
    errorMessage.textContent = '';
    successMessage.textContent = '';

    if (!email || !password) {
        errorMessage.textContent = 'Te rugăm să completezi toate câmpurile!';
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = 'Email invalid!';
        return;
    }

    if (!validatePassword(password)) {
        errorMessage.textContent = 'Parola trebuie să conțină cel puțin 5 caractere, o literă mică și o literă mare!';
        return;
    }

    try {
        const response = await fetch('../data/users.json'); // Verifică calea către fișier
        if (!response.ok) {
            throw new Error('Fișierul users.json nu a fost găsit!');
        }

        const users = await response.json();
        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
            successMessage.textContent = 'Autentificare reușită!';
            document.getElementById('login').reset();
            setTimeout(() => {
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