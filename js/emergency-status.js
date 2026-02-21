// ===========================
// EMERGENCY STATUS PAGE
// ===========================

let emergencyActive = false;

window.addEventListener('DOMContentLoaded', function() {
  checkAuth();
  initializeEmergency();
  setupEventListeners();
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

function initializeEmergency() {
  updateEmergencyStatus();
}

function setupEventListeners() {
  // Setup emergency contact buttons
  const callButtons = document.querySelectorAll('.action-icon');
  callButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
}

function updateEmergencyStatus() {
  const card = document.getElementById('emergencyCard');
  if (!emergencyActive && card) {
    const display = card.querySelector('.emergency-status-display');
    display.className = 'emergency-status-display safe';
    
    const status = card.querySelector('.emergency-status-text');
    if (status) status.textContent = 'All Clear';
  }
}

function triggerEmergency() {
  if (emergencyActive) {
    alert('Emergency already active. Clear the alert first.');
    return;
  }
  
  emergencyActive = true;
  
  const card = document.getElementById('emergencyCard');
  if (card) {
    const display = card.querySelector('.emergency-status-display');
    display.className = 'emergency-status-display alert';
    
    const status = card.querySelector('.emergency-status-text');
    if (status) status.textContent = 'EMERGENCY ACTIVE';
    
    const icon = card.querySelector('.emergency-icon');
    if (icon) icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
  }
  
  // Add new timeline entry
  addTimelineEntry('Emergency Alert Triggered', 'User triggered emergency alert from device', 'alert');
  
  // Auto-clear after 30 seconds
  setTimeout(() => {
    clearEmergency();
  }, 30000);
}

function clearEmergency() {
  emergencyActive = false;
  
  const card = document.getElementById('emergencyCard');
  if (card) {
    const display = card.querySelector('.emergency-status-display');
    display.className = 'emergency-status-display safe';
    
    const status = card.querySelector('.emergency-status-text');
    if (status) status.textContent = 'All Clear';
    
    const icon = card.querySelector('.emergency-icon');
    if (icon) icon.innerHTML = '<i class="fas fa-shield-alt"></i>';
  }
  
  addTimelineEntry('Emergency Cleared', 'Emergency response completed successfully', 'safe');
}

function sendAlert() {
  alert('Alert notifications sent to all emergency contacts');
  addTimelineEntry('Alert Sent', 'Emergency alert sent to designated contacts', 'info');
}

function callEmergency() {
  alert('Calling emergency services (911). Please hold...');
}

function addTimelineEntry(title, description, type) {
  const timeline = document.querySelector('.history-timeline');
  if (!timeline) return;
  
  const time = new Date();
  const dateStr = time.toLocaleString();
  
  const entry = document.createElement('div');
  entry.className = `timeline-item ${type}`;
  entry.innerHTML = `
    <div class="timeline-marker">
      <i class="fas ${getIconForType(type)}"></i>
    </div>
    <div class="timeline-content">
      <h3>${title}</h3>
      <p>${description}</p>
      <span class="timeline-date">${dateStr}</span>
    </div>
  `;
  
  timeline.insertBefore(entry, timeline.firstChild);
}

function getIconForType(type) {
  const icons = {
    'safe': 'fa-check-circle',
    'alert': 'fa-exclamation-circle',
    'info': 'fa-info-circle',
    'warning': 'fa-exclamation-triangle'
  };
  return icons[type] || 'fa-circle';
}

function callContact(btn) {
  const contact = btn.closest('.contact-card').querySelector('.contact-info h4').textContent;
  alert(`Calling ${contact}...`);
}

function sendMessage(btn) {
  const contact = btn.closest('.contact-card').querySelector('.contact-info h4').textContent;
  alert(`Sending message to ${contact}...`);
}

function updateContacts() {
  alert('Emergency contacts update feature coming soon!');
}

function viewFullHistory() {
  alert('Full emergency history would display here with advanced filtering');
}

function downloadReport() {
  alert('Emergency report downloaded as PDF');
}

function logout() {
  localStorage.removeItem('smartguide_user');
  window.location.href = 'index.html';
}