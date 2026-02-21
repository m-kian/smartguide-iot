// ===========================
// ACTIVE USER PAGE
// ===========================

window.addEventListener('DOMContentLoaded', function() {
  checkAuth();
  initializeUserProfile();
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

function initializeUserProfile() {
  // Set user information
  const user = JSON.parse(localStorage.getItem('smartguide_user'));
  
  const fullName = document.getElementById('fullName');
  const emailDisplay = document.getElementById('emailDisplay');
  
  if (fullName) fullName.textContent = user.name;
  if (emailDisplay) emailDisplay.textContent = user.email;
}

function setupEventListeners() {
  // Setup any interactive elements
}

function editProfile() {
  alert('Edit profile feature coming soon!');
}

function saveProfile() {
  alert('Profile changes saved successfully!');
}

function sendMessage(btn) {
  const contact = btn.closest('.contact-card').querySelector('.contact-info h4').textContent;
  alert(`Message sent to ${contact}`);
}

function viewDevice(btn) {
  const deviceName = btn.closest('.device-card').querySelector('.device-info h3').textContent;
  alert(`View details for: ${deviceName}`);
}

function editDevice(btn) {
  const deviceName = btn.closest('.device-card').querySelector('.device-info h3').textContent;
  alert(`Edit device: ${deviceName}`);
}

function removeDevice(btn) {
  const deviceName = btn.closest('.device-card').querySelector('.device-info h3').textContent;
  if (confirm(`Are you sure you want to remove ${deviceName}?`)) {
    btn.closest('.device-card').style.opacity = '0.5';
    alert(`Device removed: ${deviceName}`);
  }
}

function addNewDevice() {
  alert('Add new device wizard would start here');
}

function changePassword() {
  alert('Change password feature coming soon!');
}

function notificationSettings() {
  alert('Notification preferences window would open here');
}

function privacySettings() {
  alert('Privacy and security settings window would open here');
}

function downloadData() {
  alert('Your data is being prepared for download...');
}

function viewActivity() {
  alert('Full activity report would display here');
}

function deleteAccount() {
  if (confirm('⚠️ This action cannot be undone. Are you sure you want to delete your account?')) {
    alert('Account deletion process initiated...your account will be deleted in 30 days');
  }
}

function logout() {
  localStorage.removeItem('smartguide_user');
  window.location.href = 'index.html';
}

function editAvatar() {
  alert('Avatar upload feature coming soon!');
}

function viewPrivacy() {
  alert('Privacy settings window would open here');
}
function logout() {
  localStorage.removeItem('smartguide_user');
  window.location.href = 'index.html';
}