// Funcția care deschide și închide bara laterală
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open')) {
        sidebar.style.width = '0'; // Ascunde bara laterală
        sidebar.classList.remove('open');
    } else {
        sidebar.style.width = '250px'; // Afișează bara laterală
        sidebar.classList.add('open');
    }
}

// Adaugă eveniment pentru butonul de meniu
document.getElementById('menu-button').addEventListener('click', toggleSidebar);