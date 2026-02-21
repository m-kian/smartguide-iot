// ===========================
// DARK MODE ENHANCEMENT
// ===========================

// This file provides additional dark mode enhancements
// Main dark mode logic is in dashboard.js

window.addEventListener('DOMContentLoaded', function() {
  // Apply system preference on initial load
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedPreference = localStorage.getItem('smartguide_darkmode');
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('smartguide_darkmode') === null) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  });
});

// Backup toggle for dark mode toggle button
const toggleBtn = document.getElementById("darkModeToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    // Dashboard.js handles the main toggle, this is backup
    if (typeof toggleDarkMode === 'function') {
      toggleDarkMode();
    }
  });
}
