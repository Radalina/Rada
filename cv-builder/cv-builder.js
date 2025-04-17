document.addEventListener('DOMContentLoaded', function () {
    // Funcție pentru stele
    setupStars();

    // Funcții pentru ștergere
    setupRemoveButtons();

    // Adăugare educație
    document.getElementById('add-education').addEventListener('click', addEducation);

    // Adăugare limbă
    document.getElementById('add-language').addEventListener('click', addLanguage);

    // Generare CV
    document.querySelector('.generate-btn').addEventListener('click', handleAuthentication);

    // Încărcăm utilizatorii din fișierul JSON
    fetch('../users.json')
        .then(response => response.json())
        .then(data => {
            users = data; // Salvăm utilizatorii în memorie
            console.log('Utilizatori încărcați:', users); // Verificăm utilizatorii încărcați
        })
        .catch(error => console.error('Eroare la încărcarea fișierului users.json:', error));
});

// Variabile globale
let users = []; // Lista utilizatorilor

// Funcție pentru înregistrare
function registerUser(email, password) {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('Email-ul este deja înregistrat.');
        return false;
    }

    const newUser = { email, password };
    users.push(newUser); // Adăugăm utilizatorul în memorie

    alert('Înregistrare reușită!');
    console.log('Utilizatori actualizați:', users); // Verificăm lista actualizată
    return true;
}

// Funcție pentru autentificare
function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert('Autentificare reușită!');
        return true;
    } else {
        alert('Email sau parolă incorectă.');
        return false;
    }
}

// Funcție pentru gestionarea autentificării și înregistrării
function handleAuthentication() {
    const email = prompt('Introduceți email-ul:');
    const password = prompt('Introduceți parola:');

    if (!email || !password) {
        alert('Email-ul și parola sunt obligatorii!');
        return;
    }

    const action = prompt('Doriți să vă autentificați sau să vă înregistrați? (login/register)');
    if (action === 'register') {
        if (registerUser(email, password)) {
            alert('Acum puteți genera CV-ul!');
        }
    } else if (action === 'login') {
        if (loginUser(email, password)) {
            alert('Autentificare reușită! Puteți genera CV-ul.');
        }
    } else {
        alert('Acțiune invalidă.');
    }
}

function setupStars() {
    document.querySelectorAll('.stars span').forEach(star => {
        star.addEventListener('click', function () {
            const stars = this.parentElement.children;
            const rating = Array.from(stars).indexOf(this) + 1;

            // Reset all stars
            Array.from(stars).forEach(s => {
                s.classList.remove('active');
                s.textContent = '☆';
            });

            // Fill stars up to the clicked one
            for (let i = 0; i < rating; i++) {
                stars[i].classList.add('active');
                stars[i].textContent = '★';
            }
        });

        // Hover effect
        star.addEventListener('mouseover', function () {
            const stars = this.parentElement.children;
            const hoverIndex = Array.from(stars).indexOf(this);

            Array.from(stars).forEach((s, index) => {
                if (index <= hoverIndex) {
                    s.textContent = '★';
                }
            });
        });

        star.addEventListener('mouseout', function () {
            const stars = this.parentElement.children;
            Array.from(stars).forEach(s => {
                if (!s.classList.contains('active')) {
                    s.textContent = '☆';
                }
            });
        });
    });
}

function setupRemoveButtons() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.education-item, .language-item').remove();
        });
    });
}

function addEducation() {
    const educationContainer = document.getElementById('education-container');
    const newEducation = document.createElement('div');
    newEducation.className = 'education-item';
    newEducation.innerHTML = `
        <label>Școală/Universitate:</label>
        <input type="text" placeholder="Universitatea din București">
        
        <label>Oraș:</label>
        <input type="text" placeholder="București">
        
        <div class="date-group">
            <label>Dată început:</label>
            <div class="date-input">
                <select>
                    <option>ianuarie</option>
                    <option>februarie</option>
                    <option>martie</option>
                    <option>aprilie</option>
                    <option>mai</option>
                    <option>iunie</option>
                    <option>iulie</option>
                    <option>august</option>
                    <option>septembrie</option>
                    <option>octombrie</option>
                    <option>noiembrie</option>
                    <option>decembrie</option>
                </select>
                <input type="text" placeholder="2020">
            </div>
        </div>
        
        <div class="date-group">
            <label>Dată sfârșit:</label>
            <div class="date-input">
                <select>
                    <option>ianuarie</option>
                    <option>februarie</option>
                    <option>martie</option>
                    <option>aprilie</option>
                    <option>mai</option>
                    <option>iunie</option>
                    <option>iulie</option>
                    <option>august</option>
                    <option>septembrie</option>
                    <option>octombrie</option>
                    <option>noiembrie</option>
                    <option>decembrie</option>
                </select>
                <input type="text" placeholder="2024">
            </div>
        </div>
        
        <label class="checkbox-label"><input type="checkbox"> Prezent</label>
        
        <label>Descriere:</label>
        <textarea placeholder="Specializarea, proiecte relevante"></textarea>
        
        <button type="button" class="remove-btn">🗑️ Șterge</button>
    `;
    educationContainer.appendChild(newEducation);
    setupRemoveButtons();
}

function addLanguage() {
    const languagesContainer = document.getElementById('languages-container');
    const newLanguage = document.createElement('div');
    newLanguage.className = 'language-item';
    newLanguage.innerHTML = `
        <label>Limbă:</label>
        <input type="text" placeholder="Engleză">
        
        <label>Nivel:</label>
        <select>
            <option>Alege nivelul</option>
            <option>Începător</option>
            <option>Mediu</option>
            <option>Avansat</option>
            <option>Fluent</option>
            <option>Nativ</option>
        </select>
        
        <button type="button" class="remove-btn">🗑️ Șterge</button>
    `;
    languagesContainer.appendChild(newLanguage);
    setupRemoveButtons();
}

function generateCV() {
    const form = document.getElementById('cv-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Validare câmpuri obligatorii
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (isValid) {
        // Aici poți adăuga logica pentru generarea efectivă a CV-ului
        alert("CV generat cu succes! Datele au fost salvate.");
        
        // Exemplu: Salvare date în localStorage
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        localStorage.setItem('cvData', JSON.stringify(formObject));
        
        // Redirecționare sau afișare preview CV
        // window.location.href = "cv-preview.html";
    } else {
        alert("Vă rugăm completați toate câmpurile obligatorii marcate cu roșu!");
    }
}