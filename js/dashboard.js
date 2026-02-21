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
    battery: {
      level: 88
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
      
      // Add click handlers for each log entry
      const title = entry.querySelector('p strong').textContent;
      entry.style.cursor = 'pointer';
      entry.addEventListener('click', function() {
        handleLogEntryClick(title);
      });
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

// ===========================
// ACTIVITY LOG HANDLERS
// ===========================

function handleLogEntryClick(title) {
  switch(title) {
    case 'Device Online':
      showDeviceOnlineDetails();
      break;
    case 'Battery Low':
      showBatteryLowDetails();
      break;
    case 'Location Updated':
      showLocationUpdatedDetails();
      break;
    default:
      console.log('Unknown activity:', title);
  }
}

function showDeviceOnlineDetails() {
  const modalContent = `
    <div class="modal-header">
      <h2><i class="fas fa-microchip"></i> Device Online Status</h2>
      <button class="modal-close" onclick="closeModal('activityModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <h3>Connection Details</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Status</span>
            <p class="detail-value" style="color: #14b8a6;">
              <i class="fas fa-check-circle"></i> Online
            </p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Device ID</span>
            <p class="detail-value">DEV-001-SG2024</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Signal Strength</span>
            <p class="detail-value">98%</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Connection Type</span>
            <p class="detail-value">4G LTE</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">IP Address</span>
            <p class="detail-value">192.168.1.105</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Last Connected</span>
            <p class="detail-value">Today, 09:30 AM</p>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h3>Connection Uptime</h3>
        <div class="uptime-info">
          <p>The device has been online continuously for:</p>
          <p style="font-size: 24px; font-weight: 700; color: #14b8a6; margin: 10px 0;">24 hours 15 minutes</p>
          <p style="font-size: 12px; color: #94a3b8;">Started: Yesterday at 9:15 AM</p>
        </div>
      </div>
      <div class="modal-section">
        <h3>Speed Test</h3>
        <button class="action-btn primary" onclick="testDeviceConnection()">
          <i class="fas fa-wifi"></i> Run Speed Test
        </button>
      </div>
    </div>
  `;
  
  showActivityModal(modalContent);
}

function showBatteryLowDetails() {
  const modalContent = `
    <div class="modal-header">
      <h2><i class="fas fa-battery-half"></i> Battery Status</h2>
      <button class="modal-close" onclick="closeModal('activityModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <h3>Battery Information</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Current Level</span>
            <p class="detail-value" style="color: #f59e0b;">15%</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Status</span>
            <p class="detail-value" style="color: #ef4444;">Critical</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Charging Status</span>
            <p class="detail-value">Not Charging</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Estimated Time</span>
            <p class="detail-value">~2 hours remaining</p>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h3>Battery Health</h3>
        <div class="battery-chart">
          <div class="battery-bar">
            <div class="battery-fill" style="width: 15%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
          </div>
          <p style="text-align: center; margin-top: 10px; font-size: 12px; color: #94a3b8;">Battery Capacity: 85% of original</p>
        </div>
      </div>
      <div class="modal-section">
        <h3>Recommendations</h3>
        <ul style="padding-left: 20px;">
          <li>⚡ Charge the device immediately</li>
          <li>💡 Reduce screen brightness to extend battery life</li>
          <li>📡 Disable high-power features when not in use</li>
          <li>🔌 Use power-saving mode</li>
        </ul>
      </div>
      <div class="modal-section">
        <button class="action-btn primary" onclick="enableBatterySaver()">
          <i class="fas fa-bolt"></i> Enable Battery Saver
        </button>
      </div>
    </div>
  `;
  
  showActivityModal(modalContent);
}

function showLocationUpdatedDetails() {
  const modalContent = `
    <div class="modal-header">
      <h2><i class="fas fa-map-location-dot"></i> Location Details</h2>
      <button class="modal-close" onclick="closeModal('activityModal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-section">
        <h3>Current Location</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Latitude</span>
            <p class="detail-value">13.6929°</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Longitude</span>
            <p class="detail-value">-89.2182°</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Accuracy</span>
            <p class="detail-value">±5 meters</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Altitude</span>
            <p class="detail-value">658 meters</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Speed</span>
            <p class="detail-value">0 km/h (Stationary)</p>
          </div>
          <div class="detail-item">
            <span class="detail-label">Last Updated</span>
            <p class="detail-value">Today, 07:45 AM</p>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h3>Location Address</h3>
        <p style="font-size: 14px; color: var(--light-text);">
          San Salvador, El Salvador<br>
          Central America
        </p>
      </div>
      <div class="modal-section">
        <h3>Geofence Status</h3>
        <div style="padding: 15px; background: #d1fae5; border-radius: 8px; border-left: 4px solid #14b8a6;">
          <p style="margin: 0; color: #065f46;">
            <i class="fas fa-check-circle"></i> Device is within safe zone
          </p>
        </div>
      </div>
      <div class="modal-section">
        <h3>Location History (Last 7 Days)</h3>
        <div style="display: flex; gap: 8px; margin: 10px 0;">
          <span class="location-point" title="Today">●</span>
          <span class="location-point" title="Yesterday">●</span>
          <span class="location-point" title="2 days ago">●</span>
          <span class="location-point" title="3 days ago">●</span>
          <span class="location-point" title="4 days ago">●</span>
          <span class="location-point" title="5 days ago">●</span>
          <span class="location-point" title="6 days ago">●</span>
        </div>
      </div>
      <div class="modal-section">
        <button class="action-btn primary" onclick="refreshLocation()">
          <i class="fas fa-sync-alt"></i> Refresh Location
        </button>
      </div>
    </div>
  `;
  
  showActivityModal(modalContent);
}

function showActivityModal(content) {
  // Create or update modal
  let modal = document.getElementById('activityModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'activityModal';
    modal.className = 'modal active';
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `<div class="modal-content">${content}</div>`;
  modal.classList.add('active');
  
  // Add styles for modal sections
  const style = document.createElement('style');
  style.textContent = `
    .modal-section {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    body.dark-mode .modal-section {
      border-bottom-color: rgba(20, 184, 166, 0.2);
    }
    
    .modal-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    .modal-section h3 {
      margin: 0 0 15px 0;
      font-size: 16px;
      font-weight: 600;
      color: var(--light-text);
    }
    
    body.dark-mode .modal-section h3 {
      color: var(--dark-text);
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
    }
    
    .detail-item {
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 3px solid #14b8a6;
    }
    
    body.dark-mode .detail-item {
      background: rgba(20, 184, 166, 0.05);
    }
    
    .detail-label {
      display: block;
      font-size: 12px;
      color: #94a3b8;
      text-transform: uppercase;
      margin-bottom: 6px;
      font-weight: 600;
    }
    
    .detail-value {
      margin: 0;
      font-size: 14px;
      color: var(--light-text);
      font-weight: 600;
    }
    
    body.dark-mode .detail-value {
      color: var(--dark-text);
    }
    
    .uptime-info {
      padding: 15px;
      background: #f0f4ff;
      border-radius: 8px;
      border-left: 4px solid #14b8a6;
      text-align: center;
    }
    
    body.dark-mode .uptime-info {
      background: rgba(20, 184, 166, 0.1);
    }
    
    .battery-chart {
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
    }
    
    body.dark-mode .battery-chart {
      background: rgba(20, 184, 166, 0.05);
    }
    
    .battery-bar {
      width: 100%;
      height: 30px;
      background: #e2e8f0;
      border-radius: 15px;
      overflow: hidden;
    }
    
    body.dark-mode .battery-bar {
      background: rgba(20, 184, 166, 0.2);
    }
    
    .battery-fill {
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .modal-section ul {
      margin: 0;
      color: var(--light-text);
    }
    
    body.dark-mode .modal-section ul {
      color: var(--dark-text);
    }
    
    .location-point {
      font-size: 20px;
      color: #14b8a6;
      opacity: 0.7;
      transition: all 0.3s;
    }
    
    .location-point:hover {
      font-size: 24px;
      opacity: 1;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
}

function refreshActivityLog() {
  const activityLog = document.getElementById('activityLog');
  if (activityLog) {
    const entries = activityLog.querySelectorAll('.log-entry');
    entries.forEach((entry) => {
      entry.style.animation = 'none';
      setTimeout(() => {
        entry.style.animation = 'fadeIn 0.3s ease forwards';
      }, 10);
    });
    
    // Show toast notification
    showToast('Activity log refreshed!', 'success');
  }
}

function testDeviceConnection() {
  const btn = event.target.closest('button');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
  
  setTimeout(() => {
    showToast('Speed test completed: Download 45 Mbps, Upload 12 Mbps', 'success');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-wifi"></i> Run Speed Test';
  }, 2000);
}

function enableBatterySaver() {
  showToast('Battery Saver mode enabled! Device performance optimized.', 'success');
}

function refreshLocation() {
  const btn = event.target.closest('button');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
  
  setTimeout(() => {
    showToast('Location refreshed: 13.6929°, -89.2182°', 'success');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Location';
  }, 1500);
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    ${message}
  `;
  
  const toastStyle = document.createElement('style');
  toastStyle.textContent = `
    .toast {
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    }
    
    .toast-success {
      background: #14b8a6;
    }
    
    .toast-info {
      background: #0d9488;
    }
    
    .toast-error {
      background: #ef4444;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(toastStyle);
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}
