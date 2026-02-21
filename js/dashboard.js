// ===========================
// DASHBOARD INITIALIZATION
// ===========================

let darkModeEnabled = false;

window.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  setupDarkMode();
});

function initializeDashboard() {
  // Initialize dashboard elements
  initializeStats();
  initializeActivityLog();
  loadDarkModePreference();
}

function initializeStats() {
  // Generate sample data
  const stats = {
    device: {
      status: 'Online',
      signal: 98
    },
    
    },
    emergency: {
      status: 'No Alert',
      lastAlert: 'N/A'
    }
  };
  
  updateStatsDisplay(stats);
}

function updateStatsDisplay(stats) {
  // Update device status
  const deviceStatus = document.getElementById('deviceStatus');
  const signal = document.getElementById('signal');
  if (deviceStatus) deviceStatus.textContent = stats.device.status;
  if (signal) signal.textContent = stats.device.signal + '%';
  
  // Update battery
  const batteryLevel = document.getElementById('batteryLevel');
  const batteryFill = document.getElementById('batteryFill');
  if (batteryLevel) batteryLevel.textContent = stats.battery.level + '%';
  if (batteryFill) batteryFill.style.width = stats.battery.level + '%';
}

function initializeActivityLog() {
  // Activity log is initialized with default entries from HTML
  const activityLog = document.getElementById('activityLog');
  if (activityLog) {
    // Add smooth transitions
    const entries = activityLog.querySelectorAll('.log-entry');
    entries.forEach((entry, index) => {
      entry.style.opacity = '0';
      entry.style.animation = `fadeIn 0.3s ease ${index * 0.1}s forwards`;
    });
  }
}

// ===========================
// DARK MODE SYSTEM
// ===========================

function setupDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
  
  loadDarkModePreference();
}

function toggleDarkMode() {
  darkModeEnabled = !darkModeEnabled;
  
  const body = document.body;
  if (darkModeEnabled) {
    body.classList.add('dark-mode');
    localStorage.setItem('smartguide_darkmode', 'true');
    updateDarkModeIcon();
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('smartguide_darkmode', 'false');
    updateDarkModeIcon();
  }
}

function loadDarkModePreference() {
  const preference = localStorage.getItem('smartguide_darkmode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (preference === 'true' || (preference === null && prefersDark)) {
    darkModeEnabled = true;
    document.body.classList.add('dark-mode');
  } else {
    darkModeEnabled = false;
    document.body.classList.remove('dark-mode');
  }
  
  updateDarkModeIcon();
}

function updateDarkModeIcon() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    if (darkModeEnabled) {
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      darkModeToggle.title = 'Switch to Light Mode';
    } else {
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      darkModeToggle.title = 'Switch to Dark Mode';
    }
  }
}

// ===========================
// MAP INTEGRATION
// ===========================

function zoomMap(direction) {
  if (window.dashboardMap) {
    const currentZoom = window.dashboardMap.getZoom();
    window.dashboardMap.setZoom(currentZoom + direction);
  }
}

function centerMap() {
  if (window.dashboardMap) {
    window.dashboardMap.setView([13.6929, -89.2182], 13);
  }
}

// ===========================
// FORM VALIDATIONS
// ===========================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// Add fadeIn animation globally
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
