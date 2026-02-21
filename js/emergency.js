// ===========================
// EMERGENCY ALERT SYSTEM
// ===========================

let emergencyActive = false;
let emergencyAutoTrigger; // Track auto-trigger interval

window.addEventListener('DOMContentLoaded', function() {
  setupEmergencySystem();
});

function setupEmergencySystem() {
  const emergencyBtn = document.getElementById('emergencyBtn');
  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', triggerEmergency);
  }

  // Simulate random emergency alerts for demo
  setupAutoEmergencyDemo();
}

function triggerEmergency() {
  if (!emergencyActive) {
    // Activate emergency
    emergencyActive = true;
    
    const alert = document.getElementById('emergencyAlert');
    const message = document.getElementById('emergencyMessage');
    const button = document.getElementById('emergencyBtn');
    
    if (alert && message && button) {
      // Update UI
      alert.classList.remove('hidden');
      message.textContent = 'Device requires immediate assistance! Location: 13.6929°, -89.2182°';
      
      // Change button appearance
      button.style.background = '#ef4444';
      button.innerHTML = '<i class="fas fa-phone"></i> CALLING HELP...';
      button.style.opacity = '0.8';
      
      // Add emergency status indicator
      updateEmergencyStatus('ACTIVE');
      addActivityLog('Emergency Alert Triggered', 'fas fa-exclamation-circle');
      
      // Play sound (optional visual feedback)
      playEmergencySiren();
      
      // Auto-deactivate after 30 seconds for demo
      setTimeout(deactivateEmergency, 30000);
    }
  }
}

function deactivateEmergency() {
  emergencyActive = false;
  
  const alert = document.getElementById('emergencyAlert');
  const button = document.getElementById('emergencyBtn');
  
  if (alert && button) {
    alert.classList.add('hidden');
    button.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Emergency';
    button.style.opacity = '1';
    
    updateEmergencyStatus('No Alert');
    addActivityLog('Emergency Alert Cleared', 'fas fa-check-circle');
  }
}

function closeEmergencyAlert() {
  deactivateEmergency();
}

function updateEmergencyStatus(status) {
  const statusElement = document.getElementById('emergencyStatus');
  const lastAlertElement = document.getElementById('lastAlert');
  const indicator = document.querySelector('.emergency-status .stat-indicator');
  
  if (statusElement) {
    statusElement.textContent = status;
  }
  
  if (lastAlertElement) {
    const now = new Date();
    lastAlertElement.textContent = now.toLocaleTimeString();
  }
  
  if (indicator) {
    if (status === 'ACTIVE') {
      indicator.className = 'stat-indicator danger';
    } else {
      indicator.className = 'stat-indicator safe';
    }
  }
}

function addActivityLog(message, iconClass) {
  const activityLog = document.getElementById('activityLog');
  if (activityLog) {
    const newEntry = document.createElement('div');
    newEntry.className = 'log-entry';
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    newEntry.innerHTML = `
      <div class="log-icon">
        <i class="${iconClass}"></i>
      </div>
      <div class="log-content">
        <p><strong>${message}</strong></p>
        <span class="log-time">${timeString}</span>
      </div>
    `;
    
    activityLog.insertBefore(newEntry, activityLog.firstChild);

    // Keep only last 15 entries
    while (activityLog.children.length > 15) {
      activityLog.removeChild(activityLog.lastChild);
    }
  }
}

function playEmergencySiren() {
  // Create audio context for emergency sound
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Emergency siren frequency pattern
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log('Audio context not available');
  }
}

function setupAutoEmergencyDemo() {
  // Simulate random emergency alerts for demo purposes
  // Remove this in production
  
  // Uncomment to enable random emergency triggers for testing
  /*
  emergencyAutoTrigger = setInterval(function() {
    const randomChance = Math.random();
    if (randomChance > 0.95 && !emergencyActive) {
      triggerEmergency();
    }
  }, 30000); // Check every 30 seconds
  */
}

// Create keyboard shortcut for emergency (E key)
document.addEventListener('keydown', function(e) {
  if (e.key === 'e' || e.key === 'E') {
    const activeElement = document.activeElement;
    // Only trigger if not typing in an input
    if (!['INPUT', 'TEXTAREA'].includes(activeElement.tagName)) {
      triggerEmergency();
    }
  }
});

// Prevent accidental navigation when emergency is active
window.addEventListener('beforeunload', function(e) {
  if (emergencyActive) {
    e.preventDefault();
    e.returnValue = 'Emergency alert is active. Are you sure you want to navigate away?';
    return false;
  }
});