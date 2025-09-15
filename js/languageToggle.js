// Language Toggle Functionality (Join page only)
let currentLang = 'en'; // Default language

// Language data object
const translations = {
  en: {
    langText: '한국어'
  },
  ko: {
    langText: 'English'
  }
};

// Function to toggle language
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'ko' : 'en';
  
  // Update button text
  const langText = document.getElementById('lang-text');
  
  if (langText) {
    langText.textContent = translations[currentLang].langText;
  }
  
  // Toggle content visibility
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(element => {
    if (element.getAttribute('data-lang') === currentLang) {
      element.style.display = '';
      element.classList.remove('hidden');
    } else {
      element.style.display = 'none';
      element.classList.add('hidden');
    }
  });
  
  // Store language preference for join page only
  localStorage.setItem('joinPageLanguage', currentLang);
}

// Initialize language toggle
function initLanguageToggle() {
  // Get stored language preference for join page
  const storedLang = localStorage.getItem('joinPageLanguage');
  if (storedLang) {
    currentLang = storedLang;
  }
  
  // Add event listener
  const langToggle = document.getElementById('lang-toggle');
  
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
    // Set initial button text
    langToggle.querySelector('#lang-text').textContent = translations[currentLang].langText;
  }
  
  // Initial content display
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(element => {
    if (element.getAttribute('data-lang') === currentLang) {
      element.style.display = '';
      element.classList.remove('hidden');
    } else {
      element.style.display = 'none';
      element.classList.add('hidden');
    }
  });
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toggleLanguage, initLanguageToggle, getCurrentLang: () => currentLang };
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageToggle);
} else {
  initLanguageToggle();
}