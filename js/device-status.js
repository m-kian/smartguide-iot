// ===========================
// DEVICE STATUS PAGE
// ===========================

window.addEventListener('DOMContentLoaded', function() {
  checkAuth();
  initializeDeviceStatus();
  setupEventListeners();
  startUpdates();
});

function checkAuth() {
  const user = localStorage.getItem('smartguide_user');
  if (!user) {
    window.location.href = 'index.html';
  } else {
    const userData = JSON.parse(user);
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
  }
}

function initializeDeviceStatus() {
  updateDeviceStatus();
  updateSignalStrength();
  updateDeviceInfo();
}

function setupEventListeners() {
  // Setup any interactive elements
}

function startUpdates() {
  // Update device status every 5 seconds
  setInterval(() => {
    updateDeviceStatus();
    updateSignalStrength();
  }, 5000);
}

function updateDeviceStatus() {
  const statuses = ['Online', 'Connecting', 'Online'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  const mainStatus = document.getElementById('mainStatus');
  const indicator = document.getElementById('statusIndicator');
  const lastUpdate = document.getElementById('lastStatusUpdate');
  
  if (mainStatus) mainStatus.textContent = status;
  if (lastUpdate) lastUpdate.textContent = 'Just now';
  
  if (status === 'Online') {
    if (indicator) {
      indicator.querySelector('.status-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
      indicator.style.color = '#10b981';
    }
  }
}

function updateSignalStrength() {
  const signals = [98, 92, 88, 95, 100, 85, 90];
  const signal = signals[Math.floor(Math.random() * signals.length)];
  
  const signalValue = document.getElementById('signalValue');
  if (signalValue) signalValue.textContent = signal + '%';
}

function updateDeviceInfo() {
  const deviceId = document.getElementById('deviceId');
  const deviceName = document.getElementById('deviceName');
  const firmwareVersion = document.getElementById('firmwareVersion');
  const macAddress = document.getElementById('macAddress');
  const ipAddress = document.getElementById('ipAddress');
  const lastSync = document.getElementById('lastSync');
  
  // These are set with demo data in HTML, can be updated as needed
}

function restartDevice() {
  alert('Device restart initiated. This will take approximately 30 seconds.');
  // Add logic to restart device
}

function testConnection() {
  const btn = event.target;
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
  
  setTimeout(() => {
    alert('Connection test completed successfully! Latency: 45ms');
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-wifi"></i> Test Connection';
  }, 2000);
}

function viewLogs() {
  alert('Device logs window would open here');
}

function logout() {
  localStorage.removeItem('smartguide_user');
  window.location.href = 'index.html';
}