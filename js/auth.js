// ===========================
// AUTHENTICATION SYSTEM
// ===========================

// Check if user is logged in on page load
window.addEventListener('DOMContentLoaded', function() {
  checkAuthentication();
  setupEventListeners();
  initializeDashboard();
});

function checkAuthentication() {
  const loggedInUser = localStorage.getItem('smartguide_user');
  
  if (loggedInUser) {
    // User is logged in
    showDashboard(JSON.parse(loggedInUser));
  } else {
    // Show login screen
    showLoginScreen();
  }
}

function setupEventListeners() {
  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // User avatar click to show dropdown
  const userAvatar = document.querySelector('.user-avatar');
  if (userAvatar) {
    userAvatar.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function() {
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown) {
      dropdown.style.display = 'none';
    }
  });
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe').checked;
  const loginBtn = document.querySelector('.login-btn');

  // Clear any previous error messages
  clearLoginErrors();

  // Validate inputs
  if (!email) {
    showLoginError('Please enter your email address');
    return;
  }

  if (!password) {
    showLoginError('Please enter your password');
    return;
  }

  if (password.length < 1) {
    showLoginError('Password must be at least 1 character');
    return;
  }

  // Show loading state
  if (loginBtn) {
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
  }

  // Simulate API delay
  setTimeout(function() {
    try {
      // Simulate authentication (in real app, would verify against backend)
      const user = {
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1).toLowerCase(),
        id: 'USER-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        loginTime: new Date().toISOString()
      };

      // Store user data
      localStorage.setItem('smartguide_user', JSON.stringify(user));
      
      if (rememberMe) {
        localStorage.setItem('smartguide_remember', 'true');
      }

      // Show dashboard
      showDashboard(user);

      // Reset button
      if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
      }
    } catch (error) {
      console.error('Login error:', error);
      showLoginError('An error occurred. Please try again.');
      
      // Reset button
      if (loginBtn) {
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
      }
    }
  }, 500);
}

function showLoginScreen() {
  document.getElementById('loginScreen').classList.add('active');
  document.getElementById('dashboardScreen').style.display = 'none';
  
  // Check if user was remembered
  const rememberedUser = localStorage.getItem('smartguide_remember');
  if (rememberedUser && localStorage.getItem('smartguide_user')) {
    // Auto-login in future update could happen here
  }
}

function showDashboard(user) {
  document.getElementById('loginScreen').classList.remove('active');
  document.getElementById('dashboardScreen').style.display = 'block';
  
  // Update user information in dashboard
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('activeUser').textContent = user.id;
  
  // Start real-time updates
  startDashboardUpdates();
}

function showLoginError(message) {
  const loginCard = document.querySelector('.login-card');
  if (!loginCard) return;

  // Remove existing error message
  const existingError = loginCard.querySelector('.login-error');
  if (existingError) {
    existingError.remove();
  }

  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'login-error';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <span>${message}</span>
  `;

  // Insert before the form
  const loginForm = document.getElementById('loginForm');
  loginForm.parentNode.insertBefore(errorDiv, loginForm);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 5000);
}

function clearLoginErrors() {
  const existingError = document.querySelector('.login-error');
  if (existingError) {
    existingError.remove();
  }
}

function logout() {
  // Clear user data
  localStorage.removeItem('smartguide_user');
  localStorage.removeItem('smartguide_remember');
  
  // Show login screen
  showLoginScreen();
  
  // Clear any running timers
  stopDashboardUpdates();
  
  // Reset form
  document.getElementById('loginForm').reset();
}

function openSettings() {
  const settingsModal = document.getElementById('settingsModal');
  settingsModal.classList.add('active');
}

function openProfile() {
  alert('Profile settings coming soon!');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Simulate real-time dashboard updates
let updateInterval;

function startDashboardUpdates() {
  // Update every 5 seconds
  updateInterval = setInterval(function() {
    updateDeviceStatus();
    updateBatteryStatus();
    updateLocationData();
  }, 5000);

  // Initial update
  updateDeviceStatus();
  updateBatteryStatus();
  updateLocationData();
}

function stopDashboardUpdates() {
  if (updateInterval) {
    clearInterval(updateInterval);
  }
}

function updateDeviceStatus() {
  const statuses = ['Online', 'Connecting', 'Online'];
  const signals = [98, 92, 88, 95, 100];
  
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomSignal = signals[Math.floor(Math.random() * signals.length)];
  
  const statusElement = document.getElementById('deviceStatus');
  const signalElement = document.getElementById('signal');
  
  if (statusElement) statusElement.textContent = randomStatus;
  if (signalElement) signalElement.textContent = randomSignal + '%';

  // Update indicator
  const indicator = document.querySelector('.device-status .stat-indicator');
  if (randomStatus === 'Online' && indicator) {
    indicator.className = 'stat-indicator online';
  } else if (indicator) {
    indicator.className = 'stat-indicator warning';
  }
}

function updateBatteryStatus() {
  const batteryLevels = [88, 87, 86, 89, 85, 84];
  const randomBattery = batteryLevels[Math.floor(Math.random() * batteryLevels.length)];
  
  const batteryElement = document.getElementById('batteryLevel');
  const batteryFill = document.getElementById('batteryFill');
  
  if (batteryElement) batteryElement.textContent = randomBattery + '%';
  if (batteryFill) {
    batteryFill.style.width = randomBattery + '%';
    
    // Change color based on level
    if (randomBattery < 20) {
      batteryFill.classList.add('low');
    } else {
      batteryFill.classList.remove('low');
    }
  }
}

function updateLocationData() {
  // Simulate slight location changes
  const baseLatitude = 13.6929;
  const baseLongitude = -89.2182;
  const variance = 0.0005;
  
  const newLat = baseLatitude + (Math.random() - 0.5) * variance;
  const newLon = baseLongitude + (Math.random() - 0.5) * variance;
  
  const latElement = document.getElementById('latitude');
  const lonElement = document.getElementById('longitude');
  const lastUpdateElement = document.getElementById('lastUpdate');
  
  if (latElement) latElement.textContent = newLat.toFixed(4) + '°';
  if (lonElement) lonElement.textContent = newLon.toFixed(4) + '°';
  
  if (lastUpdateElement) {
    const now = new Date();
    lastUpdateElement.textContent = now.toLocaleTimeString();
  }
}

function refreshActivityLog() {
  const button = document.querySelector('.refresh-btn');
  if (button) {
    button.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      button.style.transform = 'rotate(0deg)';
    }, 600);
  }

  // Add new activity entries
  const activityLog = document.getElementById('activityLog');
  if (activityLog) {
    const newEntry = document.createElement('div');
    newEntry.className = 'log-entry';
    newEntry.innerHTML = `
      <div class="log-icon">
        <i class="fas fa-sync-alt"></i>
      </div>
      <div class="log-content">
        <p><strong>Data Refreshed</strong></p>
        <span class="log-time">Just now</span>
      </div>
    `;
    
    activityLog.insertBefore(newEntry, activityLog.firstChild);

    // Keep only last 10 entries
    while (activityLog.children.length > 10) {
      activityLog.removeChild(activityLog.lastChild);
    }
  }
}

function toggleSidebar() {
  // Placeholder for sidebar toggle on mobile
  console.log('Sidebar toggle clicked');
}

// Modal close on background click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});