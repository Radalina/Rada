function generateCV() {
  // Obține datele din formular
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  // ... alte câmpuri

  // Generează HTML pentru CV
  const cvHTML = `
      <div class="cv-header">
          <h1>${name}</h1>
          <p>${email}</p>
          <!-- Alte detalii -->
      </div>
      <!-- Restul secțiunilor CV -->
  `;

  // Afișează preview
  const preview = document.getElementById('cv-preview');
  preview.innerHTML = cvHTML;
  preview.classList.remove('hidden');

  // Salvează datele în localStorage
  const user = JSON.parse(localStorage.getItem('cv-current-user'));
  if(user) {
      user.cvData = {
          name: name,
          email: email,
          // ... alte câmpuri
      };
      localStorage.setItem('cv-current-user', JSON.stringify(user));
  }
}

// Încarcă datele salvate la încărcarea paginii
document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('cv-current-user'));
  if(user && user.cvData) {
      document.getElementById('name').value = user.cvData.name || '';
      document.getElementById('email').value = user.cvData.email || '';
      // ... completează și alte câmpuri
  }
});