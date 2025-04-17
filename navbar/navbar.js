// Funcția care deschide și închide meniul
function toggleMenu() {
    const menu = document.getElementById('profile-menu');
    menu.classList.toggle('hidden');
}

// Funcția de deconectare
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "../Auth/login.html";
}

// Funcția care șterge butonul de deconectare din meniu
function removeLogoutButton() {
    const logoutButton = document.querySelector('.profile-menu button:nth-child(1)');
    logoutButton.style.display = 'none';
}