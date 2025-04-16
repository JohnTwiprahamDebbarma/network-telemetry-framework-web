// Immediately-invoked function to avoid global namespace pollution
(function() {
  // Function to set the theme
  function setTheme(themeName) {
    document.body.className = ''; // Clear all classes first
    document.body.classList.add(themeName);
    localStorage.setItem('theme', themeName);
  }

  // Function to toggle the theme
  function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark-theme') {
      setTheme('light-theme');
    } else {
      setTheme('dark-theme');
    }
  }

  // Set the initial theme based on localStorage or default to light
  (function() {
    if (localStorage.getItem('theme') === 'dark-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  })();

  // Add event listener once DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  });

  // Also make the toggle function available globally for any other interactions
  window.toggleTheme = toggleTheme;
})();